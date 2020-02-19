// ------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AfterViewChecked, AfterViewInit, Component, DoCheck, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { initializeJsonViewer, initializeResponseHeadersViewer } from '../api-explorer-jsviewer';
import { AppComponent } from '../app.component';
import { GraphApiVersion, IExplorerValues, IMessageBarContent, Methods } from '../base';
import { constructGraphLinksFromFullPath, getUrlsFromServiceURL, IGraphNodeLink } from '../graph-structure';
import { GraphExplorerComponent } from '../GraphExplorerComponent';
import { QueryRunnerService } from '../query-runner.service';
import { telemetry } from '../telemetry/telemetry';
import { getGraphUrl } from '../util';

declare let mwfAutoInit: any;

@Component({
    selector: 'main-column',
    templateUrl: './main-column.component.html',
    styleUrls: ['./main-column.component.css'],
    providers: [QueryRunnerService],
})
export class MainColumnComponent extends GraphExplorerComponent implements AfterViewInit, DoCheck, AfterViewChecked {
    public oldExplorerValues: IExplorerValues = {};
    public myControl = new FormControl();
    public methods = Methods;
    public GraphVersions = AppComponent.Options.GraphVersions;
    public showShareButton: boolean = false;

    @ViewChild('httpMethod', { read: ViewContainerRef }) public _httpMethodEl; // tslint:disable-line
    @ViewChild('graphVersion', { read: ViewContainerRef }) public _graphVersionEl; // tslint:disable-line
    @ViewChild('autoSuggest', { read: ViewContainerRef }) public _autoSuggestEl; // tslint:disable-line

    constructor(public queryRunnerService: QueryRunnerService) {
        super();
    }

    public messageBarContent(): IMessageBarContent {
        return AppComponent.messageBarContent;
    }

    public ngDoCheck() {
        if (this.explorerValues && JSON.stringify(this.oldExplorerValues) !== JSON.stringify(this.explorerValues)) {
            this.updateVersionFromEndpointUrl();
            this.updateGraphVersionSelect();

            this.updateHttpMethod();

            // Add content-type header when switching to POST
            if ((this.oldExplorerValues.selectedOption !== 'POST' && this.explorerValues.selectedOption === 'POST')
                || (this.oldExplorerValues.selectedOption !== 'PUT' && this.explorerValues.selectedOption === 'PUT')
                || (this.oldExplorerValues.selectedOption !== 'PATCH' && this.explorerValues.selectedOption === 'PATCH')
            ) {
                // If it doesn't already exist
                let hasContentTypeHeader = false;
                if (this.explorerValues.headers) {
                    for (const header of this.explorerValues.headers) {
                        if (header.name.toLowerCase() === 'content-type') {
                            hasContentTypeHeader = true;
                            break;
                        }
                    }
                    if (!hasContentTypeHeader) {
                        this.explorerValues.headers.unshift({
                            enabled: true,
                            name: 'Content-type',
                            readonly: false,
                            value: 'application/json',
                        });
                    }
                }
            }

            this.oldExplorerValues = JSON.parse(JSON.stringify(this.explorerValues));
        }
    }

    public ngAfterViewInit(): void {
        // Init telemetry
        const { mscc }: any = window;

        if (mscc && mscc.hasConsent()) {
            telemetry.initialize();
        }

        // Init httpMethod
        mwfAutoInit.ComponentFactory.create([{
            component: mwfAutoInit.Select,
            elements: [this._httpMethodEl.element.nativeElement],
            callback: (event: any) => {
                this.updateHttpMethod();
                event[0].subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedOption = method.id;

                        if (this.explorerValues.selectedOption === 'GET') { this.showShareButton = true; }
                    },
                });
            },
        }]);

        // Init Graph version selector
        mwfAutoInit.ComponentFactory.create([{
            component: mwfAutoInit.Select,
            elements: [this._graphVersionEl.element.nativeElement],
            callback: (event: any) => {
                this.updateGraphVersionSelect();
                event[0].subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedVersion = method.id as GraphApiVersion;
                        this.updateEndpointURLVersionFromVersion();
                    },
                });
            },
        }]);

        initializeJsonViewer();
        initializeResponseHeadersViewer();

        mwfAutoInit.ComponentFactory.create([{
            component: mwfAutoInit.AutoSuggest,
            elements: [this._autoSuggestEl.element.nativeElement],
            callback: (autoSuggests) => {
                if (autoSuggests && (autoSuggests.length > 0)) {
                    const autoSuggest = autoSuggests[0];
                    if (!!autoSuggest) {
                        autoSuggest.subscribe({
                            onMatchPatternChanged: (notification) => {
                                autoSuggest.updateSuggestions(this.getAutoCompleteOptions()
                                    .map((s) => ({ type: 'string', value: s })));
                            },
                        });
                    }
                }
            },
        }]);
    }

    public ngAfterViewChecked() {
        /*
         The code here disables/enables the http verb select element based on the authenticated status of the user.

         The html below is a model representation of how the MWF select element is rendered in the dom.
         The easier solution here would have been to disable the select element when the user logout but
         doing so does not disable the button element until the page is reloaded.

         <div>
             <select _ngcontent-c2="" role="button" tabindex="0" name="HTTP verb selector" id="httpMethodSelect-select">
                <options>...</options>
             </select>
             <div class="c-select-menu f-persist f-border" aria-disabled="true">
                <button aria-haspopup="true" aria-expanded="false" tabindex="0" disabled="">
                    GET
                </button>
              </div>
          <div>

          Because of the limitation mentioned above we have to manually get a reference to the button and disable it.
         */
        const selectElement = this._httpMethodEl.element.nativeElement.children[0];
        const selectElementButton = selectElement && selectElement.children[0];
        const hasDisabledAttribute = !!selectElementButton && selectElementButton.hasAttribute('disabled');

        // Since ngAfterViewChecked is called after every change detection cycle the hasDisabledAttribute makes sure
        // We are calling setAttribute/removeAttribute once and not every time ngAfterViewChecked is called.
        // Checking that the selectElement is not undefined will prevent a situation we have in the staging environment
        // Where setAttribute is called on an undefined object.
        if (this.isAuthenticated() && selectElement !== undefined && hasDisabledAttribute) {
            selectElement.setAttribute('aria-disabled', 'false');
        } else if (!this.isAuthenticated() && !hasDisabledAttribute) {
            selectElement.setAttribute('aria-disabled', 'true');
        }
    }

    public endpointInputKeyDown(event) {
        if (event.keyCode === 13) {
            this.submit();
        }
    }

    public submit = () => {
        if (this.explorerValues.requestInProgress) {
            return;
        }
        this.queryRunnerService.executeExplorerQuery();
    };

    public getRelativeUrlFromGraphNodeLinks(links: IGraphNodeLink[]) {
        return links.map((x) => x.name).join('/');
    }

    public updateVersionFromEndpointUrl() {
        // If the user typed in a different version, change the dropdown
        const graphPathStartingWithVersion = this.explorerValues.endpointUrl.split(getGraphUrl() + '/');
        if (graphPathStartingWithVersion.length < 2) {
            return;
        }
        const possibleGraphPathArr = graphPathStartingWithVersion[1].split('/');
        if (possibleGraphPathArr.length === 0) {
            return;
        }

        const possibleVersion = possibleGraphPathArr[0] as GraphApiVersion;

        /*
         If (AppComponent.Options.GraphVersions.indexOf(possibleVersion) !== -1) {
         possibleVersion is a valid version
        */
        this.explorerValues.selectedVersion = possibleVersion;

    }

    public getAutoCompleteOptions() {
        return this.getMatches(AppComponent.explorerValues.endpointUrl);
    }

    public getMatches(query: string): string[] {
        const urls = getUrlsFromServiceURL(AppComponent.explorerValues.selectedVersion);
        const currentGraphLinks = constructGraphLinksFromFullPath(query);

        if (!currentGraphLinks) {
            return [];
        }
        // If query ends with odata query param, don't return any URLs
        const lastNode = currentGraphLinks.pop();
        if (lastNode && lastNode.name.indexOf('?') !== -1) {
            return [];
        }

        return urls.filter((option) => option.indexOf(query) > -1);
    }

    public getShortUrl(url: string) {
        const serviceTextLength = AppComponent.explorerValues.endpointUrl.length;
        const useLastPathSegmentOnly = serviceTextLength !== undefined && serviceTextLength > 50;

        if (!useLastPathSegmentOnly) {
            return url;
        }
        const links = constructGraphLinksFromFullPath(url);
        return '/' + links[links.length - 1].name;
    }

    public updateGraphVersionSelect() {
        // Update version select from explorerValues
        const graphVersionSelectEl = this._graphVersionEl.element.nativeElement;

        if (!graphVersionSelectEl.mwfInstances) {
            return;
        }

        const graphVersionSelectMenu = graphVersionSelectEl.mwfInstances.Select.selectMenu;

        const graphVersionIdx = this.GraphVersions.indexOf(this.explorerValues.selectedVersion);
        if (graphVersionIdx === -1) {
            document.querySelector('.graph-version.c-select button').textContent = 'Other';
        }

        graphVersionSelectMenu.onItemSelected(graphVersionSelectMenu.items[graphVersionIdx]);

        this.updateEndpointURLVersionFromVersion();
    }

    public updateEndpointURLVersionFromVersion() {
        /* getGraphUrl() may be https://graph.microsoft.com/
        or another sovereign cloud deployment endpoint*/
        const path = this.explorerValues.endpointUrl.split(getGraphUrl() + '/');
        if (path.length > 1) {
            const pathStartingWithVersion = path[1].split('/');

            // Replace the version in the URL with the actual value
            pathStartingWithVersion[0] = AppComponent.explorerValues.selectedVersion;

            // Updates URL in input field
            this.explorerValues.endpointUrl = getGraphUrl() + '/' + pathStartingWithVersion.join('/');
        }
    }

    public updateHttpMethod() {
        const httpMethodSelectMenuEl = this._httpMethodEl.element.nativeElement;

        if (!httpMethodSelectMenuEl.mwfInstances) {
            return;
        }

        const httpMethodSelectMenu = httpMethodSelectMenuEl.mwfInstances.Select.selectMenu;

        const elementIdxToSelect = httpMethodSelectMenu.items[Methods.indexOf(this.explorerValues.selectedOption)];
        httpMethodSelectMenu.onItemSelected(elementIdxToSelect);
    }

}
