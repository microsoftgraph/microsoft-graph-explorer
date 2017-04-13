// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { AuthenticationStatus, ExplorerOptions, GraphApiCall, HistoryRecord } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";
import { getString } from "./api-explorer-helpers";
import { AppModule } from "./app.module";
import { GraphService } from "./api-explorer-svc";
import { getShortQueryText } from "./ApiCallDisplayHelpers";

@Component({
  selector: 'query-row',
  template: `
    <div class="api-query" (click)="loadQueryIntoEditor(this.query)" (keydown)="loadQueryIntoEditor(this.query)" [attr.title]="getTitle()" tabindex="0">
        <div class="row-1">
            <method-badge [query]="query"></method-badge>
            <span class="query">{{getQueryText()}}</span>
            <a *ngIf="query.docLink" href="{{query.docLink}}" target="_blank"><i class="ms-Icon ms-Icon--Page"></i></a>
        </div>
      <ng-content></ng-content>
    </div>`,
    styles: [`
      .api-query:hover, .c-drawer>button:hover {
          background: rgba(0,0,0,0.25);
      }

      .api-query {
          cursor: pointer;
          font-size: 13px;
          line-height: 16px;
          display: block;
          border: 0;
          background: 0 0;
          font-weight: 500;
          padding: 5px 5px 5px 12px;
          left: 0;
          text-align: left;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: -12px;
      }

      .row-1 {
          display: inline;
      }

    .duration {
        float: right;
    }

    i.ms-Icon.ms-Icon--Page {
        float: right;
        padding-top: 5px;
    }


`]
})
export class QueryRowComponent extends GraphExplorerComponent {
    @Input() query: GraphApiCall;


    getTitle() {
        return this.query.requestUrl;
    }

    getQueryText() {
        return getShortQueryText(this.query);
    }
}