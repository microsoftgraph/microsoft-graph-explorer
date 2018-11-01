import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { AppComponent } from '../app.component';

declare let Msal: any;

@Injectable()
export class AuthService {
    private app: any;

    constructor() {
        this.app = new Msal.UserAgentApplication((window as any).ClientId, '', this.authCallback, {});
    }

    public authCallback = (errorDesc, token, error) => {
        if (token) {
            localStorage.setItem('status', 'authenticated');
        } else if (errorDesc || error) {
            localStorage.setItem('status', 'anonymous');
        }
    }

    public async login(scopes: any = []) {
        const hasScopes = scopes.length > 0;
        let listOfScopes = this.defaultUserScopes();
        if (hasScopes) {
            listOfScopes = scopes;
        }
        return this.app.loginRedirect(listOfScopes);
    }

    public logout() {
        this.app.logout();
    }

    public getToken() {
        return this.app.acquireTokenSilent(this.defaultUserScopes())
            .then((accessToken) => {
                return accessToken;
            }, (error) => {
                return this.app.acquireTokenPopup(this.defaultUserScopes())
                    .then((accessToken) => {
                        return accessToken;
                    }, (err) => {
                        localStorage.setItem('status', 'anonymous');
                    });
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
