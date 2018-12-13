// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

declare let monaco: any;

export function initializeEditor() {
    const headersViewer = monaco.Uri.parse(`a://b/headers-viewer.json`);
    const bodyEditor = monaco.Uri.parse(`a://b/body-editor.json`);
    const resultsViewer = monaco.Uri.parse(`a://b/results-viewer.json`);

    const headersModel = monaco.editor.createModel('', 'json', headersViewer);
    const bodyModel = monaco.editor.createModel('', 'json', bodyEditor);
    const resultsModel = monaco.editor.createModel('', 'json', resultsViewer);

    window.headersViewer = monaco.editor.create(document.getElementById('headers-viewer'), {
        model: headersModel,
    });

    window.bodyEditor = monaco.editor.create(document.getElementById('body-editor'), {
        model: bodyModel,
    });

    window.resultsViewer = monaco.editor.create(document.getElementById('results-viewer'), {
        model: resultsModel,
    });
}
