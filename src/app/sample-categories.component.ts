// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { HistoryRecord, GraphApiCall } from "./base";
import { AppComponent } from "./app.component";
import * as moment from "moment"
import { getShortQueryText } from "./ApiCallDisplayHelpers";
import { getString } from "./api-explorer-helpers";
import { saveHistoryToLocalStorage } from "./history";

declare let fabric:any;

@Component({
  selector: 'sample-categories-panel',
  styles: [`

`],
  template: `
    <div id="sample-categories-panel" class="ms-Panel ms-Panel--xl">
        <button class="ms-Panel-closeButton ms-PanelAction-close" tabindex="1">
            <i class="ms-Panel-closeIcon ms-Icon ms-Icon--Cancel"></i>
        </button>
        <div class="ms-Panel-contentInner">
            <p class="ms-Panel-headerText">{{getStr('Edit Sample Categories')}}</p>
            <div class="ms-Panel-content">
                hello, world
            </div>
        </div>
    </div>
     `,
})
export class SampleCategoriesPanelComponent extends GraphExplorerComponent {

}