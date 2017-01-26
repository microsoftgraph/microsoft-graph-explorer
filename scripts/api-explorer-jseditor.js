// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

function initializeJsonEditor($scope, bodyVal) {
    var jsonEditor = getRequestBodyEditor();
    jsonEditor.getSession().setMode("ace/mode/javascript");
    jsonEditor.$blockScrolling = Infinity;
    
    jsonEditor.setShowPrintMargin(false);
    if (bodyVal) {
        jsonEditor.getSession().insert({row:0, column:0}, bodyVal);
    } else {
        jsonEditor.getSession().insert(0, " ");
    }

    jsonEditor.renderer.setOption('showLineNumbers', false);
    //accessibility - keyboard dependant users must be able to "tab out" of session
    jsonEditor.commands.bindKey("Tab", null);
    $scope.jsonEditor = jsonEditor;
}

function initializeJsonEditorHeaders($scope, headersVal) {
    var jsonViewerElement = document.getElementById("jsonEditorHeaders");
    if (!jsonViewerElement) {
        console.error('cannot find #jsonEditorHeaders')
        return;
    }
    jsonEditorHeaders = ace.edit(jsonViewerElement);
    jsonEditorHeaders.setShowPrintMargin(false);

    jsonEditorHeaders.$blockScrolling = Infinity;
    //accessibility - keyboard dependant users must be able to "tab out" of session
    if(headersVal) {
        jsonEditorHeaders.getSession().insert(0, headersVal);
    } else {
        jsonEditorHeaders.getSession().insert(0, " ");
    }
    jsonEditorHeaders.renderer.setOption('showLineNumbers', false);
    jsonEditorHeaders.moveCursorTo(1,0);
    jsonEditorHeaders.commands.bindKey("Tab", null);
    $scope.jsonEditorHeaders = jsonEditorHeaders;
}