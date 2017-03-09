// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';
import {GraphExplorerOptions} from './api-explorer-directive'
import {apiService} from "./api-explorer-svc"
import {showRequestHeaders, getRequestBodyEditor, initializeAceEditor} from './api-explorer-jseditor'


declare const hello;

export function formatRequestHeaders(headers) {
    let obj = {};
    let parts = headers.replace(/^\s+|,\s*$/g, '').split('\n');
    
    for(let i = 0, len = parts.length; i < len; i++) {
        let match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/);
        if(match) {
            obj[match[1]] = match[2];
        }
    }
    
   return obj; 
}

export interface TabConfig {
    disableRequestBodyEditor: boolean
    hideContent: boolean
    selected: number
    previousSelected?: number
}

export let tabConfig:TabConfig = {
    disableRequestBodyEditor: true,
    hideContent: true,
    selected: 0,
}

export function showRequestBodyEditor() {
    // tabConfig.disableRequestBodyEditor = false;
    // tabConfig.hideContent = false;
    // showRequestHeaders();
    $(() => {
        const editor = getRequestBodyEditor();
        initializeAceEditor(editor);
        editor.getSession().setMode("ace/mode/javascript");
        // setSelectedTab(1);
    })
}

export function initBodyPostEditor() {
    const editor = getRequestBodyEditor();
    initializeAceEditor(editor);
    editor.getSession().setMode("ace/mode/javascript");
};

// export function setSelectedTab (num) {
//     if (num >= 2 || num < 0) {
//         return;
//     }
//     tabConfig.selected = num;
//     tabConfig.previousSelected = tabConfig.selected;
// }

export function handleQueryString(actionValue, versionValue, requestValue) {
    if(actionValue){
        apiService.selectedOption = actionValue.toUpperCase();
        if(apiService.selectedOption === 'POST' || apiService.selectedOption === 'PATCH') {
            if(hello('msft').getAuthResponse() != null)
                showRequestBodyEditor();
        }
   }
        
   if (versionValue) {
        apiService.selectedVersion = versionValue;
   }
   if (requestValue) {
        apiService.text = GraphExplorerOptions.GraphUrl + "/" + apiService.selectedVersion + "/" + requestValue;
   }
}