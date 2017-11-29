// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { ExplorerOptions, RequestType, ExplorerValues, GraphApiCall, Message, MessageBarContent, GraphApiVersions, GraphApiVersion } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { initAuth } from "./auth";
import { initFabricComponents } from "./fabric-components";
import { GraphService } from "./graph-service";
import { saveHistoryToLocalStorage, loadHistoryFromLocalStorage } from "./history";
import { getParameterByName } from "./util";
import { parseMetadata } from "./graph-structure";
import { GenericDialogComponent } from "./generic-message-dialog.component";
import { refreshAceEditorsContent } from "./ace-utils";

declare let mwf, moment;

@Component({
  selector: 'api-explorer',
  providers: [GraphService],
  templateUrl: './app.component.html',
  styles: [`
  #explorer-main {
      padding-left: 12px;
  }

  sidebar {
      padding: 0px;
  }

`]
})
export class AppComponent extends GraphExplorerComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
      // when clicking on a pivot (request headers/body or response headers/body), notify ACE to update content
      if (typeof $ !== "undefined") {
        $("api-explorer .ms-Pivot-link").on('click', () => {
          setTimeout(refreshAceEditorsContent, 0);
        });
      }

      parseMetadata(this.GraphService, "v1.0");
      parseMetadata(this.GraphService, "beta");
    }


  static messageBarContent:MessageBarContent;
  static _changeDetectionRef:ChangeDetectorRef;
  static message:Message;

  constructor(private GraphService: GraphService, private chRef: ChangeDetectorRef) {
    super();
    AppComponent._changeDetectionRef = chRef;
  }

  ngOnInit() {
    for (let key in AppComponent.Options) {
      if (key in window) {
        AppComponent.Options[key] = window[key];
      }
    }

    AppComponent.Options.GraphVersions.push("Other");

    initAuth(AppComponent.Options, this.GraphService, this.chRef);

    initFabricComponents();

    mwf.ComponentFactory.create([{
        'component': mwf.Drawer,
    }]);

    moment.locale(AppComponent.Options.Language);

    // set explorer state that depends on configuration
    AppComponent.explorerValues.endpointUrl = AppComponent.Options.GraphUrl + `/${(getParameterByName("version") || "v1.0")}/${getParameterByName("request") || 'me/'}`;

    // Show the Microsoft Graph TOU when we load GE.
    AppComponent.messageBarContent = {
      text: "When you use the Microsoft Graph API, you agree to the <a href='https://aka.ms/msgraphtou' target='_blank'>Microsoft Graph Terms of Use</a> and the <a href='https://go.microsoft.com/fwlink/?LinkId=521839' target='_blank'>Microsoft Privacy Statement</a>.",
      backgroundClass: "ms-MessageBar--warning",
      icon: "none"
    }
  }

  static Options: ExplorerOptions = {
      ClientId: "",
      Language: "en-US",
      DefaultUserScopes: "openid profile User.ReadWrite User.ReadBasic.All Sites.ReadWrite.All Contacts.ReadWrite People.Read Notes.ReadWrite.All Tasks.ReadWrite  Mail.ReadWrite Files.ReadWrite.All Calendars.ReadWrite",
      AuthUrl: "https://login.microsoftonline.com",
      GraphUrl: getParameterByName("GraphUrl") || "https://graph.microsoft.com",
      GraphVersions: GraphApiVersions,
      PathToBuildDir: ""
  };

  static explorerValues:ExplorerValues = {
      selectedOption: getParameterByName("method") as RequestType || "GET",
      selectedVersion: getParameterByName("version") as GraphApiVersion || "v1.0",
      authentication: {
        user: {}
      },
      showImage: false,
      requestInProgress: false,
      headers: [],
      postBody: ""
  };

  static requestHistory: GraphApiCall[] = loadHistoryFromLocalStorage();

  static addRequestToHistory(request:GraphApiCall) {
      AppComponent.requestHistory.splice(0, 0, request); //add history object to the array
      saveHistoryToLocalStorage(AppComponent.requestHistory);
  }

  static removeRequestFromHistory(request:GraphApiCall) {
      const idx = AppComponent.requestHistory.indexOf(request);

      if (idx > -1) {
        AppComponent.requestHistory.splice(idx, 1);
      } else {
        console.error("Trying to remove history item that doesn't exist")
      }
      saveHistoryToLocalStorage(AppComponent.requestHistory);
  }

  static setMessage(message:Message) {
    AppComponent.message = message;
    setTimeout(() => {GenericDialogComponent.showDialog();});
  }
 }