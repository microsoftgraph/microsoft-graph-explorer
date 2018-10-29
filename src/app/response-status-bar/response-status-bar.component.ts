// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IMessageBarContent } from '../base';
import { GraphExplorerComponent } from '../GraphExplorerComponent';

@Component({
  selector: 'message-bar',
  templateUrl: './response-status-bar.component.html',
  styleUrls: ['./response-status-bar.component.css'],
})
export class ResponseStatusBarComponent extends GraphExplorerComponent implements OnChanges {

    @Input() public message: IMessageBarContent;

    public messageHTML: string;

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    public ngOnChanges() {
        this.setMessageText();
    }

    public clearMessage() {
        this.message = null;
    }

    public setMessageText() {
        if (this.message) {
            this.messageHTML = this.sanitizer.bypassSecurityTrustHtml(this.message.text) as string;
        }
    }
}
