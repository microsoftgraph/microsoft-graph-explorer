import { Logger, LogLevel, UserAgentApplication } from 'msal';
import { AppComponent } from '../app.component';

const { ClientId, appInsights, instrumentationKey } = (window as any);

function loggerCallback(level: LogLevel, message: string) {
    // Track appInsight's events when the instrumentation key is defined
    if (instrumentationKey !== undefined) {
        appInsights.trackEvent('GE-Classic: MSAL', message);
    }
}
const logger = new Logger(loggerCallback, { level: LogLevel.Verbose, correlationId: '1234'});

const config: any = {
    auth: {
        clientId: ClientId,
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
    },
    system: {
        logger,
    },
};
const app = new UserAgentApplication(config);

function acquireTokenRedirectCallBack(response) {
    if (response && response.tokenType === 'access_token') {
        localStorage.setItem('token', response.accessToken);
        return response.accessToken;
    }
}

function acquireTokenErrorRedirectCallBack(error) {
    // tslint:disable-next-line:no-console
    console.log(error);
}

// Register Callbacks for redirect flow
app.handleRedirectCallbacks(acquireTokenRedirectCallBack, acquireTokenErrorRedirectCallBack);

export async function login() {
    const loginRequest = {
        scopes: generateUserScopes(),
        prompt: 'select_account',
    };

    try {
        const response = await app.loginRedirect(loginRequest);
        return response;
    } catch (error) {
        // tslint:disable-next-line
        console.log(error);
    }
}

export function logout() {
    app.logout();
}

export async function getTokenSilent(scopes: any = []) {
    const hasScopes = (scopes.length > 0);
    let listOfScopes = AppComponent.Options.DefaultUserScopes;
    if (hasScopes) {
        listOfScopes = scopes;
    }
    try {
        const response = await app.acquireTokenSilent({ scopes: generateUserScopes(listOfScopes) });
        if (response.accessToken) {
            localStorage.setItem('token', response.accessToken);
            return response;
        }
        return null;
    } catch (error) {
        // tslint:disable-next-line
        console.log(error);
    }
}

export function isAccountExpired() {
    const account = app.getAccount();

    if (account) {
        const { idToken }: any = account;
        return idToken.exp < (Date.now() / 1000);
    }

    return true;
}

export async function getScopes() {
    let scopes = [];
    try {
        const response = await getTokenSilent();
        if (response.scopes) {
            scopes = response.scopes;
        }
    } catch (error) {
        // tslint:disable-next-line
        console.log(error);
        return scopes;
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
