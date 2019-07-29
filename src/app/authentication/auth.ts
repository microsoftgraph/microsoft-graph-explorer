// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { UserAgentApplication } from 'msal';
import { AppComponent } from '../app.component';
import { deleteHistoryFromLocalStorage } from '../history/history';
import { getAccount, getTokenSilent } from './auth.service';
import { app } from './msal-user-agent';

export function localLogout() {
  // Anonymous users can only GET
  AppComponent.explorerValues.selectedOption = 'GET';
  AppComponent.explorerValues.authentication.user = {};
  AppComponent.explorerValues.authentication.status = 'anonymous';
  deleteHistoryFromLocalStorage();
  sessionStorage.clear();
}

export async function checkHasValidAuthToken(userAgentApp: UserAgentApplication) {
  const hasAccount = await getAccount(userAgentApp);
  const authenticated = isAuthenticated();
  if (!hasAccount && authenticated) {
    localLogout();
  }
}

export function isAuthenticated() {
  const status = AppComponent.explorerValues.authentication.status ;
  if (status && status !== 'anonymous') {
    return true;
  }
  AppComponent.explorerValues.authentication.status = 'anonymous';
  return false;
}

// tslint:disable-next-line:only-arrow-functions
(window as any).tokenPlease = function() {
  const scopes = AppComponent.Options.DefaultUserScopes;

  getTokenSilent(app, scopes).then(
    (result) => {
      // tslint:disable-next-line:no-console
      console.log(result.accessToken);
    },
    (err) => {
      // tslint:disable-next-line:no-console
      console.log('Please sign in to get your access token');
    },
  );
};
