function initializeJsonEditor($scope, bodyVal) {
    
    $(document).ready(function() {
        var jsonViewerElement = document.getElementById("jsonEditor");
        jsonEditor = ace.edit(jsonViewerElement);
        jsonEditor.getSession().setMode("ace/mode/javascript");
        jsonEditor.setShowPrintMargin(false);
        if(bodyVal){
            jsonEditor.getSession().insert(0, bodyVal);
        }else{
            jsonEditor.getSession().insert(0, " ");
        }
       /* jsonEditor.moveCursorTo(1,0);*/
        jsonEditor.renderer.setOption('showLineNumbers', false);
        //accessibility - keyboard dependant users must be able to "tab out" of session
        jsonEditor.commands.bindKey("Tab", null);
        $scope.jsonEditor = jsonEditor;
    });
}

function initializeJsonEditorHeaders($scope, headersVal) {
     
    $(document).ready(function() {
        var jsonViewerElement = document.getElementById("jsonEditorHeaders");
        jsonEditorHeaders = ace.edit(jsonViewerElement);
        jsonEditorHeaders.setShowPrintMargin(false);
        //accessibility - keyboard dependant users must be able to "tab out" of session
        if(headersVal){
            jsonEditorHeaders.getSession().insert(0, headersVal);
        }else{
            jsonEditorHeaders.getSession().insert(0, " ");
        }
        jsonEditorHeaders.renderer.setOption('showLineNumbers', false);
        jsonEditorHeaders.moveCursorTo(1,0);
        jsonEditorHeaders.commands.bindKey("Tab", null);
        $scope.jsonEditorHeaders = jsonEditorHeaders;
    });
}