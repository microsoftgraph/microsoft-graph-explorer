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

    public logout() {
        this.app.logout();
    }

    public async login() {
        const loginRequest = {
            scopes: AppComponent.Options.DefaultUserScopes,
            prompt:  'select_account',
        };

        try {
            const response = await this.app.acquireTokenPopup(loginRequest);
            return response;
        } catch (error) {
            return false;
        }
    }

    public async getTokenSilent(scopes: any = []) {
        const hasScopes = scopes.length > 0;
        let listOfScopes = AppComponent.Options.DefaultUserScopes;
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
        let listOfScopes = AppComponent.Options.DefaultUserScopes;
        if (hasScopes) {
            listOfScopes = scopes;
        }
        try {
            const response = await this.app.acquireTokenPopup({scopes: listOfScopes});
            if (response) {
                return response;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    public async getScopes() {
        let scopes = [];
        try {
            const response = await this.getTokenSilent();
            if (response.scopes) {
                scopes = response.scopes;
            }
        } catch (error) {
            const response = await this.app.acquireTokenPopup({scopes: AppComponent.Options.DefaultUserScopes});
            if (response) {
                scopes = response.scopes;
            }
        }
        if (scopes.length > 0) {
            const scopesLowerCase = scopes.map((item) => {
                return item.toLowerCase();
            });
            return scopesLowerCase;
        }
        return [];
    }
}
