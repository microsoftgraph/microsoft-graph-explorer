// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { MessageBarContent } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'message-bar',
  templateUrl: './response-status-bar.component.html',
  styleUrls: ['./response-status-bar.component.css']
})
export class ResponseStatusBarComponent extends GraphExplorerComponent {

    @Input() message: MessageBarContent;

    messageHTML:string;

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    ngOnChanges(changes: any) {
        this.setMessageText();
    }

    clearMessage() {
        this.message = null;
    }

    setMessageText() {
        if (this.message) {
            this.messageHTML = this.sanitizer.bypassSecurityTrustHtml(this.message.text) as string;
        }
    }
}