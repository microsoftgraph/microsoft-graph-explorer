// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { commonAceSetup, getAceEditorFromElId, getJsonViewer } from './api-explorer-jseditor';
import { GraphExplorerComponent } from './GraphExplorerComponent';

/**
 * Gets the localized aria-label for a response viewer textarea.
 * @param ariaLabel The aria-label value to add to a textarea element.
 */
function getTextAreaAriaLabel(ariaLabel: string): string {
    const g = new GraphExplorerComponent();
    return g.getStr(ariaLabel);
}

export function initializeJsonViewer() {

    const jsonViewer = getJsonViewer();
    const name = getTextAreaAriaLabel('Response body');

    jsonViewer.textInput.getElement().setAttribute('name', name);

    commonAceSetup(jsonViewer);
    jsonViewer.getSession().setMode('ace/mode/javascript');

    jsonViewer.setOptions({
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false,
    });

    jsonViewer.getSession().setUseWorker(false);
    jsonViewer.renderer.$cursorLayer.element.style.opacity = 0;

}

export function initializeResponseHeadersViewer() {
    const jsonViewer = getAceEditorFromElId('response-header-viewer');
    const name = getTextAreaAriaLabel('Response headers viewer');

    jsonViewer.textInput.getElement().setAttribute('name', name);

    commonAceSetup(jsonViewer);

    jsonViewer.setOptions({
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false,
    });

    jsonViewer.getSession().setUseWorker(false);
    jsonViewer.renderer.$cursorLayer.element.style.opacity = 0;

}
