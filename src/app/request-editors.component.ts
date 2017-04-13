// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, AfterViewInit } from '@angular/core';

import { AuthenticationStatus, GraphRequestHeader } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";

@Component({
  selector: 'request-editors',
  styles: [`
  .header-row input {
    width: 95%;
    margin-top: 5px;
  }

  table {
      width: 100%;
  }
  th {
      text-align: left;
      font-weight: 300;
  }

  td.remove-header-btn {
    font-size: 20px;
  }

   td.remove-header-btn:hover {
        cursor: pointer;
   }

   td.remove-header-btn i {
        margin-top: 12px;
        font-size: 20px;
   }

`],
  template: `
    <div class="ms-Pivot">
        <ul class="ms-Pivot-links">
            <li class="ms-Pivot-link is-selected" ng-click="onTabSelected(0)" data-content="headers" [attr.title]="getStr('request header')" tabindex="1">
                {{getStr('request header')}}
            </li>
            <li class="ms-Pivot-link" data-content="body" [attr.title]="getStr('request body')" tabindex="1">
                {{getStr('request body')}}
            </li>
        </ul>
        <div class="ms-Pivot-content" data-content="headers">
            <div id="headers-editor">
                <table>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    <tr *ngFor="let header of explorerValues.headers" class="header-row">
                        <td>
                            <input id="default" class="c-text-field header-name" [attr.placeholder]="getPlaceholder(header)" [(ngModel)]="header.name" [disabled]="header.readonly" type="text" name="default" (ngModelChange)="createNewHeaderField()">
                        </td>
                        <td>
                            <input id="default" class="c-text-field header-value" [(ngModel)]="header.value" [disabled]="header.readonly" type="text" name="default">
                        </td>
                        <td class="remove-header-btn">
                            <i (click)="removeHeader(header)" class="ms-Icon ms-Icon--Cancel"></i>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="ms-Pivot-content" data-content="body">
            <div id="requestBodyContainer">
                <div id="post-body-editor"></div>
            </div>
        </div>
    </div>
     `,
})
export class RequestEditorsComponent extends GraphExplorerComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        this.addEmptyHeader()
    }

    addEmptyHeader() {
        this.explorerValues.headers.push({
            name: "",
            readonly: false,
            value: ""
        })
    }

    getLastHeader() {
        return this.explorerValues.headers[this.explorerValues.headers.length - 1]
    }

    getPlaceholder(header:GraphRequestHeader) {
        if (this.getLastHeader() == header) {
            return this.getStr("New header");
        }
    }

    removeHeader(header:GraphRequestHeader) {
        let idx = this.explorerValues.headers.indexOf(header);

        if (idx != -1) {
            this.explorerValues.headers.splice(idx, 1);
        } else {
            console.error("Can't remove header", header)
        }
    }

    createNewHeaderField() {
        if (this.getLastHeader().name != "") {
            this.addEmptyHeader();
        }
    }
}