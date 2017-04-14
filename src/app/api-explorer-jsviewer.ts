// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { commonAceSetup, getJsonViewer, getAceEditorFromElId } from "./api-explorer-jseditor"

export function initializeJsonViewer() {

    let jsonViewer = getJsonViewer();
    commonAceSetup(jsonViewer);
    jsonViewer.getSession().setMode("ace/mode/javascript");
    
    jsonViewer.setOptions({
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false,
    });

    jsonViewer.getSession().setUseWorker(false);
    jsonViewer.renderer.$cursorLayer.element.style.opacity = 0;

}

export function initializeResponseHeadersViewer() {
    let jsonViewer = getAceEditorFromElId("response-header-viewer");
    commonAceSetup(jsonViewer);
    
    jsonViewer.setOptions({
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false,
    });

    jsonViewer.getSession().setUseWorker(false);
    jsonViewer.renderer.$cursorLayer.element.style.opacity = 0;

}