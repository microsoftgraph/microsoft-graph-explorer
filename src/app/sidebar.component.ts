// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, AfterViewInit } from '@angular/core';
import { AuthenticationStatus, GraphApiCall, SampleQueryCategory } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { SampleCategories } from "./getting-started-queries";
import * as moment from 'moment'
import { AppComponent } from "./app.component";
import { SampleCategoriesPanelComponent } from "./sample-categories-panel.component";
declare let fabric;
@Component({
  selector: 'sidebar',
  template: `
      <div id="explorer-sidebar">
        <div class="arrow-left"></div>
        <div>
            <span id="explorer-title" class="c-heading-3 panel-header">{{getStr('Graph Explorer')}}</span>
        </div>
        <div class="c-drawer">
            <button id="auth-drawer-button" class="c-glyph" aria-expanded="true" disabled="true" aria-controls="authDrawer">
                  <span class="c-heading-5 panel-header"><i class="ms-Icon ms-Icon--Permissions" aria-hidden="true"></i>{{getStr('Authentication')}}</span></button>
            <div id="authDrawer" class="panel-content">

              <authentication></authentication>
            </div>
        </div>

        <div class="c-drawer">
            <button class="c-glyph" aria-expanded="true" aria-controls="refineDrawer">
                <span class="c-heading-5 panel-header"><img id="getting-started-svg" src="{{getAssetPath('assets/images/rocket1.svg')}}"/>{{getStr('Sample Queries')}}</span></button>
            <div id="refineDrawer" class="panel-content">
                <div id="sample-queries-scroll">
                    <div *ngFor="let category of categories" class="sample-category" [hidden]="!category.enabled">
                        <div><span class="category-heading">{{category.title}}</span></div>
                        <query-row [query]="query" *ngFor="let query of category.queries"></query-row>
                    </div>
                </div>
                <a href="#" id="manage-categories" class="c-hyperlink" tabindex=0 (click)="manageCategories()">{{getStr('show more groups')}}</a>
            </div>
        </div>
        <div class="c-drawer">
            <button class="c-glyph" aria-expanded="true" aria-controls="historyDrawer">
                  <span class="c-heading-5 panel-header"><i class="ms-Icon ms-Icon--History" aria-hidden="true"></i>{{getStr('History')}}</span></button>
            <div id="historyDrawer" class="panel-content">
                <history-query-row *ngFor="let query of getRequestHistory(5)" [query]="query"></history-query-row>
                <a href="#" id="show-full-history" (click)="manageHistory()" [hidden]="getRequestHistory().length == 0" class="c-hyperlink" tabindex=0>{{getStr('Show More')}}</a>
            </div>
        </div>

  </div>

  `,
  styles: [`
    #explorer-sidebar {
        background: #2F2F2F !important;
        min-height: 1024px;
        padding: 0px;
        color: white;
      	font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
    }

    #explorer-sidebar .c-hyperlink {
        color: #00bcf2;
    }

    #sample-queries-scroll {
        max-height: 400px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    #getting-started-svg {
        display: inline-block;
        width: 29px;
        height: 29px;
        margin: -2px 4px 2px -4px;
    }

    a#show-full-history, a#manage-categories {
        text-align: right;
        padding-right: 16px;
        width: 100%;
        display: block;
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
        padding-left: 28px;
        padding-right: 13px;
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

    #authDrawer {
        min-height: 96px;
    }

    .c-hyperlink {
        color: #00bcf2;
    }

    .category-heading {
        font-size: 17px;
        font-weight: 300;
        padding-bottom: 5px;
        display: block;
    }

    .sample-category {
        margin-bottom: 15px;
    }


    a#show-full-history {
        margin-top: 15px;
    }
    a#show-full-history[hidden] {
        display: none;
    }
  `]
})
export class SidebarComponent extends GraphExplorerComponent implements AfterViewInit {
    sampleCategoryPanel: Element;
    historyPanel: Element;

    ngAfterViewInit(): void {
        this.historyPanel = document.querySelector("#history-panel");
        this.sampleCategoryPanel = document.querySelector("#sample-categories-panel");

        $(document).keyup((e) => {
            if (e.keyCode === 27) // esc
                this.closePanels();
        });

    }

    categories:SampleQueryCategory[] = SampleCategories

    manageCategories() {
        // open sample category panel
        new fabric['Panel'](this.sampleCategoryPanel);

    }

    manageHistory() {
        // open history panel
        new fabric['Panel'](this.historyPanel);
        (document.querySelector("#history-panel tbody tr:first-child") as any).focus();
    }

    closePanels() {
        try {
            (document.querySelector("#history-panel .ms-Panel-closeButton") as any).click()
        } catch(e) {

        }

        try {
            (document.querySelector("#sample-categories-panel .ms-Panel-closeButton") as any).click()
        } catch(e) {

        }
    };
}
