// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from '../app.component';

export async function haveValidAccessToken(authService) {
  const token = await authService.getTokenSilent();
  if (token) {
    return true;
  }
  return false;
}

export function localLogout() {
  // Anonymous users can only GET
  AppComponent.explorerValues.selectedOption = 'GET';
  AppComponent.explorerValues.authentication.user = {};
  localStorage.setItem('status', 'anonymous');
}

export function checkHasValidAuthToken(authService) {
  if (!haveValidAccessToken(authService) && isAuthenticated()) {
    localLogout();
  }
}

export function isAuthenticated() {
  const status = localStorage.getItem('status');
  if (status && status !== 'anonymous') {
    return true;
  }
  localStorage.setItem('status', 'anonymous');
  return false;
}
