import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable()
export class GraphRequestInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerKeys = req.headers.keys();
        const reqHeaders = [];

        headerKeys.forEach((headerKey) => {
            reqHeaders.push({
                name: headerKey,
                value: req.headers.get(headerKey),
            });
        });

        AppComponent.explorerValues.headers.unshift(...reqHeaders);
        return next.handle(req);
    }
}
