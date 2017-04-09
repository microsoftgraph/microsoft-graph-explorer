// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppModule } from "./app.module";
import { ExplorerOptions } from "./base";
import { AppComponent } from "./app.component";
import { GraphService } from "./api-explorer-svc";
import { ChangeDetectorRef } from "@angular/core";

declare const hello: any;

export function initAuth(options:ExplorerOptions, apiService:GraphService, changeDetectorRef: ChangeDetectorRef) {
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
			msft: options.ClientId,
			msft_admin_consent: options.ClientId,
			msft_token_refresh: options.ClientId,
	}, {
			redirect_uri: window.location.pathname //required to remove extra url params that make URLs not match
	});

	hello.on('auth.login', (auth) => {
		let accessToken;

		if (auth.network == "msft_token_refresh") {
			accessToken = hello('msft_token_refresh').getAuthResponse().access_token;
		} else if (auth.network == "msft") {
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

				AppComponent.explorerValues.authentication.user = {
					displayName: resultBody.displayName,
					emailAddress: resultBody.mail	
				}
			}));

			// get profile image
			promisesGetUserInfo.push(apiService.performQuery('GET_BINARY', `${AppComponent.Options.GraphUrl}/v1.0/me/photo/$value`).then((result) => {
				let blob = new Blob( [ result.arrayBuffer() ], { type: "image/jpeg" } );
				let imageUrl = window.URL.createObjectURL( blob );
				AppComponent.explorerValues.authentication.user.profileImageUrl = imageUrl;
			}).catch((e) => console.log(e)));

			Promise.all(promisesGetUserInfo).then(() => {
				AppComponent.explorerValues.authentication.status = "authenticated"
				changeDetectorRef.detectChanges();
			});
		}
	});
	AppComponent.explorerValues.authentication.status = isAuthenticated() ? "authenticating" : "anonymous"
}

export function isAuthenticated():boolean {
	let session = hello('msft').getAuthResponse();
	

	if (session === null) return false;
	let currentTime = (new Date()).getTime() / 1000;
	return session && session.access_token && session.expires > currentTime;
};