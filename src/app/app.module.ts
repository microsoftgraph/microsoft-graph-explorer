// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AriaSelectedMSPivotLinkDirective } from './aria-selected.directive';
import { AuthenticationComponent } from './authentication/authentication.component';
import { GenericDialogComponent } from './generic-message-dialog.component';
import { HistoryPanelComponent } from './history-panel.component';
import { HistoryRowComponent } from './history-query.component';
import { MainColumnComponent } from './main-column.component';
import { MethodBadgeComponent } from './method-badge.component';
import { QueryRowComponent } from './queryrow/queryrow.component';
import { RequestEditorsComponent } from './request-editors.component';
import { ResponseStatusBarComponent } from './response-status-bar/response-status-bar.component';
import { SampleCategoriesPanelComponent } from './sample-categories-panel.component';
import { ScopesDialogComponent } from './scopes-dialog/scopes-dialog.component';
import { ShareLinkBtnComponent } from './share-link/share-link-btn.component';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, BrowserAnimationsModule],
  declarations: [AppComponent, AriaSelectedMSPivotLinkDirective, ResponseStatusBarComponent,
    AuthenticationComponent, SidebarComponent, QueryRowComponent, MainColumnComponent, HistoryRowComponent,
    HistoryPanelComponent, MethodBadgeComponent, SampleCategoriesPanelComponent, RequestEditorsComponent,
    ShareLinkBtnComponent, ScopesDialogComponent, GenericDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
