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
            <table>
                <tr>
                    <td style="width: 10px;">
                        <div class="ms-MessageBar-icon">
                            <i class="ms-Icon" [ngClass]="message.icon" *ngIf="message"></i>
                        </div>
                    </td>
                        <div class="ms-MessageBar-actionables">
                            <div class="ms-MessageBar-text" *ngIf="message" [innerHtml]="messageHTML"></div>
                        </div>
                    <td>
                    </td>
                    <td>
                        <div class="ms-MessageBar-actionsOneline">
                            <div id="dismiss-btn" class="ms-MessageBar-icon">
                                <a href="#" (click)="clearMessage()"><i class="ms-Icon ms-Icon--Cancel"></i></a>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
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

    .ms-MessageBar-text {
        font-size: 14px;
    }

    table {
        width: 100%;
    }

    .ms-Icon.ms-Icon--Cancel {
        color: black;
    }


`]
})
export class ResponseStatusBarComponent extends GraphExplorerComponent {

    @Input() message: MessageBarContent;

    messageHTML:string;

    constructor(private sanitizer: DomSanitizer) {
        super();        
    }

    ngOnChanges(changes: any) {
        this.setMessageText();
    }

    clearMessage() {
        this.message = null;
    }

    setMessageText() {
        if (this.message)
            this.messageHTML = this.sanitizer.bypassSecurityTrustHtml(this.message.text) as string;
    }

    static clearMessage() {
        AppComponent.messageBarContent = null;
    }

    hideActionBar() {
        return this.message == null ? "hide-action-bar": "";
    }

    getBackgroundClass() {
        if (this.message) {
            return this.message.backgroundClass;
        } else {
            return "";
        }
    }
}