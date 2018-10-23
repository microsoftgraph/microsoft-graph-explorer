// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { AppComponent } from '../app.component';
import { GraphExplorerComponent } from '../GraphExplorerComponent';
import { localLogout } from './auth';

declare let dialogPolyfill;

@Component({
  selector: 'authentication',
  styleUrls: ['./authentication.component.css'],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent extends GraphExplorerComponent {

  public authInfo = this.explorerValues.authentication;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  public sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

    /*
      https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
     */
  public login() {
      const loginProperties = {
        display: 'page',
        response_type: 'token',
        response_mode: 'fragment',
        nonce: 'graph_explorer',
        prompt: 'select_account',
        mkt: AppComponent.Options.Language,
        scope: AppComponent.Options.DefaultUserScopes,
      };

      hello('msft').login(loginProperties);
  }

  public logout() {
    localLogout();
  }

  public getAuthenticationStatus() {
      return this.explorerValues.authentication.status;
  }

  public manageScopes() {
    // ScopesDialogComponent.isDialogOpen = true;
    const dialog =  document.querySelector('#scopes-dialog');
    dialogPolyfill.registerDialog(dialog);
    (dialog as any).showModal();
  }
}
