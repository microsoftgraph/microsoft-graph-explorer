// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

function initializeJsonEditor(bodyVal?) {
    let editor = getRequestBodyEditor();
    commonSetup(editor);
    editor.getSession().setMode("ace/mode/javascript");
    
    if (bodyVal) {
        editor.getSession().insert({row:0, column:0}, bodyVal);
    } else {
        editor.getSession().insert(0, " ");
    }
}


function initializeHeadersEditor(headersVal) {
    let editor = getHeadersEditor();
    commonSetup(editor);

    if(headersVal) {
        editor.getSession().insert(0, headersVal);
    } else {
        editor.getSession().insert(0, " ");
    }

    editor.moveCursorTo(1,0);
}

// standard ace editor setup and customizations
function commonSetup(editor) {
    editor.setShowPrintMargin(false);
    editor.$blockScrolling = Infinity;
    editor.renderer.setOption('showLineNumbers', false);

    //accessibility - keyboard dependant users must be able to "tab out" of session
    editor.commands.bindKey("Tab", null);
}