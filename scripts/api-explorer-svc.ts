// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

import { GraphExplorerOptions } from './api-explorer-directive'
import { runInTestMode } from './base'

import * as fetch from "isomorphic-fetch"

export type RequestType = "GET" | "POST" | "GET_BINARY" | "POST" | "PATCH" | "DELETE";

export namespace apiService {

    export let $http, text:string;

    export function init(http) {
        apiService.$http = http;
        text = GraphExplorerOptions.GraphUrl + '/v1.0/me/';
    }

    export let selectedVersion = "v1.0";

    export let selectedOption:RequestType = "GET";

    
    export let performAnonymousQuery = function (queryType:RequestType) {
        return function (query, postString?, requestHeaders?) {
            let headersObj = {
                "Authorization": "Bearer {token:https://graph.microsoft.com/}",
                "Accept": "application/json"
            };

            if (requestHeaders && requestHeaders["Authorization"]){
                headersObj["Authorization"] = requestHeaders["Authorization"];
            }

            if (requestHeaders && requestHeaders["Accept"]){
                headersObj["Accept"] = requestHeaders["Accept"];
            }

            let request = {
                url: 'https://proxy.apisandbox.msdn.microsoft.com/svc?url=' + encodeURIComponent(query),
                method: 'GET',
                headers: headersObj
            }

            if (queryType == "GET_BINARY") {
                request["responseType"] = "arraybuffer";
            }

            if (queryType == "GET_BINARY" || queryType == "GET") {
                return apiService.$http(request);
            }
        };
    }

    export function performQuery (queryType:RequestType) {
        return (query, postString?, requestHeaders?) => {
            switch(queryType) {
                case "GET":
                    return apiService.$http.get(query, {headers : requestHeaders});
                case "GET_BINARY":
                    return apiService.$http.get(query, {responseType:"arraybuffer"}, {headers : requestHeaders});
                case "POST":
                    return apiService.$http.post(query, postString, {headers : requestHeaders});
                case "PATCH":
                    return apiService.$http.patch(query, postString, {headers : requestHeaders});
                case "DELETE":
                    return apiService.$http.delete(query, {headers : requestHeaders});
            }
        };
    }

    export function getMetadata(version:string) {
        return performAnonymousQuery("GET")(GraphExplorerOptions.GraphUrl + "/" + version + "/$metadata");
    }
};