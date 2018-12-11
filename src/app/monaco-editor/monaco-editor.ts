// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

declare let monaco: any;

export function getRequestBodyEditor() {
    return getEditorFromElementId('monaco-container-edit');
}

export function getJsonViewer() {
    return getEditorFromElementId('monaco-container-view');
}

export function getEditorFromElementId(id) {

    const editorOptions = {
        model: {},
    };
    let editor = null;
    const monacoContainer = monaco.Uri.parse(`a://b/${id}.json`);

    if (!monaco.editor.getModel(monacoContainer)) {
        const model = monaco.editor.createModel('', 'javascript', monacoContainer);
        editorOptions.model = model;
    } else {
        editorOptions.model = monaco.editor.getModel(monacoContainer);
    }
    editor = monaco.editor.create(document.getElementById(id), {
        model: editorOptions.model,
    });
    return editor;
}
/**
 * Initialize the text editor.
 * @param editor The Editor component
 * @param ariaLabel The aria-label attribute to add to the textarea of the Editor.
 * @param text Default text to add to editor.
 */
export function initializeEditor(edit, ariaLabel: string, text?: string) {
    // tslint:disable-next-line:no-console
    console.log(edit);
}

/**
 * Standard monaco editor setup
 * @param editor The Editor component
 */
export function commonSetup(editor) {
    editor.setShowPrintMargin(false);
    editor.$blockScrolling = Infinity;
    editor.renderer.setOption('showLineNumbers', false);

    // Accessibility - keyboard dependant users must be able to "tab out" of session
    editor.commands.bindKey('Tab', null);
    editor.commands.bindKey('Shift-Tab', null);
}
