import {apiService} from "./api-explorer-svc"
import {GraphExplorerOptions} from './api-explorer-directive'

function createShareLink(fullRequestUrl, action, version) {    
    return window.location.origin + window.location.pathname + "?request=" + extractGraphEndpoint(fullRequestUrl) + "&method=" + action + "&version=" + version;
}

function extractGraphEndpoint(fullRequestUrl) {
    let requestUrl = fullRequestUrl.split('.com')
    requestUrl.shift();
    
    var requestUrlComponents = requestUrl[0].split('/');
    requestUrlComponents.shift(); //remove empty item
    requestUrlComponents.shift(); //remove version
    return (requestUrlComponents.join('/'));
}

function isPostOrPatch(option) {
    return  option == "POST" || option == "PATCH";
}

export function ShareDialogController($scope, $mdDialog, $sce, headers, body) {
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    $scope.getShareLink = function() {
        var requestUrl = $scope.getSearchText();
        return createShareLink(requestUrl, apiService.selectedOption, apiService.selectedVersion);
    }

    $scope.generateSuperAgentCode = function() {
        var requestUrl = $scope.getSearchText();

        var fullGraphUrl = GraphExplorerOptions.GraphUrl + apiService.selectedVersion + "/" + extractGraphEndpoint(requestUrl);

        var tab = function() {
            return "<span style='padding-left:15px'></span>";
        }

        var line = function() {
            return "<br>"
        }

        var str = "request";
        str += line() + tab() + "." + apiService.selectedOption.toLocaleLowerCase() + "(\"" + fullGraphUrl + "\")"

        if (Object.keys(headers).length > 0) {
            str += line() + tab() + ".set(" + JSON.stringify(headers) + ")";
        }

        if (isPostOrPatch( apiService.selectedOption)) {
            try {
                var bodyObj = JSON.parse(body);
                if (bodyObj) {
                    str += line() + tab() + ".send(" + JSON.stringify(bodyObj) + ")";
                }
            } catch(e) {

            }
        }
 
        str += line() + tab() + ".end(function(err, res) {"
        str += line() + tab() + tab() + "console.log(res);"
        str += line() + tab() + "});"
        return $sce.trustAsHtml(str);
    }
}