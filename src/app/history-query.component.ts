import { Component, Input } from '@angular/core';
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
            <span class="date">{{getRelativeDate(query)}}</span>
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
export class HistoryRowComponent extends QueryRowComponent {
    @Input() query: GraphApiCall;

    getRelativeDate(query:HistoryRecord) {
        return moment(query.requestSentAt).fromNow();
      }

}