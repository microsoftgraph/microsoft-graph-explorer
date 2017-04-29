// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { GraphApiCall } from "./base";
import { AppComponent } from "./app.component";
import * as moment from "moment"
import { getShortQueryText } from "./ApiCallDisplayHelpers";
import { getString } from "./localization-helpers";
import { saveHistoryToLocalStorage } from "./history";

@Component({
  selector: 'history-panel',
  styles: [`
    .status-code.success {
        color: #006300;
    }

    .status-code.error {
        color: #9c0028;
    }

    tr.request-history-query:hover td:not(.remove-query) {
        background-color: #f4f4f4;
        cursor: pointer;
    }

    td.remove-query i {
        opacity: 0;
    }

    tr.request-history-query:hover td.remove-query i {
        opacity: 1;
    }

    td.duration {
        text-align: right;
    }

    tr.request-history-query:hover td.remove-query {
        cursor: pointer;
        text-align: center;
    }

    td.remove-query:hover {
        background-color: #e4e4e4;
    }

    #panel-actions {
        position: absolute;
        bottom: 0px;
        width: 100%;
        background: white;
        padding: 15px;
        text-align: right;
        padding-right: 80px;
    }

    
    tr.request-history-query.restrict:hover td {
        cursor: not-allowed !important;
    }

`],
  template: `
    <div id="history-panel" class="ms-Panel ms-Panel--xl">
        <button class="ms-Panel-closeButton ms-PanelAction-close" tabindex="1">
            <i class="ms-Panel-closeIcon ms-Icon ms-Icon--Cancel"></i>
        </button>
        <div class="ms-Panel-contentInner">
            <p class="ms-Panel-headerText">{{getStr('History')}}</p>
            <div class="ms-Panel-content">
                <table class="ms-Table">
                    <thead>
                        <tr>
                            <th>{{getStr('Method')}}</th>
                            <th>{{getStr('Query')}}</th>
                            <th>{{getStr('Date')}}</th>
                            <th>{{getStr('Status Code')}}</th>
                            <th style="text-align:right">{{getStr('Duration')}}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let query of getRequestHistory()" class="request-history-query" [ngClass]="{restrict: (!isAuthenticated() && query.method != 'GET')}">
                            <td (click)="handleQueryClick(query)"><method-badge [query]="query"></method-badge></td>
                            <td (click)="handleQueryClick(query)">{{getQueryText(query)}}</td>
                            <td (click)="handleQueryClick(query)">{{query.relativeDate}}</td>
                            <td (click)="handleQueryClick(query)"><span class="status-code" [ngClass]="getSuccessClass(query)">{{query.statusCode}}</span></td>
                            <td class="duration" (click)="handleQueryClick(query)">{{query.duration}} {{getStr('milliseconds')}}</td>
                            <td class="remove-query" (click)="removeQueryFromHistory(query)"><i class="ms-Icon ms-Icon--Cancel"></i></td>
                        </tr>
                    </tbody>
                </table>
                <div id="panel-actions">
                    <button name="button" class="c-button" type="submit" (click)="clearHistory()">
                        {{getStr('Remove All')}}
                    </button>
                </div>

            </div>
        </div>
    </div>
     `,
})
export class HistoryPanelComponent extends GraphExplorerComponent implements OnInit {
    constructor(private _changeDetectionRef : ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        setInterval(() => {
            for (let historyRecord of AppComponent.requestHistory) {
                historyRecord.relativeDate = moment(historyRecord.requestSentAt).fromNow();
            }
            this._changeDetectionRef.detectChanges();
        }, 5000);
    }


    closeHistoryPanel = () => {
        (document.querySelector("#history-panel .ms-Panel-closeButton") as any).click()
    };

    getQueryText(query: GraphApiCall) {
        return getShortQueryText(query);
    }

    getSuccessClass(query: GraphApiCall) {        
        return query.statusCode >= 200 && query.statusCode < 300 ? "success" : "error";
    }

    removeQueryFromHistory(query:GraphApiCall) {
        AppComponent.removeRequestFromHistory(query);
    }

    clearHistory() {
        AppComponent.requestHistory = [];
        saveHistoryToLocalStorage(AppComponent.requestHistory)
    }

    handleQueryClick(query: GraphApiCall) {
        if (!this.isAuthenticated() && query.method != 'GET') {
            return;
        }

        this.loadQueryIntoEditor(query);
        this.closeHistoryPanel();

        if (query.method == 'GET') {
            AppComponent.executeExplorerQuery(true);
        }
    }
}