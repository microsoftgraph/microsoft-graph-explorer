// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { getShortQueryText } from './ApiCallDisplayHelpers';
import { AppComponent } from './app.component';
import { SampleQuery } from './base';
import { GraphExplorerComponent } from './GraphExplorerComponent';
import { QueryRunnerService } from './query-runner.service';

@Component({
    selector: 'query-row',
    templateUrl: './queryrow.component.html',
    styleUrls: ['./queryrow.component.css'],
    providers: [QueryRunnerService],
})
export class QueryRowComponent extends GraphExplorerComponent {

    @Input() public category: string;
    @Input() public query: SampleQuery;

    constructor(public queryRunnerService: QueryRunnerService) {
        super();
    }

    public queryKeyDown(event) {
        if (event.keyCode === 13) {
            this.loadQueryIntoEditor(this.query);
        }
    }

    public getTitle() {
        return this.getAriaLabelForSampleRow(); // This.getQueryText() + " | " + this.query.requestUrl;
    }

    public getQueryText() {
        return getShortQueryText(this.query);
    }

    /**
     * @returns The identifier of query button element.
     */
    public getQueryButtonId(): string {
        return (this.query.method + ' ' + this.getQueryText()).replace(/\s+/g, '-').toLowerCase();
    }

    /**
     * @returns The value for the aria-labelledby element that is used by AT.
     */
    public getAriaLabelledBy(): string {
        return this.category + ' ' + this.getQueryButtonId();
    }

    public getAriaLabelForSampleRow() {
        return this.query.method + ' ' + this.getQueryText() + ' sample request';
    }

    public handleQueryClick() {
        this.loadQueryIntoEditor(this.query);

        if (this.query.method === 'GET') {
            if (!this.query.tip || !this.isAuthenticated()) {
                this.queryRunnerService.executeExplorerQuery(true);
            } else if (this.query.tip) {
                this.displayTipMessage();
            }
        } else if (this.query.tip && this.isAuthenticated()) {
            this.displayTipMessage();
        }
    }

    public displayTipMessage() {
        AppComponent.messageBarContent = {
            backgroundClass: 'ms-MessageBar--warning',
            icon: 'ms-Icon--Info',
            text: this.query.tip
        };
    }
}