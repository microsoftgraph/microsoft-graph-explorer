// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { GraphExplorerComponent } from "../GraphExplorerComponent";
import { AppComponent } from "../app.component";
import { ScopesDialogComponent } from "../scopes-dialog/scopes-dialog.component";
import { localLogout } from "./auth";
import { AuthService } from './auth.service';
import { GraphService } from "../graph-service";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'authentication',
  styleUrls: ['./authentication.component.css'],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent extends GraphExplorerComponent {
  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private apiService: GraphService, private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
  login() {
    this.authService.login()
      .then(user => {
        if (user) {
          AppComponent.explorerValues.authentication.status = "authenticating"
          this.changeDetectorRef.detectChanges();

          let promisesGetUserInfo = [];
          AppComponent.explorerValues.authentication.user = {}

          // get displayName and email
          promisesGetUserInfo.push(this.apiService.performQuery("GET", `${AppComponent.Options.GraphUrl}/v1.0/me`).then((result) => {
            let resultBody = result.json();

            AppComponent.explorerValues.authentication.user.displayName = resultBody.displayName;
            AppComponent.explorerValues.authentication.user.emailAddress = resultBody.mail || resultBody.userPrincipalName;
          }));

          // get profile image
          promisesGetUserInfo.push(this.apiService.performQuery('GET_BINARY', `${AppComponent.Options.GraphUrl}/beta/me/photo/$value`).then((result) => {
            let blob = new Blob([result.arrayBuffer()], { type: "image/jpeg" });
            let imageUrl = window.URL.createObjectURL(blob);
            AppComponent.explorerValues.authentication.user.profileImageUrl = imageUrl;
          }).catch((e) => console.log(e)));

          Promise.all(promisesGetUserInfo).then(() => {
            AppComponent.explorerValues.authentication.status = "authenticated";
            this.changeDetectorRef.detectChanges();
          }).catch((e) => {
            // occurs when hello got an access token, but it's already expired
            localLogout();
          });

          // set which permissions are checked

        } else {
          console.log('login failed');
        }
      }, () => {
        console.log('login failed');
      });
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