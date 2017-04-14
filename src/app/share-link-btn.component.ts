// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GraphExplorerComponent } from "./GraphExplorerComponent";

declare let fabric:any;

@Component({
  selector: 'share-link-btn',
  template: `
    <div id="response-action-bar">
        <i class="ms-Icon ms-Icon--Share" title="{{getStr('Share Query')}}" aria-hidden="true" aria-label="Share" (click)="showShareDialog()"></i>
    </div>
    <div class="ms-Dialog" id="share-link-dialog">
        <div class="ms-Dialog-title">{{getStr('Share Query')}}</div>
        <div class="ms-Dialog-content">
            <label class="c-label" for="default">{{getStr('Share this link to let people try your current query in the Graph Explorer.')}}</label>
            <input id="default" class="c-text-field" type="text" name="default" (click)="this.select();" value="{{getShareLink()}}">
        </div>
      <div class="ms-Dialog-actions">
            <button class="ms-Button ms-Dialog-action">
                <span class="ms-Button-label">{{getStr('Close')}}</span>
            </button>
        </div>
    </div>
    `,
    styles: [`

    #response-action-bar i {
        cursor: pointer;
    }
    
    #response-action-bar {
        float: right;
        margin-right: 5px;
        font-size: 20px;
        position: relative;
        bottom: -21px;
    }
`]
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
        const el = document.querySelector(".ms-Dialog")
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
        let requestUrl = fullRequestUrl.split('.com')
        requestUrl.shift();
        
        var requestUrlComponents = requestUrl[0].split('/');
        requestUrlComponents.shift(); //remove empty item
        requestUrlComponents.shift(); //remove version
        return (requestUrlComponents.join('/'));
    }
}