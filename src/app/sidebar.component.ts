import { Component } from '@angular/core';
import { AuthenticationStatus, GraphApiCall, HistoryRecord } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { GettingStartedQueries } from "./getting-started-queries";
import { safeGetRequestHistory } from "./history";

@Component({
  selector: 'sidebar',
  template: `
      <div id="explorer-sidebar">
        <div class="arrow-left"></div>
        <div>
            <span id="explorer-title" class="c-heading-3 panel-header">{{getStr(['Graph Explorer'])}}</span>
        </div>
        <div class="c-drawer">
            <button id="auth-drawer-button" class="c-glyph" aria-expanded="true" disabled="true" aria-controls="authDrawer">
                  <span class="c-heading-5 panel-header"><i class="ms-Icon ms-Icon--Permissions" aria-hidden="true"></i>{{getStr(['Authentication'])}}</span></button>
            <div id="authDrawer" class="panel-content">

              <authentication></authentication>
            </div>
        </div>

        <div class="c-drawer">
            <button class="c-glyph" aria-expanded="true" aria-controls="refineDrawer">
                
                <span class="c-heading-5 panel-header"><img  id="getting-started-svg" src="{{getAssetPath('assets/images/rocket1.svg')}}"/>{{getStr(['Getting Started'])}}</span></button>
            <div id="refineDrawer" class="panel-content">
                <div getting-started>
                    <query-row [query]="query" *ngFor="let query of queries"></query-row>
                </div>
            </div>
        </div>

        <div class="c-drawer">
            <button class="c-glyph" aria-expanded="true" aria-controls="historyDrawer">
                  <span class="c-heading-5 panel-header"><i class="ms-Icon ms-Icon--History" aria-hidden="true"></i>{{getStr('History')}}</span></button>
            <div id="historyDrawer" class="panel-content">
                <query-row [query]="query" *ngFor="let query of getRequestHistory(5)">
                    <div class="history-row-2">
                        <span class="date">{{query.requestSentAt}} ms</span>
                        <span class="status-code"  ng-class="{'success': query.successful, 'error': !query.successful}">{{query.statusCode}}</span>
                        <span class="duration">{{query.duration}} ms</span>
                    </div>
                </query-row>
                <a href="#" id="show-full-history" *ngIf="getRequestHistory().length > 0" class="c-hyperlink" tabindex=0 (click)="logout()">{{getStr('Show More')}}</a>
            </div>
        </div>

  </div>

  `,
  styles: [`
    #explorer-sidebar {
        background: #2F2F2F!important;
        height: 1024px;
        padding: 0px;
        /*height: 100%;*/
        color: white;
      	font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;

    }

    #explorer-sidebar .c-hyperlink {
        color: #00bcf2;
    }


    #getting-started-svg {
        display: inline-block;
        width: 29px;
        height: 29px;
        margin: -2px 4px 2px -4px;
    }

    a#show-full-history {
        float: right;
        margin-right: 27px;
    }


    span#explorer-title {
        margin-left: 40px;
        margin-top: 14px;
    }

    .c-drawer {
        padding-bottom: 5px;
    }

    #explorer-sidebar .panel-header {
        font-family: "Segoe UI","wf_segoe-ui_normal","Arial",sans-serif;
        display: inline-block;
        padding: 0px;
        padding-left: 6px;
        font-weight: 100;
        color: white;
    }

    #explorer-sidebar .panel-content {
        padding-left: 46px;
        font-size: 13px;
    }

    #explorer-sidebar .panel-header i.ms-Icon{
        margin-right: 10px;
    }


    /* Remove drawer carrot on auth */
    #auth-drawer-button:after{
        content:none;
    }


    .arrow-left {
        border-top: 18px solid transparent;
        border-bottom: 18px solid transparent;
        border-right: 18px solid white;
        position: relative;
        right: -10px;
        top: 13px;
        margin-bottom: -45px;
    }

    button.c-glyph {
        color: white;
    }


  `]
})
export class SidebarComponent extends GraphExplorerComponent {
  queries:GraphApiCall[] = GettingStartedQueries

  // @todo move to init on load so not querying localstorage multiple times?
  getRequestHistory = (limit?:number):HistoryRecord[] => {
      if (limit) return safeGetRequestHistory().slice(0, limit);


      return safeGetRequestHistory();
  }
}
