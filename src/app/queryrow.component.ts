// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { SampleQuery } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { getShortQueryText } from "./ApiCallDisplayHelpers";
import { AppComponent } from "./app.component";
import { QueryRunnerService } from "./query-runner.service";

@Component({
    selector: 'query-row',
    templateUrl: './queryrow.component.html',
    styleUrls: ['./queryrow.component.css'],
    providers: [QueryRunnerService],
})
export class QueryRowComponent extends GraphExplorerComponent {

    @Input() category: string;
    @Input() query: SampleQuery;

    constructor(public queryRunnerService: QueryRunnerService) {
        super();
    }

    queryKeyDown(event) {
        if (event.keyCode === 13) {
            this.loadQueryIntoEditor(this.query)
        }
    }

    getTitle() {
        return this.getAriaLabelForSampleRow(); //this.getQueryText() + " | " + this.query.requestUrl;
    }

    getQueryText() {
        return getShortQueryText(this.query);
    }

    /**
     * @returns The identifier of query button element.
     */
    getQueryButtonId(): string {
        return (this.query.method + " " + this.getQueryText()).replace(/\s+/g, '-').toLowerCase();
    }

    /**
     * @returns The value for the aria-labelledby element that is used by AT.
     */
    getAriaLabelledBy(): string {
        return this.category + " " + this.getQueryButtonId();
    }

    getAriaLabelForSampleRow() {
        return this.query.method + " " + this.getQueryText() + " sample request";
    }

    handleQueryClick() {
        this.loadQueryIntoEditor(this.query);

        if (this.query.method === 'GET') {
            if (!this.query.tip || !this.isAuthenticated()) {
                this.queryRunnerService.executeExplorerQuery(true);
            } else if (this.query.tip) {
                this.displayTipMessage();
            }
        } else if (this.query.tip && this.isAuthenticated()) {
            this.displayTipMessage()
        }
    }

    displayTipMessage() {
        AppComponent.messageBarContent = {
            backgroundClass: "ms-MessageBar--warning",
            icon: "ms-Icon--Info",
            text: this.query.tip
        }
    }
}