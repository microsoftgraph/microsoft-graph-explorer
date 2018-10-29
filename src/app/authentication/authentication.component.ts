// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { ChangeDetectorRef , Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { GraphService } from '../graph-service';
import { GraphExplorerComponent } from '../GraphExplorerComponent';
import { ScopesDialogComponent } from '../scopes-dialog/scopes-dialog.component';
import { localLogout } from './auth';
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

  public ngOnInit() {
    if (this.getAuthenticationStatus() === 'authenticated') {
      this.createUserProfile();
    }
  }

  public sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // Https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
  public login() {
    this.authService.login();
    }

  public logout() {
      localLogout();
      this.authService.logout();
  }

  public getAuthenticationStatus() {
    const status = localStorage.getItem('status');
    return status;
  }

  public manageScopes() {
    ScopesDialogComponent.showDialog();
  }

  private createUserProfile() {
    localStorage.setItem('status', 'authenticating');
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
    }));

    Promise.all(promisesGetUserInfo).then(() => {
      localStorage.setItem('status', 'authenticated');
      this.changeDetectorRef.detectChanges();
    }).catch((e) => {
      localLogout();
    });
  }
}
