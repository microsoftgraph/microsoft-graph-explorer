// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AuthenticationComponent } from './login.component'
import { FormsModule } from '@angular/forms'
import { SidebarComponent } from "./sidebar.component";
import { QueryRowComponent } from "./queryrow.component";
import { ExplorerOptions } from "./base";
import { HttpModule } from '@angular/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, AuthenticationComponent, SidebarComponent, QueryRowComponent ],
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