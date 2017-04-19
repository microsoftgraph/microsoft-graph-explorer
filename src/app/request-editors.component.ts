// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, AfterViewInit } from '@angular/core';

import { GraphRequestHeader, CommonHeaders } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { getRequestBodyEditor, initializeAceEditor } from "./api-explorer-jseditor";
declare let mwf;
@Component({
  selector: 'request-editors',
  styles: [`

  #post-body-editor {
        position: relative;
        height: 20vh;
        border: 1px solid #ccc;
        margin-top: 10px;
    }

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

   .hide {
       opacity: 0;
   }

   .header-autocomplete {
        max-width: inherit;
        margin: 0px;
        height: inherit;
    }

    .c-menu.f-auto-suggest-no-results {
        display: none;
    }

`],
  template: `
    <div class="ms-Pivot">
        <ul class="ms-Pivot-links">
            <li class="ms-Pivot-link is-selected" data-content="headers" [attr.title]="getStr('request header')" tabindex="1">
                {{getStr('request header')}}
            </li>
            <li class="ms-Pivot-link" data-content="body" [attr.title]="getStr('request body')" (click)="initPostBodyEditor()" tabindex="1">
                {{getStr('request body')}}
            </li>
        </ul>
        <div class="ms-Pivot-content" data-content="headers">
            <div id="headers-editor">
                <table>
                    <tr>
                        <th>{{getStr('Key')}}</th>
                        <th>{{getStr('Value')}}</th>
                    </tr>
                    <tr *ngFor="let header of explorerValues.headers; let idx = index" class="header-row">
                        <td>
                        <div class="c-search header-autocomplete" autocomplete="off">
                            <input role="combobox" class="c-text-field header-name" (ngModelChange)="createNewHeaderField()" [attr.aria-controls]="'headers-autosuggest-'+idx" aria-autocomplete="both" aria-expanded="false" type="text" [attr.placeholder]="getPlaceholder(header)" [(ngModel)]="header.name" [disabled]="header.readonly">
                            <div class="m-auto-suggest" [attr.id]="'headers-autosuggest-'+idx" role="group">
                                <ul class="c-menu" aria-hidden="true" data-js-auto-suggest-position="default" tabindex="0" role="listbox"></ul>
                                <ul class="c-menu f-auto-suggest-no-results" aria-hidden="true" data-js-auto-suggest-position="default" tabindex="0"></ul>
                            </div>
                        </div>

                        </td>
                        <td>
                            <input id="default" class="c-text-field header-value" [(ngModel)]="header.value" [disabled]="header.readonly" type="text" name="default" [ngClass]="{hide: isLastHeader(header)}">
                        </td>
                        <td class="remove-header-btn" [hidden]="isLastHeader(header)">
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
        this.addEmptyHeader();
    }

    initPostBodyEditor() {
        const postBodyEditor = getRequestBodyEditor()
        initializeAceEditor(postBodyEditor);
    }

    isLastHeader(header:GraphRequestHeader) {
        return header == this.getLastHeader();
    }

    getPlaceholder(header:GraphRequestHeader) {
        if (this.getLastHeader() == header) {
            return this.getStr("Enter new header");
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
            this.addEmptyHeader()
        }

        setTimeout(() => {
            mwf.ComponentFactory.create([{
                component: mwf.AutoSuggest,
                callback: (autoSuggests) => {
                    if (!autoSuggests)
                        return;

                    for (let autoSuggest of autoSuggests) {
                        if (autoSuggests[1].element.parentElement.className.indexOf("header-autocomplete") == -1) continue;
                        autoSuggest.subscribe({
                            onMatchPatternChanged: (notification) => {
                                autoSuggest.updateSuggestions(CommonHeaders.filter((s => s.toLowerCase().indexOf(notification.pattern.toLowerCase()) != -1 )).map((s) => { return { type: 'string', value: s }}));
                            }
                        });
                    }

                }
            }]);
        }, 0);
    }
}