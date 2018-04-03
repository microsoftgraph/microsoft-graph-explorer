// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

declare const ace;

export function getRequestBodyEditor() {
    return getAceEditorFromElId("post-body-editor");
}

export function getJsonViewer() {
    return getAceEditorFromElId("jsonViewer");
}

export function getAceEditorFromElId(id:string) {
    return ace.edit(document.getElementById(id));
}

/**
 * Initialize the text editor.
 * @param editor The AceEditor component
 * @param ariaLabel The aria-label attribute to add to the textarea of the AceEditor.
 * @param text Default text to add to editor.
 */
export function initializeAceEditor(editor, ariaLabel: string, text?: string) {
    commonAceSetup(editor);

    if (text) {
        editor.getSession().insert(0, text);
    }

    editor.moveCursorTo(1, 0);
    editor.textInput.getElement().setAttribute("aria-label", ariaLabel);
}

/**
 * Standard ace editor setup
 * @param editor The AceEditor component
 */ 
export function commonAceSetup(editor) {
    editor.setShowPrintMargin(false);
    editor.$blockScrolling = Infinity;
    editor.renderer.setOption('showLineNumbers', false);

    //accessibility - keyboard dependant users must be able to "tab out" of session
    editor.commands.bindKey("Tab", null);
    editor.commands.bindKey("Shift-Tab", null)
}