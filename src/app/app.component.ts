import { Component, OnInit, Input, ChangeDetectorRef, DoCheck } from '@angular/core';
import { ExplorerOptions, RequestType, ExplorerValues, HistoryRecord, GraphApiCall } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { initAuth, isAuthenticated } from "./auth";
import { AppModule } from "./app.module";
import { initFabricComponents } from "./fabric-components";
import { GraphService } from "./api-explorer-svc";
import { Response } from '@angular/http';
import { isImageResponse, isHtmlResponse, isXmlResponse, handleHtmlResponse, handleXmlResponse, handleJsonResponse, handleImageResponse } from "./response-handlers";
import { saveHistoryToLocalStorage, loadHistoryFromLocalStorage } from "./history";

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
    `,
  styles: [`
    
  #explorer-main {
      padding-left: 15px;
  }
  
  sidebar {
      padding: 0px;
  }

    
`]
})
export class AppComponent extends GraphExplorerComponent implements OnInit {

  static svc:GraphService;
  static lastApiCall:GraphApiCall;


  constructor(private GraphService: GraphService, private chRef: ChangeDetectorRef) {
    super();
    AppComponent.svc = GraphService;
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

  }
  

  static Options: ExplorerOptions = {
      ClientId: "",
      Language: "en-US",
      AdminScopes: "User.ReadWrite.All Group.ReadWrite.All Directory.ReadWrite.All Directory.AccessAsUser.All IdentityRiskEvent.Read.All",
      UserScopes: "openid profile User.Read User.ReadWrite User.ReadBasic.All Mail.ReadWrite Mail.Send Mail.Send.Shared Calendars.ReadWrite Calendars.ReadWrite.Shared Contacts.ReadWrite MailboxSettings.ReadWrite Files.ReadWrite Files.ReadWrite.All Files.ReadWrite.AppFolder Notes.Create Notes.ReadWrite.All People.Read Sites.ReadWrite.All Tasks.ReadWrite",
      AuthUrl: "https://login.microsoftonline.com",
      GraphUrl: "https://graph.microsoft.com",
      GraphVersions: ["v1.0", "beta"],
  };

  static explorerValues:ExplorerValues = {
      endpointUrl: AppComponent.Options.GraphUrl + '/v1.0/me/',
      selectedOption: "GET",
      selectedVersion: "v1.0",
      authentication: {},
      showImage: false,
      requestInProgress: false
  };

  static requestHistory: HistoryRecord[] = loadHistoryFromLocalStorage();
  
  static addRequestToHistory(request:HistoryRecord) {
      AppComponent.requestHistory.splice(0, 0, request); //add history object to the array
      saveHistoryToLocalStorage(AppComponent.requestHistory);
  }

  static removeRequestFromHistory(request:HistoryRecord) {
      const idx = AppComponent.requestHistory.indexOf(request);

      if (idx > -1) {
        AppComponent.requestHistory.splice(idx, 1);
      } else {
        console.error("Trying to remove history item that doesn't exist")
      }
      saveHistoryToLocalStorage(AppComponent.requestHistory);
  }

  static executeExplorerQuery() {
    let query:HistoryRecord = {
        requestUrl: AppComponent.explorerValues.endpointUrl,
        method: AppComponent.explorerValues.selectedOption,
        requestSentAt: new Date()
    };


    if (query.method == 'POST' || query.method == 'PATCH') {
        // historyObj.requestBody = getRequestBodyEditor().getSession().getValue();
    }


    let graphRequest:Promise<Response>;
    if (isAuthenticated()) {
      graphRequest = AppComponent.svc.performQuery(query.method, query.requestUrl);
    } else {
      graphRequest = AppComponent.svc.performAnonymousQuery(query.method, query.requestUrl);
    }
    this.explorerValues.requestInProgress = true;

    graphRequest.then((res) => {handleSuccessfulQueryResponse(res, query)}).catch((res) => {handleUnsuccessfulQueryResponse(res, query)});
  }


  
 }
function handleSuccessfulQueryResponse(res:Response, query:HistoryRecord) {
  AppComponent.explorerValues.requestInProgress = false;
  AppComponent.lastApiCall = query;

  let {status, headers} = res;
  query.duration = (new Date()).getTime() - query.requestSentAt.getTime();
  query.statusCode = status;
  AppComponent.addRequestToHistory(query);

  let resultBody = res.text();

  AppComponent.explorerValues.showImage = false;
  if (isImageResponse(headers)) {
    let method = isAuthenticated() ? AppComponent.svc.performQuery : AppComponent.svc.performAnonymousQuery;;
    handleImageResponse(method, headers, status, handleUnsuccessfulQueryResponse);
  } else if (isHtmlResponse(headers)) {
    handleHtmlResponse(resultBody, headers);
  } else if (isXmlResponse(resultBody)) {
    handleXmlResponse(resultBody, headers);
  } else {
    handleJsonResponse(res.json(), headers);
  }
}

function handleUnsuccessfulQueryResponse(res:Response, query:HistoryRecord) {
  AppComponent.explorerValues.requestInProgress = false;
  AppComponent.lastApiCall = query;

  let {status, headers, text} = res;
  query.duration = (new Date()).getTime() - query.requestSentAt.getTime();
  query.statusCode = status;
  AppComponent.addRequestToHistory(query);

  handleJsonResponse(res.json(), headers);
}