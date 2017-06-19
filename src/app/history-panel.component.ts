// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { GraphApiCall } from "./base";
import { AppComponent } from "./app.component";
import { getShortQueryText } from "./ApiCallDisplayHelpers";
import { saveHistoryToLocalStorage } from "./history";
import { QueryRunnerService } from "./query-runner.service";

declare let moment:any;

@Component({
  selector: 'history-panel',
  styleUrls: ['./history-panel.component.css'],
  templateUrl: './history-panel.component.html',
  providers: [QueryRunnerService],
})
export class HistoryPanelComponent extends GraphExplorerComponent implements OnInit {
    constructor(private _changeDetectionRef : ChangeDetectorRef, private queryRunnerService: QueryRunnerService) {
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
        if (!this.isAuthenticated() && query.method !== 'GET') {
            return;
        }

        this.loadQueryIntoEditor(query);
        this.closeHistoryPanel();

        if (query.method === 'GET') {
            this.queryRunnerService.executeExplorerQuery(true);
        }
    }
}