// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppModule } from "./app.module";
import { ExplorerOptions, Message } from "./base";
import { AppComponent } from "./app.component";
import { GraphService } from "./api-explorer-svc";
import { ChangeDetectorRef } from "@angular/core";
import { PermissionScopes } from "./scopes";
import { getParameterByName } from "./util";
import { MessageDialogComponent } from "./message-dialog.component";

declare const hello: any;

export function initAuth(options:ExplorerOptions, apiService:GraphService, changeDetectorRef: ChangeDetectorRef) {
	hello.init({
		msft: {
			oauth: {
				version: 2,
				auth: options.AuthUrl + '/common/oauth2/v2.0/authorize',
				grant: options.AuthUrl + '/common/oauth2/v2.0/token'
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
			msft: options.ClientId,
			msft_admin_consent: options.ClientId,
			msft_token_refresh: options.ClientId,
	}, {
			redirect_uri: window.location.pathname //required to remove extra url params that make URLs not match
	});

	hello.on('auth.login', (auth) => {
		let accessToken;

		if (auth.network == "msft") {
			let authResponse = hello('msft').getAuthResponse();

			accessToken = authResponse.access_token;
		}

		if (accessToken) {
			AppComponent.explorerValues.authentication.status = "authenticating"
			changeDetectorRef.detectChanges();

			let promisesGetUserInfo = [];
			AppComponent.explorerValues.authentication.user = {}

			// get displayName and email
			promisesGetUserInfo.push(apiService.performQuery("GET", `${AppComponent.Options.GraphUrl}/v1.0/me`).then((result) => {
				let resultBody = result.json();

				AppComponent.explorerValues.authentication.user.displayName = resultBody.displayName;
				AppComponent.explorerValues.authentication.user.emailAddress = resultBody.mail || resultBody.userPrincipalName;
				AppComponent.explorerValues.authentication.user.preferred_username = resultBody.preferred_username;
			}));

			// get profile image
			promisesGetUserInfo.push(apiService.performQuery('GET_BINARY', `${AppComponent.Options.GraphUrl}/beta/me/photo/$value`).then((result) => {
				let blob = new Blob( [ result.arrayBuffer() ], { type: "image/jpeg" } );
				let imageUrl = window.URL.createObjectURL( blob );
				AppComponent.explorerValues.authentication.user.profileImageUrl = imageUrl;
			}).catch((e) => console.log(e)));

			Promise.all(promisesGetUserInfo).then(() => {
				AppComponent.explorerValues.authentication.status = "authenticated"
				changeDetectorRef.detectChanges();
			});


			// set which permissions are checked

			let scopes = getScopes();
			scopes.push("openid")
			for (let scope of PermissionScopes) {
				scope.enabled = scope.enabledTarget = scopes.indexOf(scope.name.toLowerCase()) != -1
			}
		}
	});
	AppComponent.explorerValues.authentication.status = isAuthenticated() ? "authenticating" : "anonymous"


	handleAdminConsentResponse();
}

function handleAdminConsentResponse() {
	let adminConsentRes = hello('msft_admin_consent').getAuthResponse();

	let successMsg:Message = {
		body: "You have completed the admin consent flow and can now select permission scopes that require administrator consent.  It may take a few minutes before the consent takes effect.",
		title: "Admin consent completed"
	};


	if (getParameterByName("admin_consent")) {
		if (adminConsentRes) {
			let error = adminConsentRes.error_description;
			if (error) {
				// hello('msft_admin_consent').logout()

				MessageDialogComponent.setMessage({
					body: error,
					title: "Admin consent error"
				});

			} else {
				MessageDialogComponent.setMessage(successMsg);
			}
		} else {
			MessageDialogComponent.setMessage(successMsg);
		}
	}
}

// warning - doesn't include 'openid' scope
export function getScopes() {
	let scopesStr = hello('msft').getAuthResponse().scope;
	if (!scopesStr) return;

	scopesStr = scopesStr.toLowerCase();

	if (scopesStr.indexOf("+") != -1) return scopesStr.split("+");
	if (scopesStr.indexOf(",") != -1) return scopesStr.split(",");
}

export function isAuthenticated():boolean {
	let session = hello('msft').getAuthResponse();
	

	if (session === null) return false;
	let currentTime = (new Date()).getTime() / 1000;
	return session && session.access_token && session.expires > currentTime;
};