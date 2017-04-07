import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationStatus, ExplorerOptions, GraphApiCall, HistoryRecord } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";
import { getString } from "./api-explorer-helpers";
import { AppModule } from "./app.module";
import { QueryRowComponent } from "./queryrow.component";

import * as moment from "moment"

@Component({
  selector: 'history-query-row',
  template: `
    <query-row [query]="query">
        <div class="history-row-2">
            <span class="date">{{query.relativeDate}}</span>
            <span class="status-code"  ng-class="{'success': query.successful, 'error': !query.successful}">{{query.statusCode}}</span>
            <span class="duration">{{query.duration}} ms</span>
        </div>
    </query-row>
    `,
    styles: [`
    .duration {
        float: right;
    }
`]
})
export class HistoryRowComponent extends QueryRowComponent implements OnInit {
    ngOnInit(): void {
        setInterval(() => {
            this.setRelativeDate();
        }, 1000);
        this.setRelativeDate();
    }

    setRelativeDate() {
        this.query.relativeDate = moment(this.query.requestSentAt).fromNow();
    }

    @Input() query: ExtendedHistoryRecord;
    
}

export interface ExtendedHistoryRecord extends HistoryRecord {
    relativeDate: string
}