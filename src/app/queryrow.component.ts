import { Component, Input } from '@angular/core';
import { AuthenticationStatus, ExplorerOptions, GraphApiCall } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";
import { getString } from "./api-explorer-helpers";
import { AppModule } from "./app.module";

@Component({
  selector: 'query-row',
  template: `
    <div class="api-query" (click)="runQuery(query)" [attr.title]="getTitle()" tabindex="0">
        <div class="row-1">
            <span class="request-badge" [ngClass]="query.method">{{query.method}}</span><span class="query">{{getQueryText()}}</span>
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
          margin-left: -26px;
      }

      .api-query .request-badge {
          border: 1px solid gray;
          min-width: 55px;
          display: inline-block;
          padding: 2px;
          text-align: center;
          margin-right: 15px;
          font-weight: 600;
      }

      .request-badge.GET {
          background-color: #000fdf
      }

      .request-badge.POST {
          background-color: #008412
      }

      .request-badge.PATCH {
          background-color: #be8b00
      }

      .request-badge.DELETE {
          background-color: #a10000  
      }


      .api-query .row-1 {
          display: inline;
      }

      .history-row-2 {
          margin-left: 69px;
      }

        .api-query .status-code.success {
            color: #05f505;
        }

        .api-query .status-code.error {
            color: #f7688d;
        }

        .api-query .date {
            display: none;
        }


        .api-query .duration {
            float: right;
        }


`]
})
export class QueryRowComponent extends GraphExplorerComponent {
    @Input() query: GraphApiCall;


    getTitle = function() {
        return this.query.requestUrl;
    }

    getQueryText = function() {
        let shortQueryUrl;
        if (this.query.requestUrl) {
            shortQueryUrl = this.query.requestUrl.split(AppComponent.Options.GraphUrl)[1];
        }
        
        let queryText = this.query.humanName || shortQueryUrl;

        return (getString(AppComponent.Options, queryText)) || queryText;
    }

    runQuery = function() {
        // apiService.text = query.requestUrl;
        // apiService.selectedOption = query.method;
    }
}