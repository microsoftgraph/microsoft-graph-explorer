// ------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AfterViewInit, Component } from '@angular/core';
import { AllowedGraphDomains } from '../base';
import { GraphExplorerComponent } from '../GraphExplorerComponent';

declare let fabric: any;

// Provides a link to share the last query issued from Graph Explorer.
@Component({
  selector: 'share-link-btn',
  templateUrl: './share-link-btn.component.html',
  styleUrls: ['./share-link-btn.component.css'],
})
export class ShareLinkBtnComponent extends GraphExplorerComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        const DialogElements = document.querySelectorAll('.ms-Dialog');
        const DialogComponents = [];
        for (let i = 0; i < DialogElements.length; i++) {
            ((() => {
                DialogComponents[i] = new fabric.Dialog(DialogElements[i]);
            })());
        }

    }

    /**
     * Shows the Share Code Dialog if the enter/return key is pressed.
     * @param e the event object
     */
    public showShareDialogKeyDown(e: any) {
        // Enter/return
        if (e.keyCode === 13) {
            this.showShareDialog();
        }
    }

    // Shows the Share Code Dialog.
    public showShareDialog() {
        const el = document.querySelector('#share-link-dialog');
        const fabricDialog = new fabric.Dialog(el);
        fabricDialog.open();
    }

    public getShareLink() {
        return this.createShareLink(this.explorerValues.endpointUrl,
          this.explorerValues.selectedOption, this.explorerValues.selectedVersion);
    }

    public createShareLink(fullRequestUrl, action, version) {
        const callComponents = this.getGraphCallComponents(fullRequestUrl);
        return window.location.origin
            + window.location.pathname
            + '?request=' + callComponents.requestUrl
             + '&method=' + action
             + '&version=' + callComponents.version
             + '&GraphUrl=' + callComponents.graphDeploymentUrl;
    }

    /**
     * Given a URL like https://graph.microsoft.com/v1.0/some/graph/api/call, extract
     * https://graph.microsoft.com and some/graph/api/call
     */
    public getGraphCallComponents(fullRequestUrl: string): IGraphApiCallUrlComponents  {
        if (!fullRequestUrl) {
            return;
        }

        for (const graphDeploymentUrl of AllowedGraphDomains) {
            if (fullRequestUrl.startsWith(graphDeploymentUrl)) {

                const apiCall = fullRequestUrl.split(graphDeploymentUrl)[1];
                const requestUrlComponents = apiCall.split('/');

                return {
                    graphDeploymentUrl,
                    version: requestUrlComponents[1],
                    requestUrl: requestUrlComponents.slice(2, requestUrlComponents.length).join('/'),
                };
            }
        }
    }
}

interface IGraphApiCallUrlComponents {
    graphDeploymentUrl?: string;
    requestUrl?: string;
    version?: string;
}
