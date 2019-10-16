// ------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Injectable } from '@angular/core';
import { Headers, Http, Response, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { acquireNewAccessToken } from './authentication/auth.service';
import { app } from './authentication/msal-user-agent';
import { AllowedGraphDomains, RequestType } from './base';

@Injectable()
export class GraphService {
    public app: any;

    constructor(private http: Http) {
        this.app = app;
    }

    public performAnonymousQuery(queryType: RequestType, query: string, headers?: Headers): Promise<Response> {
        if (!headers) {
            headers = new Headers();
        }
        headers.append('Authorization', 'Bearer {token:https://graph.microsoft.com/}');
        headers.append('GE-Version', 'GraphExplorer/v03');

        if (queryType === 'GET') {
            return this.http
                .get(`https://proxy.apisandbox.msdn.microsoft.com/svc?url=${encodeURIComponent(query)}`, { headers })
                .toPromise();
        } else if (queryType === 'GET_BINARY') {
            return this.http
                .get(`https://proxy.apisandbox.msdn.microsoft.com/svc?url=${encodeURIComponent(query)}`,
                    { headers, responseType: ResponseContentType.ArrayBuffer }).toPromise();
        }
    }

    public performQuery = (queryType: RequestType, query: string, postBody?: any, requestHeaders?: Headers) => {
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
        requestHeaders.append('GE-Version', 'GraphExplorer/v03');

        const queryResult = this.handleRequest(this.app, requestHeaders, query, queryType, postBody);
        return queryResult;
    }

    public getMetadata = (graphUrl: string, version: string) => {
        return this.http.get(`${graphUrl}/${version}/$metadata`).toPromise();
    }

    public handleRequest = async (msalUserAgent, requestHeaders, query, queryType, postBody): Promise<Response> => {
        return acquireNewAccessToken(msalUserAgent).then((response) => {
            requestHeaders.append('Authorization', `Bearer ${response.accessToken}`);
            switch (queryType) {
                case 'GET':
                    return this.http.get(query, { headers: requestHeaders }).toPromise();
                case 'GET_BINARY':
                    return this.http.get(query,
                        { responseType: ResponseContentType.ArrayBuffer, headers: requestHeaders })
                        .toPromise();
                case 'PUT':
                    return this.http.put(query, postBody, { headers: requestHeaders }).toPromise();
                case 'POST':
                    return this.http.post(query, postBody, { headers: requestHeaders }).toPromise();
                case 'PATCH':
                    return this.http.patch(query, postBody, { headers: requestHeaders }).toPromise();
                case 'DELETE':
                    return this.http.delete(query, { headers: requestHeaders }).toPromise();
            }
        });
    };

}
