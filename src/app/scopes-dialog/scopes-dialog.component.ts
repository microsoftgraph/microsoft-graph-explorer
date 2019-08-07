// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { acquireNewAccessToken, getLoginType } from '../authentication/auth.service';
import { app } from '../authentication/msal-user-agent';
import { IPermissionScope } from '../base';
import { GraphExplorerComponent } from '../GraphExplorerComponent';
import { PermissionScopes } from './scopes';

declare let fabric;
declare let mwfAutoInit;

@Component({
  selector: 'scopes-dialog',
  styleUrls: ['./scopes-dialog.component.css'],
  templateUrl: './scopes-dialog.component.html',
})
export class ScopesDialogComponent extends GraphExplorerComponent implements AfterViewInit {
  public scopes: IPermissionScope[] = PermissionScopes;

  /**
   * Specifies whether we have any admin scopes selected in the scopes-dialog UI.
   * If this value is true, we will show an alert that admin consent will be required
   * to use this scope.
   */
  public hasSelectedAdminScope: boolean = false;

  /**
   * A container to track which admin scopes have been selected in the UI.
   */
  public selectedTargetedAdminScopes: IPermissionScope[] = [];

  // Use this to get a handle on the scopes-list-table-container element.
  @ViewChild('scopesListTableContainer') public scopesTableList: ElementRef;

  // Contains the scopes list table height. The maximum height value is 451px.
  public scopesListTableHeight: string;

  // Flags for changing the scopes list table height.
  public hasChangedScopeListHeight: boolean = false;
  public hasRequestedAdminConsent: boolean = false;

  constructor() {
    super();
  }
  // Updates the style.height of the scopes-list-table-container element.
  public getScopesListTableHeight(): string {
    this.scopesListTableHeight = window.getComputedStyle(this.scopesTableList.nativeElement, null)
      .getPropertyValue('height');
    return this.scopesListTableHeight;
  }

  public getScopeLabel(scopeName: string): string {
    return scopeName + ' scope';
  }

  public ngAfterViewInit(): void {
    this.sortScopesList();
    (window as any).launchPermissionsDialog = ScopesDialogComponent.showDialog;
    this.scopesListTableHeight = window
      .getComputedStyle(this.scopesTableList.nativeElement, null).getPropertyValue('height');
  }

  public sortScopesList(): void {
    PermissionScopes.sort((a, b) => {
      const scopeNameA = a.name.toUpperCase();
      const scopeNameB = b.name.toUpperCase();
      return (scopeNameA < scopeNameB) ? -1 : (scopeNameA > scopeNameB) ? 1 : 0;
    });
  }

  /*
   * Indicates whether the scope list has been changed.
   * @returns {boolean} A value of true indicates that a scope has been added or removed from the scope list.
  */
  public scopeListIsDirty(): boolean {

    // Determine whether the scope list has changed. The scope list has changed if isDirty = true.
    const isDirty = PermissionScopes.filter((s) => s.requested === true).length > 0;

    // Reduce the size of the scopes table list by the size of the message bar. We only want to make this
    // Change the first time that the selected scope list is changed.
    if (isDirty && !this.hasChangedScopeListHeight) {

      // Convert the table height from string to number.
      const currentHeight: number = Number(this.scopesListTableHeight.replace(/px/, '')).valueOf();

      // Update the table height based on the height of the message bar that's displayed when the scope list is dirty.
      // This should keep the buttons from moving below the viewport as long as the component is showing in the viewport
      const updatedHeight: number = currentHeight - 60;

      // Convert the updated height to a string and set the scopes list table height style.
      this.scopesTableList.nativeElement.style.height = updatedHeight.toString() + 'px';

      // We only want to adjust the height one time after making a change to the selected scope list.
      this.hasChangedScopeListHeight = true;
    }

    return isDirty;
  }

  /*
   * Indicates whether an admin scope has been selected.
   * @returns {boolean} A value of true indicates that a scope that requires admin consent has been selected.
  */
  public requestingAdminScopes(): boolean {

    // Determine whether a scope that requires admin consent has been requested. An admin consent scope has been
    // Selected if isDirty = true.
    const isDirty = PermissionScopes.filter((s) => s.admin && s.requested).length > 0;

    // Reduce the size of the scopes table list by the size of the message bar. We only want to make this
    // Change the first time that the selected scope list is changed.
    if (isDirty && !this.hasRequestedAdminConsent) {
      // Convert the table height from string to number.
      const currentHeight: number = Number(this.scopesListTableHeight.replace(/px/, '')).valueOf();

      /*
       Update the table height based on the height of the message bar that's displayed when an admin consent scope is
       selected.
       This should keep the buttons from moving below the viewport as long as the component is showing in the viewport.
      */
      const updatedHeight: number = currentHeight - 135;

      // Convert the updated height to a string and set the scopes list table height style.
      this.scopesTableList.nativeElement.style.height = updatedHeight.toString() + 'px';

      // We only want to adjust the height one time after making a change to the selected scope list.
      this.hasRequestedAdminConsent = true;
    }

    return isDirty;
  }

  /**
   * Toggles whether the scope will be requested. This occurs in the Modify Permissions UI by selecting a checkbox.
   * This will be used to determine whether we will request consent for this scope.
   * @param scope The scope to toggle its enabled state.
   */
  public toggleRequestScope(scope: IPermissionScope) {
    scope.requested = !scope.requested;

    // Track whether we have any admin scopes selected in the UI to be enabled for the user.
    if (scope.admin && scope.requested) {
      this.selectedTargetedAdminScopes.push(scope);
      this.hasSelectedAdminScope = true;
    } else if (scope.admin && !scope.requested) {
      this.selectedTargetedAdminScopes = this.selectedTargetedAdminScopes.filter((e) => e !== scope);
      if (this.selectedTargetedAdminScopes.length === 0) {
        this.hasSelectedAdminScope = false;
      }
    }
  }

  public async getNewAccessToken() {
    const selectedScopes = PermissionScopes.filter((scope) => scope.requested && !scope.consented)
      .map((scope) => scope.name);
    await acquireNewAccessToken(app, selectedScopes);
  }

  public static showDialog() { // tslint:disable-line

    const scopesDialog = document.querySelector('#scopes-dialog');
    const fabricDialog = new fabric.Dialog(scopesDialog);
    fabricDialog.open();

    mwfAutoInit.ComponentFactory.create([{
      component: mwfAutoInit.Checkbox,
    }]);

    // We are explicitly focusing on the close icon button here despite setting the autofocus property.
    // This is because Edge does not give this element focus even with the autofocus property set.
    // See: https://stackoverflow.com/questions/51867504/edge-how-to-make-autofocus-work-with-refresh-button
    (scopesDialog.childNodes[2] as any).focus();
  }

  public focusOnFirstElement(firstElement: Element) {
    (firstElement as any).focus();
  }

  public focusOnLastElement(event: any, lastElement: Element) {
    if (event.shiftKey && event.keyCode === 9) {
      (lastElement as any).focus();
    }
  }

  public getTabIndex(scope) {
    // Consented scopes appear as disabled elements.
    // Users should not be able to tab through them.
    const isDisabled = scope.consented;
    return isDisabled ? '-1' : '0';
  }
}
