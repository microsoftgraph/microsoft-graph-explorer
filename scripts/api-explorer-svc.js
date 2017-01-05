// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

angular.module('ApiExplorer')
    .factory('ApiExplorerSvc', ['$http', '$cacheFactory', function ($http, $cacheFactory) {
        return {
            
            text: 'https://graph.microsoft.com/v1.0/me/',
            
            selectedVersion: "v1.0",
            
            selectedOption: "GET",
            
            showJsonEditor: false,
            
            showJsonViewer: true,
            
            cache: $cacheFactory('myCache'),
            
         /*   id: null,*/
            
            entity: "",
            
            entityNameIsAnId: false,
            
            performAnonymousQuery: function (queryType) {
                    return function (query, postString, requestHeaders) {
                         var headersObj = {
                             "Authorization": "Bearer {token:https://graph.microsoft.com/}",
                             "Accept": "application/json"    
                        };

                        if (requestHeaders && requestHeaders["Authorization"]){
                            headersObj["Authorization"] = requestHeaders["Authorization"];
                        }

                        if (requestHeaders && requestHeaders["Accept"]){
                            headersObj["Accept"] = requestHeaders["Accept"];
                        }

                        var request = {
                            url: 'https://proxy.apisandbox.msdn.microsoft.com/svc?url=' + encodeURIComponent(query),
                            method: 'GET',
                            headers: headersObj
                        }

                        if (queryType == "GET_BINARY") {
                            request["responseType"] = "arraybuffer";
                        }

                        if (queryType == "GET_BINARY" || queryType == "GET") {                        
                            return $http(request);
                        }
                    };
            },

            performQuery: function (queryType) {
                return function (query, postString, requestHeaders) {
                    switch(queryType) {
                        case "GET":
                            return $http.get(query, {headers : requestHeaders});
                        case "GET_BINARY":
                            return $http.get(query, {responseType:"arraybuffer"}, {headers : requestHeaders});
                        case "POST":
                            return $http.post(query, postString, {headers : requestHeaders});
                        case "PATCH":
                            return $http.patch(query, postString,{headers : requestHeaders});
                        case "DELETE":
                            return $http.delete(query, {headers : requestHeaders});
                    }
                };
            },
            
            getMetadata: function() {
                return this.performAnonymousQuery("GET")("https://graph.microsoft.com/" + this.selectedVersion + "/$metadata");
            }
        }
    }]);