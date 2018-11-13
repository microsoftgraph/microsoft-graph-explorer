import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { AppComponent } from '../app.component';

declare let Msal: any;

@Injectable()
export class AuthService {

    private app: any;

    constructor() {
        this.app = new Msal.UserAgentApplication((window as any).ClientId, '',
            {});
    }

    public async login() {
        return this.app.loginPopup(this.defaultUserScopes())
            .then(async () => {
                return this.getToken();
            }, () => {
                return false;
            });
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
            }, () => {
                return this.app.acquireTokenPopup(listOfScopes)
                    .then((accessToken) => {
                        return accessToken;
                    }, () => {
                        return null;
                    });
            });
    }

    public getNewToken(listOfScopes) {
        return this.app.acquireTokenPopup(listOfScopes)
            .then((accessToken) => {
                return accessToken;
            }, () => {
                return null;
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
