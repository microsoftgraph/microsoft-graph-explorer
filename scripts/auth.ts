// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

function initAuth(authUrl) {
	hello.init({
		msft: {
			oauth: {
				version: 2,
				auth: authUrl + '/organizations/oauth2/v2.0/authorize',
				grant: authUrl + '/organizations/oauth2/v2.0/token'
			},
			scope_delim: ' ',

			// Don't even try submitting via form.
			// This means no POST operations in <=IE9
			form: false
		}, msft_admin_consent: {
			oauth: {
				version: 2,
				auth: authUrl + '/common/adminconsent',
				grant: authUrl + '/common/oauth2/v2.0/token'
			},
			scope_delim: ' ',

			// Don't even try submitting via form.
			// This means no POST operations in <=IE9
			form: false
		}, msft_token_refresh: {
			oauth: {
				version: 2,
				auth: authUrl + '/common/oauth2/v2.0/authorize',
				grant: authUrl + '/common/oauth2/v2.0/token'
			},
			scope_delim: ' ',

			// Don't even try submitting via form.
			// This means no POST operations in <=IE9
			form: false
		}
	});
}