// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { PermissionScopes } from "./scopes";
import { PermissionScope } from "./base";

declare let fabric, mwf;

@Component({
  selector: 'scopes-dialog',
  styleUrls: ['./scopes-dialog.component.css'],
  templateUrl: './scopes-dialog.component.html',
})
export class ScopesDialogComponent extends GraphExplorerComponent implements AfterViewInit {

  // Use this to get a handle on the scopes-list-table-container element.
  @ViewChild('scopesListTableContainer') scopesTableList: ElementRef;

  // Contains the scopes list table height. The maximum height value is 451px.
  scopesListTableHeight: String;

  // Flags for changing the scopes list table height.
  hasChangedScopeListHeight: Boolean = false;
  hasRequestedAdminConsent: Boolean = false;

  // Updates the style.height of the scopes-list-table-container element. 
  getScopesListTableHeight(): String {
    this.scopesListTableHeight = window.getComputedStyle(this.scopesTableList.nativeElement, null).getPropertyValue("height");
    return this.scopesListTableHeight;
  }

  getScopeLabel(scopeName: String): String {
    return scopeName + " scope";
  }

  ngAfterViewInit(): void {
    this.sortScopesList();
    ScopesDialogComponent.setScopesEnabledTarget();
    window['launchPermissionsDialog'] = ScopesDialogComponent.showDialog;
    this.scopesListTableHeight = window.getComputedStyle(this.scopesTableList.nativeElement, null).getPropertyValue("height");
  }

  sortScopesList(): void {
    PermissionScopes.sort(function (a, b) {
      var scopeName_a = a.name.toUpperCase();
      var scopeName_b = b.name.toUpperCase();
      return (scopeName_a < scopeName_b) ? -1 : (scopeName_a > scopeName_b) ? 1 : 0;
    });
  }

  /** 
   * Indicates whether the scope list has been changed.
   * @returns {boolean} A value of true indicates that a scope has been added or removed from the scope list.
  */
  scopeListIsDirty(): boolean {

    // Determine whether the scope list has changed. The scope list has changed if isDirty = true.
    let isDirty = PermissionScopes.filter((s) => s.enabled !== s.enabledTarget).length > 0;

    // Reduce the size of the scopes table list by the size of the message bar. We only want to make this
    // change the first time that the selected scope list is changed. 
    if (isDirty && !this.hasChangedScopeListHeight) {

      // Convert the table height from string to number.
      var currentHeight: number = Number(this.scopesListTableHeight.replace(/px/, "")).valueOf();

      // Update the table height based on the height of the message bar that's displayed when the scope list is dirty.
      // This should keep the buttons from moving below the viewport as long as the component is showing in the viewport.
      var updatedHeight: number = currentHeight - 60;

      // Convert the updated height to a string and set the scopes list table height style.
      this.scopesTableList.nativeElement.style.height = updatedHeight.toString() + "px";

      // We only want to adjust the height one time after making a change to the selected scope list.
      this.hasChangedScopeListHeight = true;
    }

    return isDirty;
  }

  /** 
   * Indicates whether an admin scope has been selected.
   * @returns {boolean} A value of true indicates that a scope that requires admin consent has been selected.
  */
  requestingAdminScopes(): boolean {

    // Determine whether a scope that requires admin consent has been selected. An admin consent scope has been selected if isDirty = true.
    let isDirty = PermissionScopes.filter((s) => s.admin && s.enabledTarget).length > 0;

    // Reduce the size of the scopes table list by the size of the message bar. We only want to make this
    // change the first time that the selected scope list is changed. 
    if (isDirty && !this.hasRequestedAdminConsent) {
      // Convert the table height from string to number.
      var currentHeight: number = Number(this.scopesListTableHeight.replace(/px/, "")).valueOf();

      // Update the table height based on the height of the message bar that's displayed when an admin consent scope is selected.
      // This should keep the buttons from moving below the viewport as long as the component is showing in the viewport.
      var updatedHeight: number = currentHeight - 135;

      // Convert the updated height to a string and set the scopes list table height style.
      this.scopesTableList.nativeElement.style.height = updatedHeight.toString() + "px";

      // We only want to adjust the height one time after making a change to the selected scope list.
      this.hasRequestedAdminConsent = true;
    }

    return isDirty;
  }

  toggleScopeEnabled(scope: PermissionScope) {
    scope.enabledTarget = !scope.enabledTarget;
  }

  startAdminConsentFlow() {
    let loginProperties = {
      display: 'page',
      nonce: 'graph_explorer',
      prompt: 'select_account'
    };

    hello('msft_admin_consent').login(loginProperties);

  }

  getNewAccessToken() {
    // @todo type HelloJSLoginOptions
    let loginProperties = {
      display: 'page',
      response_type: "token",
      nonce: 'graph_explorer',
      prompt: 'select_account',
      // login_hint: AppComponent.explorerValues.authentication.user.emailAddress, // breaks MSA login
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

  scopes: PermissionScope[] = PermissionScopes;
}