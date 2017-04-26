// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, DoCheck } from '@angular/core';
import { AuthenticationStatus, GraphApiCall, Methods, ExplorerValues, AutoCompleteItem } from "./base";
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
        <div [title]="isAuthenticated() ? '' : getStr('login to send requests')" #httpMethod id="httpMethodSelect" [ngClass]="explorerValues.selectedOption" class="c-select f-border first-row-mobile bump-flex-row-mobile fixed-with-mwf-menu">
            <select [disabled]="!isAuthenticated()">
                <option *ngFor="let choice of methods">{{choice}}</option>
            </select>
        </div>

        <!-- version button -->
        <div id="graph-version-select">
            <div class="c-select f-border bump-flex-row-mobile graph-version fixed-with-mwf-menu" #graphVersion>
                <select>
                    <option *ngFor="let version of GraphVersions">{{version}}</option>
                </select>
            </div>
        </div>

        <div id="graph-request-url" class="c-search" autocomplete="off" name="form1">
            <input [(ngModel)]="explorerValues.endpointUrl" (keydown)="endpointInputKeyDown($event)" role="combobox" aria-controls="auto-suggest-default-2" aria-autocomplete="both" aria-expanded="false" type="search" name="search-field" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">

            <div class="m-auto-suggest" id="auto-suggest-default-2" role="group">
                <ul class="c-menu f-auto-suggest-scroll" aria-hidden="true" data-js-auto-suggest-position="default" tabindex="0" role="listbox"></ul>
                <ul class="c-menu f-auto-suggest-no-results" aria-hidden="true" data-js-auto-suggest-position="default" tabindex="0">

                </ul>
            </div>
        </div>

        <button name="button" class="c-button explorer-form-row bump-flex-row-mobile" type="submit" id="submitBtn" (click)="submit()">
            <span [hidden]="explorerValues.requestInProgress"><i id="go-lightning-icon" class="ms-Icon ms-Icon--LightningBolt" style="padding-right: 10px;" aria-hidden="true"></i>{{getStr('Run Query')}}</span>
            <div class="ms-Spinner" [hidden]="!explorerValues.requestInProgress"></div>
        </button>
    </div>
    <request-editors></request-editors>
    <div id="spacer-1"></div>

    <message-bar></message-bar>
    <!-- response -->
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
        margin-top: -5px;
    }

    #request-bar-row-form::after {
        content: '';
        width: 100%;
    }

    .c-select.f-border {
        min-width: inherit;
    }

    .c-select:after {
        display: none;
    }

    #responseImg {    
        max-width: 300px;
    }

    #graph-request-url {
        flex: 1;
        margin-right: 8px;
        max-width: 100%;
    }

    #submitBtn {
        height: 32px;
        margin-top: 20px;
        padding-top: 6px;
    }
    
    .ms-Spinner {
        margin-left: 38px;
        position: relative;
        top: -1px;
    }

    #spacer-1 {
        margin-bottom: 50px;
    }

    button.c-button[type=submit]:focus:not(.x-hidden-focus) {
        outline: #000 solid 1px !important;
    }


    .c-auto-suggest .c-menu, .m-auto-suggest .c-menu {
        max-width: 100%;
    }
    .c-menu.f-auto-suggest-no-results {
        display: none;
    }

    .c-menu.f-auto-suggest-scroll {
        max-height: 300px;
    }

    #go-lightning-icon {
        position: relative;
        top: 2px;
    }

        
    /*mobile*/


    @media (max-width: 639px) {
        .bump-flex-row-mobile {
            order: 1;
            margin: 0px auto;
            margin-top: 20px;
        }
    }
    
  `]
})

export class MainColumnComponent extends GraphExplorerComponent implements OnInit, AfterViewInit, DoCheck {
    oldExplorerValues:ExplorerValues = {};
    ngDoCheck() {
        if (this.explorerValues && JSON.stringify(this.oldExplorerValues) != JSON.stringify(this.explorerValues)) {
            this.updateVersionFromEndpointUrl();
            this.updateGraphVersionSelect();

            this.updateHttpMethod();

            // add content-type header when switching to POST
            if (this.oldExplorerValues.selectedOption != "POST" && this.explorerValues.selectedOption == "POST") {
                 // if it doesn't already exist
                 let hasContentTypeHeader = false;
                 if (this.explorerValues.headers) {
                     for (let header of this.explorerValues.headers) {
                         if (header.name.toLowerCase() == "content-type") {
                             hasContentTypeHeader = true;
                             break;
                         }
                     }
                     if (!hasContentTypeHeader) {
                         this.explorerValues.headers.unshift({
                             enabled: true,
                             name: "Content-type",
                             readonly: false,
                             value: "application/json"
                         })
                     }
                 }
            }
            

            this.oldExplorerValues = JSON.parse(JSON.stringify(this.explorerValues));
        }
    }


    myControl = new FormControl();
    ngAfterViewInit(): void {
        // Init httpMethod
        mwf.ComponentFactory.create([{
            component: mwf.Select,
            elements: [this._httpMethodEl.element.nativeElement],
            callback: (event:any) => {            
                this.updateHttpMethod();
                event[0].selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedOption = method.id;
                    }
                })
            }
        }]);

        // init Graph version selector
        mwf.ComponentFactory.create([{
            component: mwf.Select,
            elements: [this._graphVersionEl.element.nativeElement],
            callback: (event:any) => {
                this.updateGraphVersionSelect();
                event[0].selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedVersion = document.getElementById("-"+method.id).children[0].textContent;
                        this.updateEndpointURLVersionFromVersion();
                    }
                })
            }
        }]);

        initializeJsonViewer();
        initializeResponseHeadersViewer();

        mwf.ComponentFactory.create([{
            component: mwf.AutoSuggest,
            callback: (autoSuggests) => {
                if (autoSuggests && (autoSuggests.length > 0)) {
                    let autoSuggest = autoSuggests[0];
                    if (!!autoSuggest) {
                        autoSuggest.subscribe({
                            onMatchPatternChanged: (notification) => {
                                autoSuggest.updateSuggestions(this.getAutoCompleteOptions().map((s) => { return { type: 'string', value: s }}));
                                // autoSuggest.updateSuggestions(this.getAutoCompleteOptions().map((s) => { return { type: 'string', value: this.getShortUrl(s) }}));
                            }
                        });
                    }
                }
            }
        }]);

    }

    ngOnInit() {}

    @ViewChild('httpMethod', {read: ViewContainerRef}) _httpMethodEl;
    @ViewChild('graphVersion', {read: ViewContainerRef}) _graphVersionEl;

    methods = Methods;
    GraphVersions = AppComponent.Options.GraphVersions;
    constructor(private GraphService: GraphService) {
        super();
    }

    endpointInputKeyDown(event) {
        if (event.keyCode == 13)
            this.submit()
    }

    submit = () => {
        if (this.explorerValues.requestInProgress) return;
        AppComponent.executeExplorerQuery();
    }

    getRelativeUrlFromGraphNodeLinks(links:GraphNodeLink[]) {
        return links.map((x) => x.name).join('/');
    }

    updateVersionFromEndpointUrl() {
        // if the user typed in a different version, change the dropdown
        let graphPathStartingWithVersion = this.explorerValues.endpointUrl.split(AppComponent.Options.GraphUrl+"/");
        if (graphPathStartingWithVersion.length < 2) return;
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

    getAutoCompleteOptions() {
        return this.getMatches(AppComponent.explorerValues.endpointUrl);
    }

    getMatches(query:string):string[] {
        let urls = getUrlsFromServiceURL(AppComponent.explorerValues.selectedVersion);
        let currentGraphLinks = constructGraphLinksFromFullPath(query);

        if (!currentGraphLinks) return [];
        // if query ends with odata query param, don't return any URLs
        const lastNode = currentGraphLinks.pop();
        if (lastNode && lastNode.name.indexOf("?") != -1) {
            return [];
        }

        return urls.filter((option) => option.indexOf(query)>-1);
    }

    getShortUrl(url:string) {
        const serviceTextLength = AppComponent.explorerValues.endpointUrl.length;
        const useLastPathSegmentOnly = serviceTextLength !== undefined && serviceTextLength > 50;

        if (!useLastPathSegmentOnly) {
            return url;
        }
        let links = constructGraphLinksFromFullPath(url);
        return "/" + links[links.length - 1].name;
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
        this.explorerValues.endpointUrl = this.explorerValues.endpointUrl.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|))/, (AppComponent.Options.GraphUrl + "/" + this.explorerValues.selectedVersion));
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