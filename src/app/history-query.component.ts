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
            <span class="status-code" [ngClass]="successClass">{{query.statusCode}}</span>
            <span class="duration">{{query.duration}} ms</span>
        </div>
    </query-row>
    `,
    styles: [`
    .duration {
        float: right;
    }
    
    .status-code.success {
        color: #05f505;
    }

    .status-code.error {
        color: #f7688d;
    }
`]
})
export class HistoryRowComponent extends QueryRowComponent implements OnInit {
    ngOnInit(): void {
        setInterval(() => {
            this.setRelativeDate();
        }, 1000);
        this.setRelativeDate();
        this.successClass = this.query.statusCode >= 200 && this.query.statusCode < 300 ? "success" : "error";
    }


    setRelativeDate() {
        this.query.relativeDate = moment(this.query.requestSentAt).fromNow();
    }

    @Input() query: ExtendedHistoryRecord;
    
    successClass:string;
    
}

export interface ExtendedHistoryRecord extends HistoryRecord {
    relativeDate: string
}