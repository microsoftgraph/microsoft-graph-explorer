// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";


declare let fabric;

@Component({
  selector: 'generic-dialog',
  styles: [`

`],
  template: `
  <div>
    <div class="ms-Dialog ms-Dialog--close" id="message-dialog">
      <button class="ms-Dialog-button ms-Dialog-buttonClose">
        <i class="ms-Icon ms-Icon--Cancel"></i>
      </button>
      <div class="ms-Dialog-title">{{getMessage()?.title}}</div>
      <div class="ms-Dialog-content">
        {{getMessage()?.body}}
      </div>
      <div class="ms-Dialog-actions">
        <button class="ms-Button ms-Dialog-action">
          <span class="ms-Button-label">{{getStr('Close')}}</span>
        </button>
      </div>
    </div>
  </div>

     `,
})
export class GenericDialogComponent extends GraphExplorerComponent {
  getMessage() {
    return AppComponent.message;
  }

  static showDialog() {
    const el = document.querySelector("#message-dialog")
    const fabricDialog = new fabric['Dialog'](el);
    fabricDialog.open();
  }
}