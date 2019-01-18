// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AfterViewInit, Component } from '@angular/core';

import { IGraphRequestHeader } from '../base';
import { GraphExplorerComponent } from '../GraphExplorerComponent';
import { initializeEditor } from './monaco-editor';

declare const bodyEditor: any;

@Component({
    selector: 'request-editors',
    styleUrls: ['./request-editors.component.css'],
    templateUrl: './request-editors.component.html',
})
export class RequestEditorsComponent extends GraphExplorerComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        this.addEmptyHeader();
        initializeEditor();
        bodyEditor.setValue('{}');
    }

    public isLastHeader(header: IGraphRequestHeader) {
        return header === this.getLastHeader();
    }

    public getPlaceholder(header: IGraphRequestHeader) {
        if (this.getLastHeader() === header) {
            return this.getStr('Enter new header');
        }
    }

    /**
     * Check the keyboard input and remove the header if Enter/Return
     * is selected when the button is the active element.
     * @param e The event arguments.
     * @param header The header key to remove from the request UI.
     */
    public removeHeaderKeyDown(e: any, header: IGraphRequestHeader) {
        // Enter/return
        if (e.keyCode === 13) {
            this.removeHeader(header);
        }
    }

    /**
     * Remove a header from the request UI.
     * @param header The header key to remove from the request UI.
     */
    public removeHeader(header: IGraphRequestHeader) {
        const idx = this.explorerValues.headers.indexOf(header);

        if (idx !== -1) {
            this.explorerValues.headers.splice(idx, 1);
        } else {
            throw new Error('Can\'t remove header');
        }
    }

    public createNewHeaderField() {
        if (this.getLastHeader().name !== '') {
            this.addEmptyHeader();
        }
    }
}
