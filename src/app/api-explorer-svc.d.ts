import { Http, Response, Headers } from '@angular/http';
import { RequestType } from "./base";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
export declare class GraphService {
    private http;
    constructor(http: Http);
    performAnonymousQuery: (queryType: RequestType) => (query: string, requestHeaders?: any) => Promise<Response>;
    performQuery: (queryType: RequestType) => (query: string, postBody?: any, requestHeaders?: Headers) => Observable<Response> | Promise<Response>;
    getMetadata: (version: string) => Promise<Response>;
}
