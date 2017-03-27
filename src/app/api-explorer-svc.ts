// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Injectable }              from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';

import { RequestType } from "./base";
import { AppComponent } from "./app.component";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GraphService {

  constructor (private http: Http) { }

    
  performAnonymousQuery = (queryType:RequestType) => {
        let _http = this.http;
        return function (query:string, requestHeaders?:any) {
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
                return _http.get(query).toPromise();
            }
        };
    }

    performQuery = (queryType:RequestType) => {
        let _http = this.http;
        return (query:string, postBody?:any, requestHeaders?:Headers) => {
            switch(queryType) {
                case "GET":
                    return _http.get(query, {headers : requestHeaders}).toPromise();
                case "GET_BINARY":
                    return _http.get(query, {responseType:ResponseContentType.ArrayBuffer, headers : requestHeaders}).toPromise();
                case "POST":
                    return _http.post(query, postBody, {headers : requestHeaders});
                case "PATCH":
                    return _http.patch(query, postBody, {headers : requestHeaders});
                case "DELETE":
                    return _http.delete(query, {headers : requestHeaders});
            }
        };
    }

    getMetadata = (version:string) => {
        return this.performAnonymousQuery("GET")(`${AppComponent.options.GraphUrl}/${version}/$metadata`);
    }
};