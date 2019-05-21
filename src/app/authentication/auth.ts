// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from '../app.component';
import { deleteHistoryFromLocalStorage } from '../history/history';
import { getTokenSilent } from './auth.service';

export async function haveValidAccessToken() {
  const token = await getTokenSilent();
  if (token) {
    return true;
  }
  return false;
}

export function localLogout() {
  // Anonymous users can only GET
  AppComponent.explorerValues.selectedOption = 'GET';
  AppComponent.explorerValues.authentication.user = {};
  AppComponent.explorerValues.authentication.status = 'anonymous';
  deleteHistoryFromLocalStorage();
  sessionStorage.clear();
}

export async function checkHasValidAuthToken() {
  const valid = await haveValidAccessToken();
  const authenticated = isAuthenticated();
  if (!valid && authenticated) {
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
  getTokenSilent().then(
    (result) => {
      // tslint:disable-next-line:no-console
      console.log(result.accessToken);
    },
    () => {
      // tslint:disable-next-line:no-console
      console.log('Please sign in to get your access token');
    },
  );

};
