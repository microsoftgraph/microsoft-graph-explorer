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

declare const hello: any;

export function initAuth(options:ExplorerOptions, apiService:GraphService, changeDetectorRef: ChangeDetectorRef) {
	setInterval(refreshAccessToken, 1000 * 60 * 10); // refresh access token every 10 minutes
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
		}
	});

	hello.init({
			msft: options.ClientId,
			msft_admin_consent: options.ClientId
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
			}).catch((e) => {
				// occurs when hello got an access token, but it's already expired
				localLogout();				
			});

			// set which permissions are checked

			let scopes = getScopes();
			scopes.push("openid")
			for (let scope of PermissionScopes) {
				scope.enabled = scope.enabledTarget = scopes.indexOf(scope.name.toLowerCase()) != -1
			}
		}
	});
	AppComponent.explorerValues.authentication.status = haveValidAccessToken() ? "authenticating" : "anonymous"


	handleAdminConsentResponse();
}

export function refreshAccessToken() {
	if (AppComponent.explorerValues.authentication.status != "authenticated") {
		console.log("Not refreshing access token since user is logged out or currently logging in.");
		return;
	};

	let loginProperties = {
		display: 'none',
		response_type: "id_token token",
		response_mode: "fragment",
		nonce: 'graph_explorer',
		prompt: 'none',
		scope: AppComponent.Options.DefaultUserScopes, // should be currently selected scopes?
		login_hint: AppComponent.explorerValues.authentication.user.emailAddress,
		domain_hint: 'organizations'
	}

	hello('msft').login(loginProperties).then((a) => {
		console.log("Successfully refreshed access token.")
	}, (a) => {
		console.error("Error refreshing access token", a);
	});
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

				AppComponent.setMessage({
					body: error,
					title: "Admin consent error"
				});

			} else {
				AppComponent.setMessage(successMsg);
			}
		} else {
			AppComponent.setMessage(successMsg);
		}
	}
}

// warning - doesn't include 'openid' scope

// After authentication redirect back to explorer, the obtained scopes need to be parsed
// Issue - Depending on conditions (account type, initial or incremental consent), the 
// scopes might have different delimiters - " ", "+", ","
export function getScopes() {
	let scopesStr = hello('msft').getAuthResponse().scope;

	// scopesStr is something like "Files.Read,Mail.Send,User.Read"
	if (!scopesStr) return;

	scopesStr = scopesStr.toLowerCase();

	if (scopesStr.indexOf("+") != -1)
		return scopesStr.split("+");
	if (scopesStr.indexOf(",") != -1)
		return scopesStr.split(",");
	if (scopesStr.split(" ").length > 2)
		return scopesStr.split(" ");
}

export function haveValidAccessToken():boolean {
	let session = hello('msft').getAuthResponse();

	if (session === null) return false;
	let currentTime = (new Date()).getTime() / 1000;
	return session && session.access_token && session.expires > currentTime;
};


export function localLogout() {
	// anonymous users can only GET
	AppComponent.explorerValues.selectedOption = "GET";

	(hello as any)('msft').logout(null, {force:true});
	AppComponent.explorerValues.authentication.status = "anonymous"
	delete AppComponent.explorerValues.authentication.user;
}