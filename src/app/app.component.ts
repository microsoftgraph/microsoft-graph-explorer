// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, Input, ChangeDetectorRef, DoCheck, AfterViewInit } from '@angular/core';
import { ExplorerOptions, RequestType, ExplorerValues, GraphApiCall, GraphRequestHeader } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { initAuth, isAuthenticated } from "./auth";
import { AppModule } from "./app.module";
import { initFabricComponents } from "./fabric-components";
import { GraphService } from "./api-explorer-svc";
import { Response, Headers } from '@angular/http';
import { isImageResponse, isHtmlResponse, isXmlResponse, handleHtmlResponse, handleXmlResponse, handleJsonResponse, handleImageResponse, insertHeadersIntoResponseViewer, showResults } from "./response-handlers";
import { saveHistoryToLocalStorage, loadHistoryFromLocalStorage } from "./history";
import * as moment from "moment"
import { createHeaders, getParameterByName } from "./util";
import { getRequestBodyEditor, getAceEditorFromElId, getJsonViewer } from "./api-explorer-jseditor";
import { parseMetadata } from "./graph-structure";
import { ResponseStatusBarComponent } from "./response-status-bar.component";

declare let mwf:any;

@Component({
  selector: 'api-explorer',
  providers: [GraphService],
  template: `
    <div class="ms-Grid"> 
      <div class="ms-Grid-row">
        <sidebar class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4 ms-u-xl3 ms-u-xxl3 ms-u-xxxl2"></sidebar>
        <main-column class="ms-Grid-col ms-u-sm12 ms-u-md12  ms-u-lg8 ms-u-xl9 ms-u-xxl9 ms-u-xxxl10" id="explorer-main"></main-column>
    </div>
    <history-panel></history-panel>
    <sample-categories-panel></sample-categories-panel>
    `,
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
      // Headers aren't updated when that tab is hidden, so when clicking on any tab reinsert the headers
      $("#response-viewer-labels .ms-Pivot-link").on('click', () => {
          insertHeadersIntoResponseViewer(AppComponent.lastApiCallHeaders)
      });

      parseMetadata(this.GraphService, "v1.0");
      parseMetadata(this.GraphService, "beta");
    }


  static svc:GraphService;
  static lastApiCall:GraphApiCall;
  static lastApiCallHeaders: Headers;
  static _changeDetectionRef:ChangeDetectorRef;


  constructor(private GraphService: GraphService, private chRef: ChangeDetectorRef) {
    super();
    AppComponent.svc = GraphService;
    AppComponent._changeDetectionRef = chRef;
  }

  ngOnInit() {
    for (let key in AppComponent.Options) {
      if (key in window)
        AppComponent.Options[key] = window[key];
    }

    AppComponent.Options.GraphVersions.push("Other");

    initAuth(AppComponent.Options, this.GraphService, this.chRef);

    initFabricComponents();

    mwf.ComponentFactory.create([
      {
        'component': mwf.Drawer,
      }
    ])

    moment.locale(AppComponent.Options.Language);
  }
  

  static Options: ExplorerOptions = {
      ClientId: "",
      Language: "en-US",
      AdminScopes: "User.ReadWrite.All Group.ReadWrite.All Directory.ReadWrite.All Directory.AccessAsUser.All IdentityRiskEvent.Read.All",
      DefaultUserScopes: "openid profile User.ReadWrite User.ReadBasic.All Sites.ReadWrite.All Contacts.ReadWrite People.Read Notes.ReadWrite.All Tasks.ReadWrite  Mail.ReadWrite Files.ReadWrite.All Calendars.ReadWrite",
      AuthUrl: "https://login.microsoftonline.com",
      GraphUrl: "https://graph.microsoft.com",
      GraphVersions: ["v1.0", "beta"],
      PathToBuildDir: ""
  };

  static explorerValues:ExplorerValues = {
      endpointUrl: getParameterByName("request") || AppComponent.Options.GraphUrl + '/v1.0/me/',
      selectedOption: getParameterByName("method") as RequestType || "GET",
      selectedVersion: getParameterByName("version") || "v1.0",
      authentication: {},
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

  static executeExplorerQuery(fromSample?:boolean) {

    // #hack.  When clicking on an autocomplete option, the model isn't updated
    if (fromSample != true)
      AppComponent.explorerValues.endpointUrl = $("#graph-request-url input").val();

    let query:GraphApiCall = {
        requestUrl: AppComponent.explorerValues.endpointUrl,
        method: AppComponent.explorerValues.selectedOption,
        requestSentAt: new Date(),
        headers: AppComponent.explorerValues.headers,
        postBody: getRequestBodyEditor().getSession().getValue()
    };

    let graphRequest:Promise<Response>;
    if (isAuthenticated()) {
      graphRequest = AppComponent.svc.performQuery(query.method, query.requestUrl, query.postBody, createHeaders(query.headers));
    } else {
      graphRequest = AppComponent.svc.performAnonymousQuery(query.method, query.requestUrl, createHeaders(query.headers));
    }
    this.explorerValues.requestInProgress = true;

    graphRequest.then((res) => {
      handleSuccessfulQueryResponse(res, query);
    }).catch((res) => {
      handleUnsuccessfulQueryResponse(res, query);
    });
  }

  static clearResponse() {
    // clear response preview and headers
    getAceEditorFromElId("response-header-viewer").getSession().setValue("");
    getJsonViewer().getSession().setValue("")

    ResponseStatusBarComponent.clearLastCallMessage()
  }


 }

 function commonResponseHandler(res:Response, query:GraphApiCall) {

    AppComponent.clearResponse();

      // common ops for successful and unsuccessful
    AppComponent.explorerValues.requestInProgress = false;
    AppComponent.lastApiCall = query;
    AppComponent.lastApiCallHeaders = res.headers;

    let {status, headers} = res;
    query.duration = (new Date()).getTime() - query.requestSentAt.getTime();
    query.statusCode = status;
    AppComponent.addRequestToHistory(query);




 }
function handleSuccessfulQueryResponse(res:Response, query:GraphApiCall) {
  commonResponseHandler(res, query);
  let {status, headers} = res;

  let resultBody = res.text();

  AppComponent.explorerValues.showImage = false;
  if (isImageResponse(headers)) {
    let method = isAuthenticated() ? AppComponent.svc.performQuery : AppComponent.svc.performAnonymousQuery;;
    handleImageResponse(method, headers, status, handleUnsuccessfulQueryResponse);
  } else if (isHtmlResponse(headers)) {  
    insertHeadersIntoResponseViewer(headers);
    handleHtmlResponse(resultBody);
  } else if (isXmlResponse(resultBody)) {
    insertHeadersIntoResponseViewer(headers);
    handleXmlResponse(resultBody);
  } else {
    insertHeadersIntoResponseViewer(headers);
    if (res.text() != "")
      handleJsonResponse(res.json());
  }
}

function handleUnsuccessfulQueryResponse(res:Response, query:GraphApiCall) {
  commonResponseHandler(res, query);
  insertHeadersIntoResponseViewer(res.headers);
  let errorText;
  
  try {
    errorText = res.json();
    handleJsonResponse(errorText);
    return;
  } catch(e) {
    errorText = res.text();
  }

  if (errorText.indexOf("<!DOCTYPE html>") != -1) {
    handleHtmlResponse(errorText);
  } else {
    showResults(errorText, "text")
  }
  
}