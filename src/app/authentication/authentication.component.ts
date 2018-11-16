// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { GraphService } from '../graph-service';
import { GraphExplorerComponent } from '../GraphExplorerComponent';
import { PermissionScopes } from '../scopes-dialog/scopes';
import { ScopesDialogComponent } from '../scopes-dialog/scopes-dialog.component';
import { haveValidAccessToken, localLogout } from './auth';
import { AuthService } from './auth.service';
@Component({
  selector: 'authentication',
  styleUrls: ['./authentication.component.css'],
  templateUrl: './authentication.component.html',
})

export class AuthenticationComponent extends GraphExplorerComponent {

  public authInfo = this.explorerValues.authentication;

  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private apiService: GraphService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  public async ngOnInit() {
    const valid = await haveValidAccessToken(this.authService);
    if (this.getAuthenticationStatus() === 'authenticated' && valid) {
      this.displayUserProfile();
      this.setPermissions();
    }
  }

  public sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // Https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
  public login() {
    localStorage.setItem('status', 'authenticating');
    this.changeDetectorRef.detectChanges();
    this.authService.login()
      .then((accessToken) => {
        if (accessToken) {
          localStorage.setItem('status', 'authenticated');
          this.changeDetectorRef.detectChanges();
          this.displayUserProfile();
          this.setPermissions();
        } else {
          localStorage.setItem('status', 'anonymous');
          this.changeDetectorRef.detectChanges();
        }
      }).catch(() => {
        localStorage.setItem('status', 'anonymous');
        this.changeDetectorRef.detectChanges();
      });

  }

  public logout() {
    localLogout();
    this.changeDetectorRef.detectChanges();
  }

  public getAuthenticationStatus() {
    const status = localStorage.getItem('status');
    return status;
  }

  public manageScopes() {
    ScopesDialogComponent.showDialog();
  }

  public async setPermissions() {
    // Set which permissions are checked
    const scopes = await this.authService.getScopes();
    scopes.push('openid');
    for (const scope of PermissionScopes) {
      // Scope.consented indicates that the user or admin has previously consented to the scope.
      scope.consented = scopes.indexOf(scope.name.toLowerCase()) !== -1;
    }
  }

  private displayUserProfile() {
    const promisesGetUserInfo = [];
    // Get displayName and email
    promisesGetUserInfo.push(this.apiService.performQuery('GET', `${AppComponent.Options.GraphUrl}/v1.0/me`)
      .then((result) => {
        const resultBody = result.json();
        AppComponent.explorerValues.authentication.user.displayName = resultBody.displayName;
        AppComponent.explorerValues.authentication.user.emailAddress = resultBody.mail || resultBody.userPrincipalName;
      }));

    // Get profile image
    promisesGetUserInfo.push(this.apiService
      .performQuery('GET_BINARY', `${AppComponent.Options.GraphUrl}/beta/me/photo/$value`)
      .then((result) => {
        const blob = new Blob([result.arrayBuffer()], { type: 'image/jpeg' });
        const imageUrl = window.URL.createObjectURL(blob);
        AppComponent.explorerValues.authentication.user.profileImageUrl = imageUrl;
        // tslint:disable-next-line:no-console
      }).catch((e) => console.log(e)));

    Promise.all(promisesGetUserInfo).then(() => {
      localStorage.setItem('status', 'authenticated');
      this.changeDetectorRef.detectChanges();
    });
  }
}
