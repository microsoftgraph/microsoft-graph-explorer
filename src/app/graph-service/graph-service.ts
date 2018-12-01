// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Injectable } from '@angular/core';
import { Headers, Response, ResponseContentType } from '@angular/http';

import { AllowedGraphDomains, RequestType } from '../base';
import { GraphRequestInterceptor } from './graph-request-interceptor';

@Injectable()
export class GraphService {
  constructor(private http: GraphRequestInterceptor) { }

  public performAnonymousQuery(requestType: RequestType, query: string, headers?: Headers): Promise<Response> {
        if (!headers) {
            headers = new Headers();
        }
        headers.append('Authorization', 'Bearer {token:https://graph.microsoft.com/}');

        if (requestType === 'GET') {
            return this.http.get(`https://proxy.apisandbox.msdn.microsoft.com/svc?url=${encodeURIComponent(query)}`,
              { headers }).toPromise();
        } else if (requestType === 'GET_BINARY') {
            return this.http.get(`https://proxy.apisandbox.msdn.microsoft.com/svc?url=${encodeURIComponent(query)}`,
              { headers, responseType: ResponseContentType.Json }).toPromise();
        }
    }

  public performQuery(requestType: RequestType, query: string, postBody?: any,
                      requestHeaders?: Headers): Promise<Response> {
        // Make sure the request is being sent to the Graph and not another domain
        let sentToGraph = false;

        for (const domain of AllowedGraphDomains) {
            if (query.startsWith(domain)) {
                sentToGraph = true;
                break;
            }
        }

        if (!sentToGraph) {
            throw new Error('Not sending request to known Graph deployment');
        }

        if (typeof requestHeaders === 'undefined') {
            requestHeaders = new Headers();
        }

        requestHeaders.append('Authorization', `Bearer ${hello.getAuthResponse('msft').access_token}`);

        switch (requestType) {
            case 'GET':
                return this.http.get(query, { headers: requestHeaders }).toPromise();
            case 'GET_BINARY':
                return this.http.get(query,
                  {responseType: ResponseContentType.ArrayBuffer, headers : requestHeaders}).toPromise();
            case 'PUT':
                return this.http.put(query, postBody, { headers : requestHeaders }).toPromise();
            case 'POST':
                return this.http.post(query, postBody, { headers : requestHeaders }).toPromise();
            case 'PATCH':
                return this.http.patch(query, postBody, { headers : requestHeaders }).toPromise();
            case 'DELETE':
                return this.http.delete(query, { headers : requestHeaders }).toPromise();
        }
    }

  public getMetadata = (graphUrl: string, version: string) => {
        return this.http.get(`${graphUrl}/${version}/$metadata`).toPromise();
    }
}
