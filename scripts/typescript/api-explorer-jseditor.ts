// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------
function getRequestBodyEditor() {
    let requestBodyEditorElement = document.getElementById("jsonEditor");
    return ace.edit(requestBodyEditorElement);
}

function getHeadersEditor() {
    let requestHeaderEditorElement = document.getElementById("jsonEditorHeaders");
    return ace.edit(requestHeaderEditorElement);
}

function getJsonViewer() {
    let jsonViewerElement = document.getElementById("jsonViewer");
    return ace.edit(jsonViewerElement);
}

function initializeJsonEditor(bodyVal?) {
    let editor = getRequestBodyEditor();
    commonAceSetup(editor);
    editor.getSession().setMode("ace/mode/javascript");
    
    if (bodyVal) {
        editor.getSession().insert({row:0, column:0}, bodyVal);
    }
}


function initializeHeadersEditor(headersVal) {
    let editor = getHeadersEditor();
    commonAceSetup(editor);

    if (headersVal) {
        editor.getSession().insert(0, headersVal);
    }

    editor.moveCursorTo(1, 0);
}

// standard ace editor setup and customizations
function commonAceSetup(editor) {
    editor.setShowPrintMargin(false);
    editor.$blockScrolling = Infinity;
    editor.renderer.setOption('showLineNumbers', false);

    //accessibility - keyboard dependant users must be able to "tab out" of session
    editor.commands.bindKey("Tab", null);
}