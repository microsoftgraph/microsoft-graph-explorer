// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from '../app.component';

/* export function initAuth(options: IExplorerOptions, apiService: GraphService, changeDetectorRef: ChangeDetectorRef) {
  hello.on('auth.login', (auth) => {
    let accessToken;

    if (auth.network === 'msft') {
      const authResponse = hello('msft').getAuthResponse();
      accessToken = authResponse.access_token;
    }

    if (accessToken) {
      const scopes = getScopes();
      scopes.push('openid');
      for (const scope of PermissionScopes) {
        // Scope.consented indicates that the user or admin has previously consented to the scope.
        scope.consented = scopes.indexOf(scope.name.toLowerCase()) !== -1;
      }
    }
  });
}
 */

// After authentication redirect back to explorer, the obtained scopes need to be parsed
// Issue - Depending on conditions (account type, initial or incremental consent), the
// Scopes might have different delimiters - " ", "+", ","
export function getScopes() {
  let scopesStr = hello('msft').getAuthResponse().scope;

  // ScopesStr is something like "Files.Read,Mail.Send,User.Read"
  if (!scopesStr) {
    return;
  }

  scopesStr = scopesStr.toLowerCase();

  if (scopesStr.indexOf('+') !== -1) {
    return scopesStr.split('+');
  } else if (scopesStr.indexOf(',') !== -1) {
    return scopesStr.split(',');
  } else if (scopesStr.split(' ').length > 2) {
    return scopesStr.split(' ');
  }
}

export async function haveValidAccessToken(authService) {
  const token = await authService.getToken();
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
  return false;
}
