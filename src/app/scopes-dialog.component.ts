// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, AfterViewInit } from '@angular/core';
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";
import { PermissionScopes } from "./scopes";
import { PermissionScope } from "./base";
import { getScopes } from "./auth";

declare let fabric, mwf;

@Component({
  selector: 'scopes-dialog',
  styleUrls: ['./scopes-dialog.component.css'],
  templateUrl: './scopes-dialog.component.html',
})
export class ScopesDialogComponent extends GraphExplorerComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        ScopesDialogComponent.setScopesEnabledTarget();
        window['launchPermissionsDialog'] = ScopesDialogComponent.showDialog
    }

    scopeListIsDirty():boolean {
      return PermissionScopes.filter(s => s.enabled != s.enabledTarget).length > 0;
    }

    requestingAdminScopes():boolean {
      return PermissionScopes.filter(s => s.admin && s.enabledTarget).length > 0;
    }

    toggleScopeEnabled(scope:PermissionScope) {
      scope.enabledTarget = !scope.enabledTarget;
    }

    startAdminConsentFlow() {
      let loginProperties = {
        display: 'page',
        nonce: 'graph_explorer',
        prompt: 'select_account'
      };

      (hello('msft_admin_consent').login(loginProperties) as any);

    }

    getNewAccessToken() {
      // @todo type HelloJSLoginOptions
      let loginProperties = {
        display: 'page',
        response_type: "id_token token",
        nonce: 'graph_explorer',
        prompt: 'select_account',
        // login_hint: AppComponent.explorerValues.authentication.user.emailAddress, // breaks MSA login
        scope: PermissionScopes.filter(scope => scope.enabledTarget).map(scope => scope.name).join(" ")
      };

      hello('msft').login(loginProperties);
    }

    static showDialog() {
        ScopesDialogComponent.setScopesEnabledTarget();

        const el = document.querySelector("#scopes-dialog")
        const fabricDialog = new fabric['Dialog'](el);
        fabricDialog.open();

        mwf.ComponentFactory.create([{
            'component': mwf.Checkbox
        }])
    }

    static setScopesEnabledTarget() {
      // populate enabledTarget
      for (let scope of PermissionScopes) {
        scope.enabledTarget = scope.enabled;
      }
    }

    scopes:PermissionScope[] = PermissionScopes;
}