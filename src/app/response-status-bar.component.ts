// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, Input } from '@angular/core';
import { GraphApiCall } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";

@Component({
  selector: 'response-status-bar',
  template: `
    <div class="ms-MessageBar ms-MessageBar-singleline " [ngClass]="{'ms-MessageBar--success': isSuccessful(query()), 'ms-MessageBar--error': !isSuccessful(query()), 'hide-action-bar':!query()}">
        <div class="ms-MessageBar-content">
            <div class="ms-MessageBar-icon">
                <i class="ms-Icon" [ngClass]="{'ms-Icon--Completed': isSuccessful(query()), 'ms-Icon--errorBadge': !isSuccessful(query())}" ></i>
            </div>
            <div class="ms-MessageBar-actionables">
                <div class="ms-MessageBar-text" *ngIf="query()">
                    {{createTextSummary()}}<span id="duration-label">{{query().duration}}ms</span>
                </div>
            </div>
            <div class="ms-MessageBar-actionsOneline">
                <div id="dismiss-btn" class="ms-MessageBar-icon">
                    <a href="#" (click)="clearLastCallMessage()"><i class="ms-Icon ms-Icon--Cancel" style="padding-right: 10px;" aria-hidden="true"></i></a>
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

    span#duration-label {
        font-weight: 800;
        margin-left: 40px;
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
    isSuccessful(query:GraphApiCall) {
        if (!query) return false;
        return query.statusCode >= 200 && query.statusCode < 300;
    }

    query() {
        return AppComponent.lastApiCall;
    }

    createTextSummary() {
        const query = this.query();

        
        let text = "";
        if (this.isSuccessful(query)) {
            text += this.getStr("Success");
        } else {
            text += this.getStr("Failure");
        }

        text += ` - ${this.getStr("Status Code")} ${query.statusCode}`
        return text;
    }

    clearLastCallMessage() {
        AppComponent.lastApiCall = null;
    }

    static clearLastCallMessage() {
        AppComponent.lastApiCall = null;
    }
}