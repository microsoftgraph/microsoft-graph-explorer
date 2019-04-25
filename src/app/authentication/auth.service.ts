import * as Msal from 'msal';
import { AppComponent } from '../app.component';

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

const app = new Msal.UserAgentApplication((config as any));

export function logout() {
    app.logout();
}

export async function login() {
    const loginRequest = {
        scopes: AppComponent.Options.DefaultUserScopes,
        prompt:  'select_account',
    };

    try {
        const response = await app.loginPopup(loginRequest);
        return response;
    } catch (error) {
        return false;
    }
}

export async function getTokenSilent(scopes: any = []) {
    const hasScopes = scopes.length > 0;
    let listOfScopes = AppComponent.Options.DefaultUserScopes;
    if (hasScopes) {
        listOfScopes = scopes;
    }
    try {
        const response = await app.acquireTokenSilent({scopes: listOfScopes});
        if (response.accessToken) {
            return response;
        }
        return null;
    } catch (error) {
        return  null;
    }
}

export async function getTokenPopup(scopes: any = []) {
    const hasScopes = scopes.length > 0;
    let listOfScopes = AppComponent.Options.DefaultUserScopes;
    if (hasScopes) {
        listOfScopes = scopes;
    }
    try {
        const response = await app.acquireTokenPopup({scopes: listOfScopes});
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export async function getScopes() {
    let scopes = [];
    try {
        const response = await this.getTokenSilent();
        if (response.scopes) {
            scopes = response.scopes;
        }
    } catch (error) {
        const response = await app.acquireTokenPopup({scopes: AppComponent.Options.DefaultUserScopes});
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
    return scopes;
}
