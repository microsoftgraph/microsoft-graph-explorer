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
  template: `
  <div id="request-bar-row-form" layout="row" layout-align="start center">

        <!-- HTTP METHOD -->
        <div [title]="isAuthenticated() ? '' : getStr('login to send requests')" #httpMethod id="httpMethodSelect" [ngClass]="explorerValues.selectedOption" class="c-select f-border first-row-mobile bump-flex-row-mobile">
            <select [disabled]="!isAuthenticated()">
                <option *ngFor="let choice of methods">{{choice}}</option>
            </select>
        </div>

        <!-- version button -->

        <div id="graph-version-select">
            <div class="c-select f-border bump-flex-row-mobile graph-version" #graphVersion>
                <select>
                    <option *ngFor="let version of GraphVersions">{{version}}</option>
                </select>
            </div>
        </div>

        <md-input-container>
            <input type="text" mdInput (keydown)="keyDownFunction($event)" [formControl]="myControl" [(ngModel)]="explorerValues.endpointUrl" [mdAutocomplete]="auto" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        </md-input-container>

        <md-autocomplete #auto="mdAutocomplete">
            <md-option *ngFor="let option of methods" [value]="option">
                {{ option }}
            </md-option>
        </md-autocomplete>

        <button name="button" class="c-button explorer-form-row bump-flex-row-mobile" type="submit" id="submitBtn" (click)="submit()">
            <span [hidden]="explorerValues.requestInProgress"><i class="ms-Icon ms-Icon--LightningBolt"  style="padding-right: 10px;" title="LightningBolt" aria-hidden="true"></i>{{getStr('Run Query')}}</span>
            <div class="ms-Spinner" [hidden]="!explorerValues.requestInProgress"></div>
        </button>

    </div>
    <request-editors></request-editors>
    <div id="spacer-1"></div>

    <!-- response -->
    <response-status-bar></response-status-bar>
    <share-link-btn></share-link-btn>
    <div class="ms-Pivot" id="response-viewer-labels" tabindex="-1">
        <ul class="ms-Pivot-links">
            <li class="ms-Pivot-link is-selected" data-content="response" tabindex="1">
                {{getStr('Response Preview')}}
            </li>
            <li class="ms-Pivot-link" data-content="response-headers" tabindex="1">
                {{getStr('Response Headers')}}
            </li>
        </ul>
        <div class="ms-Pivot-content" data-content="response">
            <div>
                <img id="responseImg" [hidden]="!explorerValues.showImage" style="margin-top:10px" ng-cloak />
                <div id="jsonViewer" [hidden]="explorerValues.showImage"></div>

                <!--<svg id="visual-explorer" width="1200" height="1000"/></svg>-->
            </div>
        </div>
        <div class="ms-Pivot-content" data-content="response-headers">
            <div id="response-header-viewer"></div>
        </div>
    </div>
`,
  styles: [`
    #request-bar-row-form {
        display: flex;
        flex-wrap: wrap;
        margin-top: -8px;
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


    button.c-button[type=submit]:focus:not(.x-hidden-focus) {
        outline: #000 solid 1px !important;
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