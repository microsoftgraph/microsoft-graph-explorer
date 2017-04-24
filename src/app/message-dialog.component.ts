// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { getString } from "./api-explorer-helpers";
import { Message } from "./base";

declare let fabric:any;

@Component({
  selector: 'message-dialog',
  template: `
  <div>
    <div class="ms-Dialog ms-Dialog--close" id="message-dialog">
      <button class="ms-Dialog-button ms-Dialog-buttonClose">
        <i class="ms-Icon ms-Icon--Cancel"></i>
      </button>
      <div class="ms-Dialog-title" *ngIf="getMessage()">{{getMessage().title}}</div>
      <div class="ms-Dialog-content" *ngIf="getMessage()">
        {{getMessage().body}}
      </div>
      <div class="ms-Dialog-actions">
        <button class="ms-Button ms-Dialog-action">
          <span class="ms-Button-label">Close</span> 
        </button>
      </div>
    </div>
  </div>
    `,
    styles: [`
`]
})
export class MessageDialogComponent  {
  // static message:Message;
  static message:Message;// = MessageDialogComponent.message;

  static setMessage(message:Message) {
    MessageDialogComponent.message = message;
    setTimeout(() => {MessageDialogComponent.showDialog();});
  }

  getMessage() {
    return MessageDialogComponent.message;
  }

  static showDialog() {
    const el = document.querySelector("#message-dialog")
    const fabricDialog = new fabric['Dialog'](el);
    fabricDialog.open();
  }

}
