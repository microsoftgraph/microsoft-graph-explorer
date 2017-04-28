// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, Input, ChangeDetectorRef, DoCheck, AfterViewInit } from '@angular/core';
import { ExplorerOptions, RequestType, ExplorerValues, GraphApiCall, GraphRequestHeader, Message, SampleQuery, MessageBarContent } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { initAuth, isAuthenticated } from "./auth";
import { AppModule } from "./app.module";
import { initFabricComponents } from "./fabric-components";
import { GraphService } from "./graph-service";
import { Response, Headers } from '@angular/http';
import { isImageResponse, isHtmlResponse, isXmlResponse, handleHtmlResponse, handleXmlResponse, handleJsonResponse, handleImageResponse, insertHeadersIntoResponseViewer, showResults } from "./response-handlers";
import { saveHistoryToLocalStorage, loadHistoryFromLocalStorage } from "./history";
import { createHeaders, getParameterByName } from "./util";
import { getRequestBodyEditor, getAceEditorFromElId, getJsonViewer } from "./api-explorer-jseditor";
import { parseMetadata, constructGraphLinksFromFullPath } from "./graph-structure";
import { ResponseStatusBarComponent } from "./response-status-bar.component";
import { GenericDialogComponent } from "./generic-message-dialog.component";
import { getString } from "./api-explorer-helpers";

declare let mwf, ga, moment;

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
    <scopes-dialog></scopes-dialog>
    <generic-dialog></generic-dialog>
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
      if (typeof $ !== "undefined") {
        $("#response-viewer-labels .ms-Pivot-link").on('click', () => {
            insertHeadersIntoResponseViewer(AppComponent.lastApiCallHeaders)
        });
      }

      parseMetadata(this.GraphService, "v1.0");
      parseMetadata(this.GraphService, "beta");
    }


  static svc:GraphService;
  static messageBarContent:MessageBarContent;
  static lastApiCallHeaders: Headers;
  static _changeDetectionRef:ChangeDetectorRef;
  static message:Message;

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

    mwf.ComponentFactory.create([{
        'component': mwf.Drawer,
    }])

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
      endpointUrl: AppComponent.Options.GraphUrl + `/${(getParameterByName("version") || "v1.0")}/${getParameterByName("request") || 'me/'}`,
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

  
  static setMessage(message:Message) {
    AppComponent.message = message;
    setTimeout(() => {GenericDialogComponent.showDialog();});
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

    this.explorerValues.showImage = false;

    ResponseStatusBarComponent.clearMessage()

  }

 }


  function isSuccessful(query:GraphApiCall) {
      return query.statusCode >= 200 && query.statusCode < 300;
  }

 function createTextSummary(query:GraphApiCall) {
        let text = "";
        if (isSuccessful(query)) {
            text += getString(AppComponent.Options, "Success");
        } else {
            text += getString(AppComponent.Options, "Failure");
        }

        text += ` - ${getString(AppComponent.Options, "Status Code")} ${query.statusCode}`


        text += `<span style="font-weight: 800; margin-left: 40px;">${query.duration}ms</span>`;

        if (query.statusCode == 401 || query.statusCode == 403) {
          text += `<span style="margin-left: 40px;">Looks like you may not have the permissions for this call. Please <a href="#" class="c-hyperlink" onclick="window.launchPermissionsDialog()" class="">modify your permissions</a>.</span>`
        }

        return text;
    }


 function commonResponseHandler(res:Response, query:GraphApiCall) {

    AppComponent.clearResponse();

    // common ops for successful and unsuccessful
    AppComponent.explorerValues.requestInProgress = false;

    AppComponent.lastApiCallHeaders = res.headers;

    let {status, headers} = res;
    query.duration = (new Date()).getTime() - query.requestSentAt.getTime();
    query.statusCode = status;
    AppComponent.addRequestToHistory(query);

    AppComponent.messageBarContent = {
      text: createTextSummary(query),
      backgroundClass: isSuccessful(query) ? "ms-MessageBar--success" : "ms-MessageBar--error",
      icon: isSuccessful(query) ? "ms-Icon--Completed" : "ms-Icon--ErrorBadge"
    }

    let dataPoints:any[] = [query.statusCode]

    let urlGraph = constructGraphLinksFromFullPath(query.requestUrl);
    if (urlGraph && urlGraph.length > 0) {
      let cleanedUrl = urlGraph.map((link) => link.type).join("/");
      dataPoints.push(cleanedUrl);
    } else {
      dataPoints.push("UnknownUrl");        
    }
    dataPoints.push(isAuthenticated() ? "authenticated" : "demo");

    if (typeof ga !== 'undefined') {
      ga('send', {
        hitType: 'event',
        eventCategory: 'GraphExplorer',
        eventAction: 'ExecuteQuery',
        eventLabel: dataPoints.join(",")
      });
    }

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