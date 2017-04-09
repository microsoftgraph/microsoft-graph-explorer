import { Component, OnInit, AfterViewInit, ViewChild, ContentChildren, ViewContainerRef, Input, OnChanges, DoCheck } from '@angular/core';
import { AuthenticationStatus, GraphApiCall, HistoryRecord, Methods, ExplorerValues, AutoCompleteItem } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";
import { FormControl } from "@angular/forms";
import { GraphService } from "./api-explorer-svc";
import { GraphNodeLink, constructGraphLinksFromFullPath, getUrlsFromServiceURL } from "./graph-structure";
import { initializeJsonViewer } from "./api-explorer-jsviewer";

declare let mwf:any;

@Component({
  providers: [GraphService],
  selector: 'main-column',
  template: `
    <div id="request-bar-row-form" layout="row" layout-align="start center">

        <!-- HTTP METHOD -->
        <div [title]="isAuthenticated() ? '' : getStr('login to send requests')" #httpMethod class="c-select f-border first-row-mobile bump-flex-row-mobile">
            <select [disabled]="!isAuthenticated()">
                <option *ngFor="let choice of methods">{{choice}}</option>
            </select>
        </div>

        <!-- version button -->

        <div class="c-select f-border bump-flex-row-mobile" #graphVersion>
            <select>
                <option *ngFor="let version of GraphVersions">{{version}}</option>
            </select>
        </div>

                
        <md-input-container>
            <input type="text" mdInput [formControl]="myControl" [(ngModel)]="explorerValues.endpointUrl" [mdAutocomplete]="auto">
        </md-input-container>

        <md-autocomplete #auto="mdAutocomplete">
            <md-option *ngFor="let option of methods" [value]="option">
                {{ option }}
            </md-option>
        </md-autocomplete>

        <button name="button" class="c-button explorer-form-row bump-flex-row-mobile" type="submit" (click)="submit()">
            <span ng-hide="requestInProgress"><i class="ms-Icon ms-Icon--LightningBolt"  style="padding-right: 10px;" title="LightningBolt" aria-hidden="true"></i>{{getStr('Run Query')}}</span>
            <!-- <md-progress-circular md-diameter="20px" aria-label="response loading" md-mode="indeterminate" ng-show="requestInProgress" ng-cloak></md-progress-circular> -->
        </button>

    </div>

    <!-- response -->
    <div class="ms-Pivot" id="response-viewer-labels" tabindex="-1">
        <ul class="ms-Pivot-links">
            <li class="ms-Pivot-link is-selected" data-content="response" title="{{getStr('Response')}}" tabindex="1">
                {{getStr('Response')}}
            </li>
        </ul>
        <div class="ms-Pivot-content" data-content="response">
            <div>
                <img id="responseImg" [hidden]="!explorerValues.showImage" style="margin-top:10px" ng-cloak />
                <div id="jsonViewer"></div>

                <!--<svg id="visual-explorer" width="1200" height="1000"/></svg>-->
            </div>
        </div>
    </div>


  `,
  styles: [`

    /* make url bar responsive*/
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

  `]
})


export class MainColumnComponent extends GraphExplorerComponent implements OnInit, AfterViewInit, DoCheck {

    oldEndpointUrl:string;
    ngDoCheck() {
        if (this.explorerValues && this.oldEndpointUrl != JSON.stringify(this.explorerValues)) {
            this.updateVersionFromEndpointUrl();
            this.updateGraphVersionSelect();

            this.oldEndpointUrl = JSON.stringify(this.explorerValues);
        }
    }

    static httpMethodEl;
    myControl = new FormControl();
    ngAfterViewInit(): void {
        MainColumnComponent.httpMethodEl = this._httpMethodEl;
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

        updateHttpMethod();


        // init Graph version selector
        mwf.ComponentFactory.create([{
            component: mwf.Select,
            elements: [this._graphVersionEl.element.nativeElement],
            callback: (event:any) => {
                event[0].selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedVersion = method.id;
                        this.updateEndpointURLVersionFromVersion();
                    }
                })
            }
        }]);
        this.updateGraphVersionSelect();

        
        initializeJsonViewer();
    }

    ngOnInit(): void { }

    @ViewChild('httpMethod', {read: ViewContainerRef}) _httpMethodEl;
    @ViewChild('graphVersion', {read: ViewContainerRef}) _graphVersionEl;

    methods = Methods;
    GraphVersions = AppComponent.Options.GraphVersions;
    constructor(private GraphService: GraphService) {
        super();
    }

    submit = () => {
        AppComponent.executeExplorerQuery(this.GraphService);
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
        if (graphPathStartingWithVersion.length < 2) {
            return;
        }
        let possibleGraphPathArr = graphPathStartingWithVersion[1].split('/');
        if (possibleGraphPathArr.length == 0) {
            return;
        }

        
        let possibleVersion = possibleGraphPathArr[0];
        if (AppComponent.Options.GraphVersions.indexOf(possibleVersion) != -1) {
            // possibleVersion is a valid version
            this.explorerValues.selectedVersion = possibleVersion;
        }
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
    
    getMatches(query):Promise<AutoCompleteItem[]> {
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

        const graphVersionIdx = graphVersionSelectMenu.items[this.GraphVersions.indexOf(this.explorerValues.selectedVersion)];
        graphVersionSelectMenu.onItemSelected(graphVersionIdx);

        this.updateEndpointURLVersionFromVersion();

    }

    updateEndpointURLVersionFromVersion() {
        this.explorerValues.endpointUrl = this.explorerValues.endpointUrl.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, (AppComponent.Options.GraphUrl + "/" + this.explorerValues.selectedVersion + "/"));
    }

}

export function updateHttpMethod() {
    const httpMethodSelectMenu = MainColumnComponent.httpMethodEl.element.nativeElement.mwfInstances.t.selectMenu;

    const elementIdxToSelect = httpMethodSelectMenu.items[Methods.indexOf(AppComponent.explorerValues.selectedOption)];
    httpMethodSelectMenu.onItemSelected(elementIdxToSelect);
}