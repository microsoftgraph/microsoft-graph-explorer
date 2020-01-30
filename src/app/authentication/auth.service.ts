import * as Msal from 'msal';
import { AppComponent } from '../app.component';
import { telemetry } from '../telemetry/telemetry';

const loginType = getLoginType();

export const collectLogs = (error: Error): void => {
    const { appInsights } = (window as any);

    telemetry.trackException(error, 'Critical');
};

export function logout(userAgentApp: Msal.UserAgentApplication) {
    userAgentApp.logout();
}

// tslint:disable-next-line: max-line-length
export async function getTokenSilent(userAgentApp: Msal.UserAgentApplication, scopes: string[]): Promise<Msal.AuthResponse> {
    return userAgentApp.acquireTokenSilent({ scopes: generateUserScopes(scopes) });
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
    return getTokenSilent(userAgentApp, generateUserScopes(listOfScopes)).catch((error) => {
        if (requiresInteraction(error.errorCode)) {
            if (loginType === 'POPUP') {
                try {
                    return userAgentApp.acquireTokenPopup({ scopes: generateUserScopes(listOfScopes) });
                } catch (error) {
                    throw error;
                }
            } else if (loginType === 'REDIRECT') {
                userAgentApp.acquireTokenRedirect({ scopes: generateUserScopes(listOfScopes) });
            }
        }
    });
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

export function requiresInteraction(errorCode) {
    if (!errorCode || !errorCode.length) {
        return false;
    }
    return errorCode === 'consent_required' ||
        errorCode === 'interaction_required' ||
        errorCode === 'login_required' ||
        errorCode === 'token_renewal_error';
}

export function getLoginType() {
    /**
     * Always redirects because of transient issues caused by showing a pop up. Graph Explorer
     * loses hold of the iframe Pop Up
     */
    return 'REDIRECT';
}
