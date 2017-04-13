// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

// import {apiService} from "./api-explorer-svc"
// import { showRequestHeaders, getRequestBodyEditor, initializeAceEditor } from './api-explorer-jseditor'
import { loc_strings } from "./loc_strings";
import { ExplorerOptions } from "./base";

// export function formatRequestHeaders(headers) {
//     let obj = {};
//     let parts = headers.replace(/^\s+|,\s*$/g, '').split('\n');
    
//     for(let i = 0, len = parts.length; i < len; i++) {
//         let match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/);
//         if(match) {
//             obj[match[1]] = match[2];
//         }
//     }
    
//    return obj; 
// }

// export interface TabConfig {
//     disableRequestBodyEditor: boolean
//     hideContent: boolean
//     selected: number
//     previousSelected?: number
// }

// export let tabConfig:TabConfig = {
//     disableRequestBodyEditor: true,
//     hideContent: true,
//     selected: 0,
// }

// export function showRequestBodyEditor() {
//     // tabConfig.disableRequestBodyEditor = false;
//     // tabConfig.hideContent = false;
//     // showRequestHeaders();
//     $(() => {
//         const editor = getRequestBodyEditor();
//         initializeAceEditor(editor);
//         editor.getSession().setMode("ace/mode/javascript");
//         // setSelectedTab(1);
//     })
// }

// export function initBodyPostEditor() {
//     const editor = getRequestBodyEditor();
//     initializeAceEditor(editor);
//     editor.getSession().setMode("ace/mode/javascript");
// };

// export function handleQueryString(actionValue, versionValue, requestValue) {
//     if(actionValue){
//         apiService.selectedOption = actionValue.toUpperCase();
//         if(apiService.selectedOption === 'POST' || apiService.selectedOption === 'PATCH') {
//             if(hello('msft').getAuthResponse() != null)
//                 showRequestBodyEditor();
//         }
//    }
        
//    if (versionValue) {
//         apiService.selectedVersion = versionValue;
//    }
//    if (requestValue) {
//         apiService.text = GraphExplorerOptions.GraphUrl + "/" + apiService.selectedVersion + "/" + requestValue;
//    }
// }

export function getString(options:ExplorerOptions, label:string) {
    if (label in loc_strings[options.Language])
        return loc_strings[options.Language][label];
    return loc_strings["en-US"][label];
}