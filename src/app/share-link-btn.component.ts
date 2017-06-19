// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, AfterViewInit } from '@angular/core';
import { GraphExplorerComponent } from "./GraphExplorerComponent";

declare let fabric:any;

@Component({
  selector: 'share-link-btn',
  templateUrl: './share-link-btn.component.html',
  styleUrls: ['./share-link-btn.component.css']
})
export class ShareLinkBtnComponent extends GraphExplorerComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        var DialogElements = document.querySelectorAll(".ms-Dialog");
        var DialogComponents = [];
        for (var i = 0; i < DialogElements.length; i++) {
            (function(){
                DialogComponents[i] = new fabric['Dialog'](DialogElements[i]);
            }());
        }

    }

    showShareDialog() {
        const el = document.querySelector("#share-link-dialog")
        const fabricDialog = new fabric['Dialog'](el);
        fabricDialog.open();
    }

    getShareLink() {
        return this.createShareLink(this.explorerValues.endpointUrl, this.explorerValues.selectedOption, this.explorerValues.selectedVersion);
    }

    createShareLink(fullRequestUrl, action, version) {    
        return window.location.origin + window.location.pathname + "?request=" + this.extractGraphEndpoint(fullRequestUrl) + "&method=" + action + "&version=" + version;
    }

    extractGraphEndpoint(fullRequestUrl) {
        if (!fullRequestUrl) {
            return;
        }
        let requestUrl = fullRequestUrl.split('.com')
        requestUrl.shift();
        
        if (requestUrl.length === 0) {
            return;
        }
        var requestUrlComponents = requestUrl[0].split('/');
        requestUrlComponents.shift(); //remove empty item
        requestUrlComponents.shift(); //remove version
        return (requestUrlComponents.join('/'));
    }
}