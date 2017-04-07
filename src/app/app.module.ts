// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent }  from './app.component';
import { MainColumnComponent } from './main-column.component'
import { AuthenticationComponent } from './authentication.component'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'
import { SidebarComponent } from "./sidebar.component";
import { QueryRowComponent } from "./queryrow.component";
import { ExplorerOptions } from "./base";
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import {HistoryRowComponent} from './history-query.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, BrowserAnimationsModule, MaterialModule ],
  declarations: [ AppComponent, AuthenticationComponent, SidebarComponent, QueryRowComponent, MainColumnComponent, HistoryRowComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


// enableProdMode()

// angular.module('ApiExplorer')
// .config(function($locationProvider) {
//     $locationProvider.html5Mode({
//         enabled: true,
//         requireBase: false,
//         rewriteLinks: false
//     });
    
// })
// .factory('ApiExplorerSvc', [function () {
//     var apiExplorerService = {};
//     return apiExplorerService;
// }]);