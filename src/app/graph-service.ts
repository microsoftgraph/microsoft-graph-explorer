// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';

import { RequestType, AllowedGraphDomains } from "./base";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GraphService {
  constructor (private http: Http) { }

  performAnonymousQuery(queryType:RequestType, query:string, headers?:Headers):Promise<Response> {
        if (!headers) {
            headers = new Headers();
        }
        headers.append("Authorization", "Bearer {token:https://graph.microsoft.com/}");

        if (queryType === "GET") {
            return this.http.get(`https://proxy.apisandbox.msdn.microsoft.com/svc?url=${encodeURIComponent(query)}`, {headers}).toPromise();
        } else if (queryType === "GET_BINARY") {
            return this.http.get(`https://proxy.apisandbox.msdn.microsoft.com/svc?url=${encodeURIComponent(query)}`, {headers, responseType: ResponseContentType.ArrayBuffer}).toPromise();
        }
    }
        // let method = isAuthenticated() ? this.GraphService.performQuery : this.GraphService.performAnonymousQuery;

    performQuery = (queryType:RequestType, query:string, postBody?:any, requestHeaders?:Headers) => {
        // make sure the request is being sent to the Graph and not another domain
        let sentToGraph = false;

        for (let domain of AllowedGraphDomains) {
            if (query.startsWith(domain)) {
                sentToGraph = true;
                break;
            }
        }

        if (!sentToGraph) {
            throw "Not sending request to known Graph deployment";
        }

        if (typeof requestHeaders === "undefined") {
            requestHeaders = new Headers();
        }

        requestHeaders.append("Authorization", `Bearer ${hello.getAuthResponse('msft').access_token}`)

        switch(queryType) {
            case "GET":
                return this.http.get(query, {headers: requestHeaders}).toPromise();
            case "GET_BINARY":
                return this.http.get(query, {responseType: ResponseContentType.ArrayBuffer, headers : requestHeaders}).toPromise();
            case "PUT":
                return this.http.put(query, postBody, {headers : requestHeaders}).toPromise();
            case "POST":
                return this.http.post(query, postBody, {headers : requestHeaders}).toPromise();
            case "PATCH":
                return this.http.patch(query, postBody, {headers : requestHeaders}).toPromise();
            case "DELETE":
                return this.http.delete(query, {headers : requestHeaders}).toPromise();
        }
    }

    getMetadata = (graphUrl:string, version:string) => {
        return this.http.get(`${graphUrl}/${version}/$metadata`).toPromise();
    }
};