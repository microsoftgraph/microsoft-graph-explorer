// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SeverityLevel } from '@microsoft/applicationinsights-web';
import { AuthResponse } from 'msal';
import { AppComponent } from '../app.component';
import { GraphService } from '../graph-service';
import { GraphExplorerComponent } from '../GraphExplorerComponent';
import { PermissionScopes } from '../scopes-dialog/scopes';
import { ScopesDialogComponent } from '../scopes-dialog/scopes-dialog.component';
import { telemetry } from '../telemetry/telemetry';
import { getGraphUrl } from '../util';
import { localLogout } from './auth';
import { acquireNewAccessToken, login, requiresInteraction } from './auth.service';
import { app } from './msal-user-agent';

@Component({
  selector: 'authentication',
  styleUrls: ['./authentication.component.css'],
  templateUrl: './authentication.component.html',
})

export class AuthenticationComponent extends GraphExplorerComponent {

  public authInfo = this.explorerValues.authentication;

  constructor(
    private sanitizer: DomSanitizer, private apiService: GraphService,
    private changeDetectorRef: ChangeDetectorRef) {
    super();
    this.acquireTokenCallBack = this.acquireTokenCallBack.bind(this);
    this.acquireTokenErrorCallBack = this.acquireTokenErrorCallBack.bind(this);
  }

  public async ngOnInit() {
    // Register Callbacks for redirect flow
    app.handleRedirectCallback(this.acquireTokenErrorCallBack, this.acquireTokenCallBack);

    AppComponent.explorerValues.authentication.status = 'anonymous';

    const prevVersion = localStorage.getItem('version');
    const { appVersion } = (window as any);

    const hostname = window.location.hostname;

    /**
     * This forces a logout for users who do not have the version property in localstorage.
     * The version is set when they log in, so this will only happen once.
     */
    if (hostname !== 'localhost' && prevVersion === null) {
      localStorage.clear();
    }

    /**
     * Clear localStorage when the version of GraphExplorer changes.
     */
    if (prevVersion && appVersion && appVersion !== prevVersion) {
      localStorage.clear();
    }

    const account = app.getAccount();
    const defaultScopes = AppComponent.Options.DefaultUserScopes;

    if (account) {
      AppComponent.explorerValues.authentication.status = 'authenticating';
      await acquireNewAccessToken(app, defaultScopes)
        .then(this.acquireTokenCallBack)
        .then(this.acquireTokenErrorCallBack);
    }
  }
  public sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public async login() {
    AppComponent.explorerValues.authentication.status = 'authenticating';

    /**
     * Setting the version here allows us to know which version of Graph Explorer the user authenticated with.
     */
    const { appVersion } = (window as any);
    if (appVersion) {
      localStorage.setItem('version', appVersion);
    }

    await login(app).then(this.acquireTokenCallBack)
      .catch(this.acquireTokenErrorCallBack);
  }

  public logout() {
    localLogout();
    app.logout();
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

        AppComponent.explorerValues.authentication.user.profileImageUrl = this.sanitize(imageUrl) as string;
      } catch (e) {
        AppComponent.explorerValues.authentication.user.profileImageUrl = null;
      }
      AppComponent.explorerValues.authentication.status = 'authenticated';
      this.changeDetectorRef.detectChanges();

    } catch (e) {
      localLogout();
    }
  }

  private async acquireTokenCallBack(response) {
    if (response && response.tokenType === 'access_token') {
      AppComponent.explorerValues.authentication.status = 'authenticated';
      this.displayUserProfile();
      this.setPermissions(response);
    } else if (response && response.tokenType === 'id_token') {
      await acquireNewAccessToken(app)
        .then(this.acquireTokenCallBack).catch(this.acquireTokenErrorCallBack);
    }
  }

  private acquireTokenErrorCallBack(error: any): void {
    AppComponent.explorerValues.authentication.status = 'anonymous';

    if (error) {
      telemetry.trackException(error, SeverityLevel.Critical);
    }
  }
}
