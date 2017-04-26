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
  styles: [`
  .ms-Dialog-content {
    max-height: 451px;
    overflow: auto;
    margin-top: 20px;
  }

  .ms-Dialog {
    max-width: 770px;
    z-index: 999;
  }

  .ms-Dialog-title {
    text-transform: capitalize;
  }

  .ms-Link {
    color: #0078d7;
  }

  .ms-CheckBox-field:before, .ms-CheckBox-field:after {
    margin-top: 4px;
  }

  .ms-MessageBar {
    margin-top: 20px;
    width: 100%;
  }

  .c-checkbox input[type=checkbox]:focus+span:before {
    outline: none !important;
  }

  label.c-label {
      margin-top: 0px;
      margin-bottom: 20px;
  }

  .preview-label {
    margin-left: 10px;
  }
`],
  template: `

  <div class="ms-Dialog center-dialog ms-Dialog--close" id="scopes-dialog">
    <button class="ms-Dialog-button ms-Dialog-buttonClose">
      <i class="ms-Icon ms-Icon--Cancel"></i>
    </button>
    <div class="ms-Dialog-title">{{getStr('modify permissions')}}</div>
      <p class="ms-Dialog-subText">Select different <a class="ms-Link" href="https://developer.microsoft.com/en-us/graph/docs/authorization/permission_scopes" target="_blank">permission scopes</a> to try out Microsoft Graph API endpoints.</p>
      <div class="ms-Dialog-content">
        <table class="ms-Table">
          <tr *ngFor="let scope of scopes">
            <td>
              <div class="c-checkbox">
                  <label class="c-label">
                      <input type="checkbox" [disabled]="scope.name == 'openid'" (change)="toggleScopeEnabled(scope)" name="checkboxId1" value="value1" [checked]="scope.enabledTarget">
                      <span aria-hidden="true">{{scope.name}}<i class="preview-label" *ngIf="scope.preview">{{getStr('Preview')}}</i></span>
                  </label>
              </div>
            </td>
            <td>
              <span *ngIf="scope.admin">
                Admin
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div *ngIf="scopeListIsDirty()">
        <div class="ms-MessageBar">
          <div class="ms-MessageBar-content">
            <div class="ms-MessageBar-icon">
              <i class="ms-Icon ms-Icon--Info"></i>
            </div>
            <div class="ms-MessageBar-text">
              {{getStr('To change permissions, you will need to log-in again.')}}
              <br />
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="requestingAdminScopes()">
        <div class="ms-MessageBar">
          <div class="ms-MessageBar-content">
            <div class="ms-MessageBar-icon">
              <i class="ms-Icon ms-Icon--Info"></i>
            </div>
            <div class="ms-MessageBar-text">
              You have selected permissions that only an administrator can grant.  To get access, an administrator can grant <a class="ms-Link" href="#" (click)="startAdminConsentFlow()">access to your entire administration</a>.
              <br />
            </div>
          </div>
        </div>
      </div>


    <div class="ms-Dialog-actions">
      <button class="ms-Button ms-Dialog-action ms-Button--primary" [disabled]="!scopeListIsDirty()" (click)="getNewAccessToken()">
        <span class="ms-Button-label">{{getStr('Save changes')}}</span> 
      </button>
      <button class="ms-Button ms-Dialog-action">
        <span class="ms-Button-label">{{getStr('Close')}}</span> 
      </button>
    </div>
  </div>

     `,
})
export class ScopesDialogComponent extends GraphExplorerComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        ScopesDialogComponent.setScopesEnabledTarget();
    }

    scopeListIsDirty():boolean {
      return PermissionScopes.filter((s) => s.enabled != s.enabledTarget).length > 0;
    }

    requestingAdminScopes():boolean {
      return PermissionScopes.filter((s) => s.admin && s.enabledTarget).length > 0;
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

      (hello('msft_admin_consent').login(loginProperties) as any).then(function() {
        alert('You are signed in to Facebook');
      }, function(e) {
        alert('Signin error: ' + e.error.message);
      });

    }

    getNewAccessToken() {
      // @todo type HelloJSLoginOptions
      let loginProperties = {
        display: 'page',
        response_type: "id_token token",
        nonce: 'graph_explorer',
        prompt: 'select_account',
        login_hint: AppComponent.explorerValues.authentication.user.preferred_username,
        scope: PermissionScopes.filter((scope) => scope.enabledTarget).map((scope) => scope.name).join(" ")
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