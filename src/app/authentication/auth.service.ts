import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';

declare const Msal: any;

@Injectable()
export class AuthService {

    private app: any;

    constructor() {
        const { ClientId } = (window as any);
        const config = {
            auth: {
                clientId:  ClientId,
                redirectUri: 'http://localhost:3000',
            },
            cache: {
                cacheLocation: 'localStorage',
                storeAuthStateInCookie: true,
            },
        };
        this.app = new Msal.UserAgentApplication(config);
    }

    public async login() {
        const loginRequest = {
            scopes: this.defaultUserScopes(),
            prompt:  'select_account',
        };

        const accessTokenRequest = {
            scopes: this.defaultUserScopes(),
        };

        try {
            await this.app.loginPopup(loginRequest);
            try {
                const response = await this.app.acquireTokenSilent(accessTokenRequest);
                return response.accessToken;
            } catch (error) {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    public async getTokenSilent(scopes: any = []) {
        const hasScopes = scopes.length > 0;
        let listOfScopes = this.defaultUserScopes();
        if (hasScopes) {
            listOfScopes = scopes;
        }
        try {
            const response = await this.app.acquireTokenSilent({scopes: listOfScopes});
            if (response.accessToken) {
                return response;
            }
            return null;
        } catch (error) {
            return  null;
        }
    }

    public async getTokenPopup(scopes: any = []) {
        const hasScopes = scopes.length > 0;
        let listOfScopes = this.defaultUserScopes();
        if (hasScopes) {
            listOfScopes = scopes;
        }
        try {
            const accessToken = await this.app.acquireTokenPopup(listOfScopes);
            if (accessToken) {
                return accessToken;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    public defaultUserScopes() {
        return AppComponent.Options.DefaultUserScopes;
    }

    public async getScopes() {
        const response = await this.getTokenSilent();
        if (response.scopes) {
            const scopesLowerCase = response.scopes.map((item) => {
                return item.toLowerCase();
            });
            return scopesLowerCase;
        }
        return [];
    }
}
