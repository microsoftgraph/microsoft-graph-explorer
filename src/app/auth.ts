// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppModule } from "./app.module";
import { ExplorerOptions } from "./base";

declare const hello: any;

export function initAuth(options:ExplorerOptions) {
	hello.init({
		msft: {
			oauth: {
				version: 2,
				auth: options.AuthUrl + '/organizations/oauth2/v2.0/authorize',
				grant: options.AuthUrl + '/organizations/oauth2/v2.0/token'
			},
			scope_delim: ' ',

			// Don't even try submitting via form.
			// This means no POST operations in <=IE9
			form: false
		}, msft_admin_consent: {
			oauth: {
				version: 2,
				auth: options.AuthUrl + '/common/adminconsent',
				grant: options.AuthUrl + '/common/oauth2/v2.0/token'
			},
			scope_delim: ' ',

			// Don't even try submitting via form.
			// This means no POST operations in <=IE9
			form: false
		}, msft_token_refresh: {
			oauth: {
				version: 2,
				auth: options.AuthUrl + '/common/oauth2/v2.0/authorize',
				grant: options.AuthUrl + '/common/oauth2/v2.0/token'
			},
			scope_delim: ' ',

			// Don't even try submitting via form.
			// This means no POST operations in <=IE9
			form: false
		}
	});

	hello.init({
			msft: options.ClientId
	}, {
			scope: options.UserScopes,
			redirect_uri: window.location.pathname //required to remove extra url params that make URLs not match
	});

	hello.init({
			msft_admin_consent: options.ClientId,
			msft_token_refresh: options.ClientId,
	}, {
			redirect_uri: window.location.pathname
	});

}

export function isAuthenticated():boolean {
	var session = hello('msft').getAuthResponse();

	if (session === null) return false;
	var currentTime = (new Date()).getTime() / 1000;
	return session && session.access_token && session.expires > currentTime;
};