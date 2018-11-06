import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { AppComponent } from '../app.component';

declare let Msal: any;

@Injectable()
export class AuthService {

    private app: any;

    constructor() {
        this.app = new Msal.UserAgentApplication((window as any).ClientId, '', this.authCallback,
            this.acquireTokenRedirectCallBack, {});
    }

    public authCallback = (errorDesc, token, error) => {
        if (token) {
            localStorage.setItem('status', 'authenticated');
            this.getToken();
        } else if (errorDesc || error) {
            localStorage.setItem('status', 'anonymous');
        }
    }

    public acquireTokenRedirectCallBack = (errorDesc, token, error, tokenType) => {
        if (tokenType === 'access_token') {
            return token;
        }
    }

    public login() {
        return this.app.loginRedirect(this.defaultUserScopes());
    }

    public logout() {
        this.app.logout();
    }

    public getToken(scopes: any = []) {
        const hasScopes = scopes.length > 0;
        let listOfScopes = this.defaultUserScopes();
        if (hasScopes) {
            listOfScopes = scopes;
        }
        return this.app.acquireTokenSilent(listOfScopes)
            .then((accessToken) => {
                return accessToken;
            }, (error) => {
                return this.app.acquireTokenRedirect(listOfScopes);
            });
    }

    public defaultUserScopes() {
        return AppComponent.Options.DefaultUserScopes;
    }

    public async getScopes() {
        const accessToken = await this.getToken();
        const jwtToken = JWT(accessToken);
        let scopesStr = jwtToken.scp;

        // ScopesStr is something like "Files.Read,Mail.Send,User.Read"
        if (!scopesStr) {
            return;
        }

        scopesStr = scopesStr.toLowerCase();
        if (scopesStr.indexOf('+') !== -1) {
            return scopesStr.split('+');
        } else if (scopesStr.indexOf(',') !== -1) {
            return scopesStr.split(',');
        } else if (scopesStr.split(' ').length > 2) {
            return scopesStr.split(' ');
        }
    }
}
