// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

declare let monaco: any;

export function initializeEditor() {
    const headersViewer = monaco.Uri.parse(`a://b/response-header-viewer.json`);
    const bodyEditor = monaco.Uri.parse(`a://b/body-editor.json`);
    const resultsViewer = monaco.Uri.parse(`a://b/results-viewer.json`);

    const headersModel = monaco.editor.createModel('', 'plain_text', headersViewer);
    const bodyModel = monaco.editor.createModel('', 'json', bodyEditor);
    const resultsModel = monaco.editor.createModel('', 'json', resultsViewer);

    (window as any).headersViewer = monaco.editor.create(document.getElementById('response-header-viewer'), {
        model: headersModel,
        minimap: {
            enabled: false,
        },
    });

    (window as any).bodyEditor = monaco.editor.create(document.getElementById('body-editor'), {
        model: bodyModel,
        minimap: {
            enabled: false,
        },
    });

    (window as any).resultsViewer = monaco.editor.create(document.getElementById('results-viewer'), {
        minimap: {
            enabled: false,
        },
        model: resultsModel,
    });
}
