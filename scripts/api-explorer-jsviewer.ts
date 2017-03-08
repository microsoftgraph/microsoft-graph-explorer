// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------
declare let define:any;

import {commonAceSetup, getJsonViewer} from "./api-explorer-jseditor"

export function initializeJsonViewer() {
    $(document).ready(() => {
        let jsonViewer = getJsonViewer();
        commonAceSetup(jsonViewer);
        jsonViewer.getSession().setMode("ace/mode/javascript");
        
        
        jsonViewer.setOptions({
            readOnly: true,
            highlightActiveLine: false,
            highlightGutterLine: false,
        });
   });
}