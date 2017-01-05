// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

var msGraphLinkResolution = function ($scope, body, args, service) {
    if (args.indexOf("https://") == -1) {
        if (service.text.indexOf(args.substr(1)) != -1) {

        } else if (service.text.indexOf("/me") != -1 && service.text.indexOf("/me/") == -1 && service.text.indexOf("/memberOf") == -1) {
            service.text = service.text.replace("/me", "") + "/users/" + args.substr(1);
        } else {

            // if type exists
            var index = body.indexOf(args.substr(1));
            var typeIndex = body.lastIndexOf('@odata.type', index);
            if (typeIndex != -1) {
                var typeIndexEnd = body.indexOf("\n", typeIndex);
                var type = body.substr(typeIndex, typeIndexEnd - typeIndex);
                type = type.replace("@odata.type\": \"#microsoft.graph.", "");
                type = type.replace("\"", "").replace(",", "");
                service.text = "https://graph.microsoft.com/v1.0/" + type + "s/" + args.substr(1);
            } else {
                if (service.text.indexOf("?") != -1) {
                    service.text = service.text.substr(0, service.text.indexOf("?"));
                }
                service.text = service.text + "/" + args.substr(1);
            }
        }
    } else {
        service.text = args.replace("\"", "");
    }
    //$scope.selectedOptions = 'GET';
    if(service.text && service.text.charAt(service.text.length-1) != '/'){
                service.text += '/';
    }
    $scope.submit(service.text);
}