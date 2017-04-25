// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { SampleQuery } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";

@Component({
  selector: 'template-tip',
  template: `
    <div class="ms-MessageBar ms-MessageBar-singleline" *ngIf="getQuery()">
        <div class="ms-MessageBar-content">
            <table>
                <tr>
                    <td>
                        <div class="ms-MessageBar-icon">
                            <i class="ms-Icon ms-Icon--Info"></i>
                        </div>
                    </td>
                    <td>
                        <div class="ms-MessageBar-actionables">
                            <div class="ms-MessageBar-text">
                                {{getQuery().tip}}
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="ms-MessageBar-actionsOneline">
                            <div id="dismiss-btn" class="ms-MessageBar-icon">
                                <a href="#" (click)="hideTip()"><i class="ms-Icon ms-Icon--Cancel" style="padding-right: 10px;" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    `,
    styles: [`

    table {
        width: 100%;
    }

    .ms-MessageBar {
        width: 100%;
        margin: 0px auto;
        font-size: 15px;
        margin-top: 15px;
    }

    .ms-MessageBar-content {
        padding: 6px;
    }

    .ms-MessageBar-content div {
        float: left;
    }

    .ms-MessageBar-content .ms-MessageBar-actionsOneline {
        float: right;
    }

    .hide-action-bar {
        opacity: 0;
    }

`]
})
export class TemplateTipComponent extends GraphExplorerComponent {
    getQuery():SampleQuery {
        return AppComponent.templateTipQuery;
    }

    hideTip() {
        AppComponent.templateTipQuery = null;
    }

    static hideTip() {
        AppComponent.templateTipQuery = null;
    }
}