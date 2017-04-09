import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ExplorerOptions, RequestType, ExplorerValues, HistoryRecord } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { initAuth, isAuthenticated } from "./auth";
import { AppModule } from "./app.module";
import { initFabricComponents } from "./fabric-components";
import { GraphService } from "./api-explorer-svc";
import { Response } from '@angular/http';
import { isImageResponse, isHtmlResponse, isXmlResponse } from "./response-handlers";
import { saveHistoryToLocalStorage, loadHistoryFromLocalStorage } from "./history";

declare let mwf:any;


@Component({
  selector: 'api-explorer',
  providers: [GraphService],
  template: `
    <div class="ms-Grid"> 
      <div class="ms-Grid-row">
        {{explorerValues.endpointUrl}}
        <sidebar class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4 ms-u-xl3 ms-u-xxl3 ms-u-xxxl2"></sidebar>
        <main-column class="ms-Grid-col ms-u-sm12 ms-u-md12  ms-u-lg8 ms-u-xl9 ms-u-xxl9 ms-u-xxxl10" id="explorer-main"></main-column>
    </div>
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

  constructor(private GraphService: GraphService, private chRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    for (let key in AppComponent.Options) {
      if (key in window)
        AppComponent.Options[key] = window[key]; 
    }

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
      authentication: {}
  };

  static requestHistory: HistoryRecord[] = loadHistoryFromLocalStorage();
  
  static addRequestToHistory(request:HistoryRecord) {
        AppComponent.requestHistory.splice(0, 0, request); //add history object to the array
        saveHistoryToLocalStorage(AppComponent.requestHistory);
  }

  static executeExplorerQuery(service:GraphService) {
    let query:HistoryRecord = {
        requestUrl: AppComponent.explorerValues.endpointUrl,
        method: AppComponent.explorerValues.selectedOption,
        requestSentAt: new Date()
    };


    if (query.method == 'POST' || query.method == 'PATCH') {
        // historyObj.requestBody = getRequestBodyEditor().getSession().getValue();
    }


    let graphRequest:Promise<Response>;
    debugger;
    if (isAuthenticated()) {
      graphRequest = service.performQuery(query.method, query.requestUrl);
    } else {
      graphRequest = service.performAnonymousQuery(query.method, query.requestUrl);
    }
    graphRequest.then((res) => {handleSuccessfulQueryResponse(res, query)}).catch((res) => {handleUnsuccessfulQueryResponse(res, query)});
  }

 }

function handleSuccessfulQueryResponse(res:Response, query:HistoryRecord) {
  let {status, headers, text} = res;
  query.duration = (new Date()).getTime() - query.requestSentAt.getTime();
  query.statusCode = status;
  AppComponent.addRequestToHistory(query);


  // if (isImageResponse(headers)) {
  //     handleImageResponse($scope, headers, status, handleUnsuccessfulQueryResponse);
  // } else if (isHtmlResponse(headers)) {
  //     handleHtmlResponse(resultBody, headers);
  // } else if (isXmlResponse(result)) {
  //     handleXmlResponse(resultBody, headers);
  // } else {
  //     handleJsonResponse(resultBody, headers);
  // }

}

function handleUnsuccessfulQueryResponse(res:Response, query:HistoryRecord) {
  let {status, headers, text} = res;
  query.duration = (new Date()).getTime() - query.requestSentAt.getTime();
  query.statusCode = status;
  AppComponent.addRequestToHistory(query);

}
