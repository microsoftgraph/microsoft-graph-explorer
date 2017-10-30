// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";
import { ScopesDialogComponent } from "./scopes-dialog.component";
import { localLogout } from "./auth";

@Component({
  selector: 'authentication',
  styleUrls: ['./authentication.component.css'],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent extends GraphExplorerComponent {
    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    sanitize(url:string):SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

  // https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
  login() {
      let loginProperties = {
        display: 'page',
        response_type: "token",
        response_mode: "fragment",
        nonce: 'graph_explorer',
        prompt: 'select_account',
        mkt: AppComponent.Options.Language,
        scope: AppComponent.Options.DefaultUserScopes
      }

      hello('msft').login(loginProperties);
  };

  logout() {
    localLogout();
  }

  authInfo = this.explorerValues.authentication;

  getAuthenticationStatus() {
      return this.explorerValues.authentication.status;
  }

  manageScopes() {
    ScopesDialogComponent.showDialog();
  }
}