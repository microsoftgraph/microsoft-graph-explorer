import * as Msal from 'msal';
import { AppComponent } from '../app.component';

const { ClientId } = (window as any);
const config = {
    auth: {
        clientId:  ClientId,
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
        scopes: this.generateUserScopes(),
        prompt:  'select_account',
    };

    try {
        const response = await app.loginPopup(loginRequest);

        localStorage.setItem('status', 'authenticated');
        return response;
    } catch (error) {
        // tslint:disable-next-line
        console.log(error);
    }
}

export async function getTokenSilent(scopes: any = []) {
    const hasScopes = scopes.length > 0;
    let listOfScopes = AppComponent.Options.DefaultUserScopes;
    if (hasScopes) {
        listOfScopes = scopes;
    }
    try {
        const response = await app.acquireTokenSilent({scopes: this.generateUserScopes(listOfScopes)});
        if (response.accessToken) {
            return response;
        }
        return null;
    } catch (error) {
        return  null;
    }
}

export async function getTokenPopup(scopes: string[] = []) {
    const hasScopes = scopes.length > 0;
    let listOfScopes = AppComponent.Options.DefaultUserScopes;
    if (hasScopes) {
        listOfScopes = scopes;
    }
    try {
        const response = await app.acquireTokenPopup({scopes: this.generateUserScopes(listOfScopes)});
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
        const response = await app.acquireTokenPopup({scopes: this.generateUserScopes()});
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

export function generateUserScopes(userScopes = AppComponent.Options.DefaultUserScopes) {
    const graphMode = JSON.parse(localStorage.getItem('GRAPH_MODE'));
    if (graphMode === null) {
      return userScopes;
    }
    const graphUrl = localStorage.getItem('GRAPH_URL');
    const reducedScopes = userScopes.reduce((newScopes, scope) => {
      if (scope === 'openid' || scope === 'profile') {
        return newScopes += scope + ' ';
      }
      return newScopes += graphUrl + '/' + scope + ' ';
    }, '');

    const scopes = reducedScopes.split(' ').filter((scope) => {
        return scope !== '';
    });
    return scopes;
  }
