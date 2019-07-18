// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthResponse, UserAgentApplication } from 'msal';
import { AppComponent } from '../app.component';
import { GraphService } from '../graph-service';
import { GraphExplorerComponent } from '../GraphExplorerComponent';
import { PermissionScopes } from '../scopes-dialog/scopes';
import { ScopesDialogComponent } from '../scopes-dialog/scopes-dialog.component';
import { getGraphUrl } from '../util';
import { haveValidAccessToken, localLogout } from './auth';
import { acquireNewAccessToken, collectLogs, login, logout } from './auth.service';
import { app } from './msal-user-agent';

@Component({
  selector: 'authentication',
  styleUrls: ['./authentication.component.css'],
  templateUrl: './authentication.component.html',
})

export class AuthenticationComponent extends GraphExplorerComponent {

  public authInfo = this.explorerValues.authentication;

  constructor(private sanitizer: DomSanitizer, private apiService: GraphService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
    this.acquireTokenCallBack = this.acquireTokenCallBack.bind(this);
  }

  public async ngOnInit() {
    // Register Callbacks for redirect flow
    app.handleRedirectCallbacks(this.acquireTokenCallBack, this.acquireTokenErrorCallBack);
    AppComponent.explorerValues.authentication.status = 'authenticating';
    if (app.getAccount()) {
      await acquireNewAccessToken(app)
        .then(this.acquireTokenCallBack)
        .catch(this.acquireTokenErrorCallBack);
    } else {
      AppComponent.explorerValues.authentication.status = 'anonymous';
    }
  }

  public sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public async login() {
    AppComponent.explorerValues.authentication.status = 'authenticating';
    await login(app).then(this.acquireTokenCallBack)
      .catch(this.acquireTokenErrorCallBack);
  }

  public logout() {
    localLogout();
    // Logout();
  }

  public getAuthenticationStatus() {
    return AppComponent.explorerValues.authentication.status;
  }

  public manageScopes() {
    ScopesDialogComponent.showDialog();
  }

  public async setPermissions(response: AuthResponse) {
    const scopes = response.scopes;
    const scopesLowerCase = scopes.map((item) => {
      return item.toLowerCase();
    });
    scopesLowerCase.push('openid');
    for (const scope of PermissionScopes) {
      // Scope.consented indicates that the user or admin has previously consented to the scope.
      scope.consented = scopesLowerCase.indexOf(scope.name.toLowerCase()) !== -1;
    }
  }

  private async displayUserProfile() {
    try {
      const userInfoUrl = `${getGraphUrl()}/v1.0/me`;
      const userPictureUrl = `${getGraphUrl()}/beta/me/photo/$value`;
      const userInfo = await this.apiService.performQuery('GET', userInfoUrl);
      const jsonUserInfo = userInfo.json();

      AppComponent.explorerValues.authentication.user.displayName = jsonUserInfo.displayName;
      AppComponent.explorerValues.authentication.user.emailAddress
        = jsonUserInfo.mail || jsonUserInfo.userPrincipalName;

      try {
        const userPicture = await this.apiService.performQuery('GET_BINARY', userPictureUrl);
        const blob = new Blob([userPicture.arrayBuffer()], { type: 'image/jpeg' });
        const imageUrl = window.URL.createObjectURL(blob);

        AppComponent.explorerValues.authentication.user.profileImageUrl = imageUrl;
      } catch (e) {
        collectLogs(e.message);
        AppComponent.explorerValues.authentication.user.profileImageUrl = null;
      }
      AppComponent.explorerValues.authentication.status = 'authenticated';
      this.changeDetectorRef.detectChanges();

    } catch (e) {
      collectLogs(e.message);
      localLogout();
    }
  }

  private acquireTokenCallBack(response) {
    if (response && response.tokenType === 'access_token') {

      AppComponent.explorerValues.authentication.status = 'authenticated';
      this.setPermissions(response);
      this.displayUserProfile();
    } else if (response && response.tokenType === 'id_token') {
      acquireNewAccessToken(app)
        .then(this.acquireTokenCallBack).catch(this.acquireTokenErrorCallBack);
    } else {
      AppComponent.explorerValues.authentication.status = 'anonymous';
    }
  }

  private acquireTokenErrorCallBack(error) {
    collectLogs(error.message);
    AppComponent.explorerValues.authentication.status = 'anonymous';
  }
}
