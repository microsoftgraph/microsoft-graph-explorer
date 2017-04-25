// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, Input, Sanitizer, SecurityContext } from '@angular/core';
import { GraphApiCall, MessageBarContent } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'message-bar',
  template: `
    <div class="ms-MessageBar ms-MessageBar-singleline " [ngClass]="[getBackgroundClass(), hideActionBar()]">
        <div class="ms-MessageBar-content">
            <div class="ms-MessageBar-icon">
                <i class="ms-Icon" [ngClass]="getMessage().icon" *ngIf="getMessage()"></i>
            </div>
            <div class="ms-MessageBar-actionables">
                <div class="ms-MessageBar-text" *ngIf="getMessage()" [innerHtml]="getMessageText()"></div>
            </div>
            <div class="ms-MessageBar-actionsOneline">
                <div id="dismiss-btn" class="ms-MessageBar-icon">
                    <a href="#" (click)="clearMessage()"><i class="ms-Icon ms-Icon--Cancel" style="padding-right: 10px;" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [`

    .ms-MessageBar {
        width: 100%;
        margin: 0px auto;
        font-size: 15px;
        margin-top: 15px;
    }

    .ms-MessageBar-content {
        padding: 6px;
    }
    .ms-MessageBar-content div {
        float: left;
    }
    .ms-MessageBar-content .ms-MessageBar-actionsOneline {
        float: right;
    }
    .hide-action-bar {
        opacity: 0;
    }

`]
})
export class ResponseStatusBarComponent extends GraphExplorerComponent {
    constructor(private sanitizer: DomSanitizer) {
        super();        
    }

    getMessage() {
        return AppComponent.messageBarContent;
    }

    clearMessage() {
        AppComponent.messageBarContent = null;
    }

    getMessageText() {
        return this.sanitizer.bypassSecurityTrustHtml(this.getMessage().text) as string;
    }

    static clearMessage() {
        AppComponent.messageBarContent = null;
    }

    hideActionBar() {
        return this.getMessage() == null ? "hide-action-bar": "";
    }

    getBackgroundClass() {
        if (this.getMessage()) {
            return this.getMessage().backgroundClass;
        } else {
            return "";
        }
    }
}