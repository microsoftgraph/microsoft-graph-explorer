import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { AppComponent } from '../app.component';

declare const Msal: any;

@Injectable()
export class AuthService {

    private app: any;

    constructor() {
        const { ClientId } = (window as any);
        this.app = new Msal.UserAgentApplication(ClientId, '', {});
    }

    public async login() {
        return this.app.loginPopup(this.defaultUserScopes())
            .then(async () => {
                return this.getTokenSilent();
            }, () => {
                return false;
            });
    }

    public getTokenSilent(scopes: any = []) {
        const hasScopes = scopes.length > 0;
        let listOfScopes = this.defaultUserScopes();
        if (hasScopes) {
            listOfScopes = scopes;
        }
        return this.app.acquireTokenSilent(listOfScopes)
            .then((accessToken) => {
                return accessToken;
            }, () => {
                return null;
            });
    }

    public getTokenPopup(scopes: any = []) {
        const hasScopes = scopes.length > 0;
        let listOfScopes = this.defaultUserScopes();
        if (hasScopes) {
            listOfScopes = scopes;
        }
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
        /*
        Breaks down the access token to produce the user consented scopes using Jwt decode
        The scopes are fed to the modify permissions dialog in an array
        */
        const accessToken = await this.getTokenSilent();
        const jwtToken = JWT(accessToken);
        let scopesStr = jwtToken.scp;

        // ScopesStr is something like "Files.Read,Mail.Send,User.Read"
        if (!scopesStr) {
            return;
        }

        /*
        the scopes can be separated by '+' / ',' or spaces.
        The dialog requires that they be in an array of strings.
        */
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
