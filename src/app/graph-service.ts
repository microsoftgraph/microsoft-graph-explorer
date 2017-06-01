// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';

import { RequestType, AllowedGraphDomains } from "./base";
import { AppComponent } from "./app.component";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GraphService {
  static _http:Http;

  constructor (private http: Http) {
      GraphService._http = http;
  }

  performAnonymousQuery(queryType:RequestType, query:string, headers?:Headers):Promise<Response> {
        if (!headers) headers = new Headers();
        headers.append("Authorization", "Bearer {token:https://graph.microsoft.com/}");

        if (queryType == "GET") {
            return GraphService._http.get(`https://proxy.apisandbox.msdn.microsoft.com//svc?url=${encodeURIComponent(query)}`, {headers}).toPromise();
        } else if (queryType == "GET_BINARY") {
            return GraphService._http.get(`https://proxy.apisandbox.msdn.microsoft.com//svc?url=${encodeURIComponent(query)}`, {headers, responseType: ResponseContentType.ArrayBuffer}).toPromise();
        }
    }

    performQuery = (queryType:RequestType, query:string, postBody?:any, requestHeaders?:Headers) => {
        // make sure the request is being sent to the Graph and not another domain
        let sentToGraph = false;

        for (let domain of AllowedGraphDomains) {
            if (query.indexOf(domain) != -1) {
                sentToGraph = true;
                break;
            }
        }

        if (!sentToGraph) {
            throw "Not sending request to known Graph deployment";
        }

        if (typeof requestHeaders == "undefined") {
            requestHeaders = new Headers();
        }

        requestHeaders.append("Authorization", `Bearer ${hello.getAuthResponse('msft').access_token}`)

        switch(queryType) {
            case "GET":
                return GraphService._http.get(query, {headers: requestHeaders}).toPromise();
            case "GET_BINARY":
                return GraphService._http.get(query, {responseType: ResponseContentType.ArrayBuffer, headers : requestHeaders}).toPromise();
            case "PUT":
                return GraphService._http.put(query, postBody, {headers : requestHeaders}).toPromise();
            case "POST":
                return GraphService._http.post(query, postBody, {headers : requestHeaders}).toPromise();
            case "PATCH":
                return GraphService._http.patch(query, postBody, {headers : requestHeaders}).toPromise();
            case "DELETE":
                return GraphService._http.delete(query, {headers : requestHeaders}).toPromise();
        }
    }

    getMetadata = (graphUrl:string, version:string) => {
        return GraphService._http.get(`${graphUrl}/${version}/$metadata`).toPromise();
    }
};