// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, AfterViewInit, ViewChild, ViewContainerRef, DoCheck } from '@angular/core';
import { Methods, ExplorerValues, MessageBarContent, GraphApiVersion } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";
import { FormControl } from "@angular/forms";
import { GraphNodeLink, constructGraphLinksFromFullPath, getUrlsFromServiceURL } from "./graph-structure";
import { initializeJsonViewer, initializeResponseHeadersViewer } from "./api-explorer-jsviewer";
import { QueryRunnerService } from "./query-runner.service";

declare let mwf: any;

@Component({
    selector: 'main-column',
    templateUrl: './main-column.component.html',
    styleUrls: ['./main-column.component.css'],
    providers: [QueryRunnerService]
})

export class MainColumnComponent extends GraphExplorerComponent implements AfterViewInit, DoCheck {
    oldExplorerValues: ExplorerValues = {};

    messageBarContent(): MessageBarContent {
        return AppComponent.messageBarContent;
    }

    ngDoCheck() {
        if (this.explorerValues && JSON.stringify(this.oldExplorerValues) !== JSON.stringify(this.explorerValues)) {
            this.updateVersionFromEndpointUrl();
            this.updateGraphVersionSelect();

            this.updateHttpMethod();

            // add content-type header when switching to POST
            if ((this.oldExplorerValues.selectedOption !== "POST" && this.explorerValues.selectedOption === "POST")
                || (this.oldExplorerValues.selectedOption !== "PATCH" && this.explorerValues.selectedOption === "PATCH")) {
                // if it doesn't already exist
                let hasContentTypeHeader = false;
                if (this.explorerValues.headers) {
                    for (let header of this.explorerValues.headers) {
                        if (header.name.toLowerCase() === "content-type") {
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
            callback: (event: any) => {
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
            callback: (event: any) => {
                this.updateGraphVersionSelect();
                event[0].selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedVersion = document.getElementById("-" + method.id).children[0].textContent as GraphApiVersion;
                        this.updateEndpointURLVersionFromVersion();
                    }
                })
            }
        }]);

        initializeJsonViewer();
        initializeResponseHeadersViewer();

        mwf.ComponentFactory.create([{
            component: mwf.AutoSuggest,
            elements: [this._autoSuggestEl.element.nativeElement],
            callback: (autoSuggests) => {
                if (autoSuggests && (autoSuggests.length > 0)) {
                    let autoSuggest = autoSuggests[0];
                    if (!!autoSuggest) {
                        autoSuggest.subscribe({
                            onMatchPatternChanged: (notification) => {
                                autoSuggest.updateSuggestions(this.getAutoCompleteOptions().map((s) => { return { type: 'string', value: s } }));
                                // autoSuggest.updateSuggestions(this.getAutoCompleteOptions().map((s) => { return { type: 'string', value: this.getShortUrl(s) }}));
                            }
                        });
                    }
                }
            }
        }]);
    }

    @ViewChild('httpMethod', { read: ViewContainerRef }) _httpMethodEl;
    @ViewChild('graphVersion', { read: ViewContainerRef }) _graphVersionEl;
    @ViewChild('autoSuggest', { read: ViewContainerRef }) _autoSuggestEl;

    methods = Methods;
    GraphVersions = AppComponent.Options.GraphVersions;

    endpointInputKeyDown(event) {
        if (event.keyCode === 13) {
            this.submit()
        }
    }

    submit = () => {
        if (this.explorerValues.requestInProgress) {
            return;
        }
        this.queryRunnerService.executeExplorerQuery();
    }

    getRelativeUrlFromGraphNodeLinks(links: GraphNodeLink[]) {
        return links.map((x) => x.name).join('/');
    }

    updateVersionFromEndpointUrl() {
        // if the user typed in a different version, change the dropdown
        let graphPathStartingWithVersion = this.explorerValues.endpointUrl.split(AppComponent.Options.GraphUrl + "/");
        if (graphPathStartingWithVersion.length < 2) {
            return;
        }
        let possibleGraphPathArr = graphPathStartingWithVersion[1].split('/');
        if (possibleGraphPathArr.length === 0) {
            return;
        }

        let possibleVersion = possibleGraphPathArr[0] as GraphApiVersion;

        // if (AppComponent.Options.GraphVersions.indexOf(possibleVersion) !== -1) {
        // possibleVersion is a valid version
        this.explorerValues.selectedVersion = possibleVersion;
        // }
        // parseMetadata();

    }

    getAutoCompleteOptions() {
        return this.getMatches(AppComponent.explorerValues.endpointUrl);
    }

    constructor(public queryRunnerService: QueryRunnerService) {
        super();
    }

    getMatches(query: string): string[] {
        let urls = getUrlsFromServiceURL(AppComponent.explorerValues.selectedVersion);
        let currentGraphLinks = constructGraphLinksFromFullPath(query);

        if (!currentGraphLinks) {
            return [];
        }
        // if query ends with odata query param, don't return any URLs
        const lastNode = currentGraphLinks.pop();
        if (lastNode && lastNode.name.indexOf("?") !== -1) {
            return [];
        }

        return urls.filter((option) => option.indexOf(query) > -1);
    }

    getShortUrl(url: string) {
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
        if (graphVersionIdx === -1) {
            document.getElementById("-Other").children[0].textContent = this.explorerValues.selectedVersion;
            graphVersionIdx = this.GraphVersions.indexOf("Other");

            // if we're selecting the other twice, the button text won't update automatically
            document.querySelector(".graph-version.c-select button").textContent = this.explorerValues.selectedVersion;
        }

        graphVersionSelectMenu.onItemSelected(graphVersionSelectMenu.items[graphVersionIdx]);



        this.updateEndpointURLVersionFromVersion();

    }

    updateEndpointURLVersionFromVersion() {
        // AppComponent.Options.GraphUrl may be https://graph.microsoft.com/ or another sovereign cloud deployment endpoint
        let path = this.explorerValues.endpointUrl.split(AppComponent.Options.GraphUrl + '/');
        if (path.length > 1) {
            let pathStartingWithVersion = path[1].split("/");
            pathStartingWithVersion[0] = AppComponent.explorerValues.selectedVersion; // replace the version in the URL with the actual value
            this.explorerValues.endpointUrl = AppComponent.Options.GraphUrl + '/' + pathStartingWithVersion.join("/"); // updates URL in input field
        }
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