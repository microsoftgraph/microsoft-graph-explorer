import * as Msal from 'msal';
import { AppComponent } from '../app.component';

const { ClientId, appInsights } = (window as any);

const loginType = getLoginType();

const loggerCallback = (level: Msal.LogLevel, message: string): void => {
    collectLogs(message);
};

export const collectLogs = (message: string): void => {
    appInsights.trackEvent('MSAL Error', message);
};

const logger = new Msal.Logger(loggerCallback, { level: Msal.LogLevel.Verbose, correlationId: '1234' });

const config = {
    auth: {
        clientId: ClientId,
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
    },
    system: { logger },
};

let app: Msal.UserAgentApplication;

export function getMsalUserAgentApp() {
    if (!app) {
        app = new Msal.UserAgentApplication((config as any));
    }
    return app;
}

export function logout(userAgentApp: Msal.UserAgentApplication) {
    userAgentApp.logout();
}

export async function getTokenSilent(userAgentApp: Msal.UserAgentApplication, scopes: any = []) {
    const hasScopes = (scopes.length > 0);
    let listOfScopes = AppComponent.Options.DefaultUserScopes;
    if (hasScopes) {
        listOfScopes = scopes;
    }
    return app.acquireTokenSilent({ scopes: generateUserScopes(listOfScopes) });
}

export async function login(userAgentApp: Msal.UserAgentApplication) {
    const loginRequest = {
        scopes: generateUserScopes(),
        prompt: 'select_account',
    };

    if (loginType === 'POPUP') {
        try {
            const response = await userAgentApp.loginPopup(loginRequest);
            return response;
        } catch (error) {
            throw error;
        }
    } else if (loginType === 'REDIRECT') {
        await userAgentApp.loginRedirect(loginRequest);
    }
}

export async function acquireNewAccessToken(userAgentApp: Msal.UserAgentApplication, scopes: string[] = []) {
    const hasScopes = (scopes.length > 0);
    let listOfScopes = AppComponent.Options.DefaultUserScopes;
    if (hasScopes) {
        listOfScopes = scopes;
    }
    try {
        const response = getTokenSilent(userAgentApp, { scopes: generateUserScopes(listOfScopes) });
        return response;
    } catch (error) {
        if (requiresInteraction(error.errorCode)) {
            if (loginType === 'POPUP') {
                try {
                    const res = await userAgentApp
                        .acquireTokenPopup({ scopes: generateUserScopes(listOfScopes) });
                    return res;
                } catch (error) {
                    throw error;
                }
            } else if (loginType === 'REDIRECT') {
                userAgentApp.acquireTokenRedirect({ scopes: generateUserScopes(listOfScopes) });
            }
        } else {
            throw error;
        }
    }
}

export function getAccount(userAgentApp: Msal.UserAgentApplication) {
    return userAgentApp.getAccount();
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

function requiresInteraction(errorCode) {
    if (!errorCode || !errorCode.length) {
        return false;
    }
    return errorCode === 'consent_required' ||
        errorCode === 'interaction_required' ||
        errorCode === 'login_required';
}

export function getLoginType() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const msie11 = ua.indexOf('Trident/');
    const msedge = ua.indexOf('Edge/');
    const isIE = msie > 0 || msie11 > 0;
    const isEdge = msedge > 0;
    return isIE || isEdge ? 'REDIRECT' : 'POPUP';
}
