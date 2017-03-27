"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initAuth(options) {
    hello.init({
        msft: {
            oauth: {
                version: 2,
                auth: options.AuthUrl + '/organizations/oauth2/v2.0/authorize',
                grant: options.AuthUrl + '/organizations/oauth2/v2.0/token'
            },
            scope_delim: ' ',
            form: false
        }, msft_admin_consent: {
            oauth: {
                version: 2,
                auth: options.AuthUrl + '/common/adminconsent',
                grant: options.AuthUrl + '/common/oauth2/v2.0/token'
            },
            scope_delim: ' ',
            form: false
        }, msft_token_refresh: {
            oauth: {
                version: 2,
                auth: options.AuthUrl + '/common/oauth2/v2.0/authorize',
                grant: options.AuthUrl + '/common/oauth2/v2.0/token'
            },
            scope_delim: ' ',
            form: false
        }
    });
    hello.init({
        msft: options.ClientId
    }, {
        scope: options.UserScopes,
        redirect_uri: window.location.pathname
    });
    hello.init({
        msft_admin_consent: options.ClientId,
        msft_token_refresh: options.ClientId,
    }, {
        redirect_uri: window.location.pathname
    });
}
exports.initAuth = initAuth;
function isAuthenticated() {
    var session = hello('msft').getAuthResponse();
    if (session === null)
        return false;
    var currentTime = (new Date()).getTime() / 1000;
    return session && session.access_token && session.expires > currentTime;
}
exports.isAuthenticated = isAuthenticated;
;
//# sourceMappingURL=auth.js.map