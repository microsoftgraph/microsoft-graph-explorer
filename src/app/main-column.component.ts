// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, DoCheck } from '@angular/core';
import { AuthenticationStatus, GraphApiCall, HistoryRecord, Methods, ExplorerValues, AutoCompleteItem } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";
import { FormControl } from "@angular/forms";
import { GraphService } from "./api-explorer-svc";
import { GraphNodeLink, constructGraphLinksFromFullPath, getUrlsFromServiceURL } from "./graph-structure";
import { initializeJsonViewer, initializeResponseHeadersViewer } from "./api-explorer-jsviewer";
import { Observable } from "rxjs/Observable";

declare let mwf:any;

@Component({
  providers: [GraphService],
  selector: 'main-column',
  templateUrl: "app/templates/main-col.tmpl.html",
  styles: [`
    #request-bar-row-form {
        display: flex;
        flex-wrap: wrap;
    }

    #request-bar-row-form::after {
        content: '';
        width: 100%;
    }

    .c-select.f-border {
        min-width: inherit;
    }

    @media (max-width: 639px) {
        .bump-flex-row-mobile {
            order: 1;
            margin: 0px auto;
        }
        md-autocomplete {
            min-width: 100% !important;
        }
    }

    .c-select:after {
        display: none;
    }

    #responseImg {    
        max-width: 300px;
    }

    md-input-container {
        flex: 1;
        margin-right: 8px;
    }

    #submitBtn {
        height: 37px;
        margin-top: 20px;
    }
    
    .ms-Spinner {
        margin-left: 38px
    }

    #spacer-1 {
        margin-bottom: 50px;
    }

  `]
})

export class MainColumnComponent extends GraphExplorerComponent implements OnInit, AfterViewInit, DoCheck {
    oldExplorerValues:string;
    ngDoCheck() {
        if (this.explorerValues && this.oldExplorerValues != JSON.stringify(this.explorerValues)) {
            this.updateVersionFromEndpointUrl();
            this.updateGraphVersionSelect();

            this.updateHttpMethod();

            this.oldExplorerValues = JSON.stringify(this.explorerValues);
        }
    }


    myControl = new FormControl();
    ngAfterViewInit(): void {
        // Init httpMethod
        mwf.ComponentFactory.create([{
            component: mwf.Select,
            elements: [this._httpMethodEl.element.nativeElement],
            callback: (event:any) => {
                event[0].selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedOption = method.id;
                    }
                })
            }
        }]);

        this.updateHttpMethod();


        // init Graph version selector
        mwf.ComponentFactory.create([{
            component: mwf.Select,
            elements: [this._graphVersionEl.element.nativeElement],
            callback: (event:any) => {
                event[0].selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedVersion = document.getElementById("-"+method.id).children[0].textContent;
                        this.updateEndpointURLVersionFromVersion();
                    }
                })
            }
        }]);
        this.updateGraphVersionSelect();

        initializeJsonViewer();
        initializeResponseHeadersViewer();

    }

//    filteredOptions: Observable<string[]>;
    ngOnInit(): void {
//         this.myControl.valueChanges
//          .startWith(null)
//          .map(val => this.filter(val))
//          .toPromise(() => {
//              this.filteredOptions;
//          });
    }

//    filter(val: string): Promise<string[]>{
//       return this.getMatches(val).then((a) => {
//         return a.map(x => x.fullUrl)
//     });
//    }

    @ViewChild('httpMethod', {read: ViewContainerRef}) _httpMethodEl;
    @ViewChild('graphVersion', {read: ViewContainerRef}) _graphVersionEl;

    methods = Methods;
    GraphVersions = AppComponent.Options.GraphVersions;
    constructor(private GraphService: GraphService) {
        super();
    }

    submit = () => {
        if (this.explorerValues.requestInProgress) return;
        AppComponent.executeExplorerQuery();
    }

    keyDownFunction(event) {
        if (event.keyCode == 13) {
            this.submit();
        }
    }

    getAutocompleteOptions():Promise<any> {
        return getUrlsFromServiceURL(this.GraphService, AppComponent.explorerValues.selectedVersion);
    }

    getRelativeUrlFromGraphNodeLinks(links:GraphNodeLink[]) {
        return links.map((x) => x.name).join('/');
    }

    updateVersionFromEndpointUrl() {
        // if the user typed in a different version, change the dropdown
        let graphPathStartingWithVersion = this.explorerValues.endpointUrl.split(AppComponent.Options.GraphUrl+"/");
        let possibleGraphPathArr = graphPathStartingWithVersion[1].split('/');
        if (possibleGraphPathArr.length == 0) {
            return;
        }

        
        let possibleVersion = possibleGraphPathArr[0];

        // if (AppComponent.Options.GraphVersions.indexOf(possibleVersion) != -1) {
            // possibleVersion is a valid version
        this.explorerValues.selectedVersion = possibleVersion;
        // }
        // parseMetadata();

    }

    // getFullUrlFromGraphLinks(links:GraphNodeLink[]):Promise<any[]> {
    //     return new Promise((resolve, reject) => {
    //         if (typeof links === 'string') {
    //             resolve(constructGraphLinksFromFullPath(links));
    //         }
    //         resolve(links)
    //     }).then((_links:GraphNodeLink[]) => {
    //         return [AppComponent.Options.GraphUrl, this.explorerValues.selectedVersion, getRelativeUrlFromGraphNodeLinks(_links)];    
    //     });
    // }
    
    getMatches(query:string):Promise<AutoCompleteItem[]> {
        return getUrlsFromServiceURL(this.GraphService, AppComponent.explorerValues.selectedVersion).then((urls) => {
            return constructGraphLinksFromFullPath(this.GraphService, query).then((graph) => {
                // if query ends with odata query param, don't return any URLs
                const lastNode = graph.pop();
                if (lastNode && lastNode.name.indexOf("?") != -1) {
                    return [];
                }

                return urls.filter((option) => option.indexOf(query)>-1);
            });
        }).then((urls) => {
            const serviceTextLength = AppComponent.explorerValues.endpointUrl.length;
            const useLastPathSegmentOnly = serviceTextLength !== undefined && serviceTextLength > 64;

            return Promise.all(urls.map((url) => {
                if (!useLastPathSegmentOnly) {
                    return {
                        fullUrl: url,
                        url: url
                    };
                }
                return constructGraphLinksFromFullPath(this.GraphService, url).then((links) => {
                    return {
                        url: "/" + links[links.length - 1].name,
                        fullUrl: url
                    }
                });
            }));
        }).catch((e) => {
            debugger;
        }).then((a) => {
            debugger;
            return a;
        });
    }

    updateGraphVersionSelect() {
        // update version select from explorerValues
        let graphVersionSelectEl = this._graphVersionEl.element.nativeElement;
        
        if (!graphVersionSelectEl.mwfInstances) {
            return;
        };

        const graphVersionSelectMenu = graphVersionSelectEl.mwfInstances.t.selectMenu;

        let graphVersionIdx = this.GraphVersions.indexOf(this.explorerValues.selectedVersion);
        if (graphVersionIdx == -1) {
            document.getElementById("-Other").children[0].textContent = this.explorerValues.selectedVersion;
            graphVersionIdx = this.GraphVersions.indexOf("Other");

            // if we're selecting the other twice, the button text won't update automatically
            document.querySelector(".graph-version.c-select button").textContent = this.explorerValues.selectedVersion;
        }

        graphVersionSelectMenu.onItemSelected(graphVersionSelectMenu.items[graphVersionIdx]);



        this.updateEndpointURLVersionFromVersion();

    }

    updateEndpointURLVersionFromVersion() {
        this.explorerValues.endpointUrl = this.explorerValues.endpointUrl.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, (AppComponent.Options.GraphUrl + "/" + this.explorerValues.selectedVersion + "/"));
    }

    updateHttpMethod() {
        const httpMethodSelectMenuEl = this._httpMethodEl.element.nativeElement;
        
        if (!httpMethodSelectMenuEl.mwfInstances) {
            return;
        };

        const httpMethodSelectMenu = httpMethodSelectMenuEl.mwfInstances.t.selectMenu;

        const elementIdxToSelect = httpMethodSelectMenu.items[Methods.indexOf(this.explorerValues.selectedOption)];
        httpMethodSelectMenu.onItemSelected(elementIdxToSelect);
    }

}