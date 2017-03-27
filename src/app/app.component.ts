import { Component, OnInit, Input } from '@angular/core';
import { ExplorerOptions, RequestType, ExplorerValues } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { initAuth } from "./auth";
import { AppModule } from "./app.module";
import { initFabricComponents } from "./fabric-components";
import { GraphService } from "./api-explorer-svc";

declare let mwf:any;


@Component({
  selector: 'api-explorer',
  providers: [GraphService],
  template: `
    <div class="ms-Grid"> 
      <div class="ms-Grid-row">
        <sidebar class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4 ms-u-xl3 ms-u-xxl3 ms-u-xxxl2"></sidebar>
      </div>
    </div>
    `,
  styles: [`
    
    
`]
})
export class AppComponent extends GraphExplorerComponent implements OnInit {

  constructor(private GraphService: GraphService) {
    super();
  }

  ngOnInit() {
    for (let key in AppComponent.options) {
      if (key in window)
        AppComponent.options[key] = window[key]; 
    }
    
    initAuth(AppComponent.options);

    initFabricComponents();

    mwf.ComponentFactory.create([{
        'component': mwf.Drawer,
    }])

  }

  static options: ExplorerOptions = {
      ClientId: "",
      Language: "en-US",
      AdminScopes: "User.ReadWrite.All Group.ReadWrite.All Directory.ReadWrite.All Directory.AccessAsUser.All IdentityRiskEvent.Read.All",
      UserScopes: "openid profile User.Read User.ReadWrite User.ReadBasic.All Mail.ReadWrite Mail.Send Mail.Send.Shared Calendars.ReadWrite Calendars.ReadWrite.Shared Contacts.ReadWrite MailboxSettings.ReadWrite Files.ReadWrite Files.ReadWrite.All Files.ReadWrite.AppFolder Notes.Create Notes.ReadWrite.All People.Read Sites.ReadWrite.All Tasks.ReadWrite",
      AuthUrl: "https://login.microsoftonline.com",
      GraphUrl: "https://graph.microsoft.com",
      GraphVersions: ["v1.0", "beta"]
  };

  static explorerValues:ExplorerValues = {
    endpointUrl: AppComponent.options.GraphUrl + '/v1.0/me/',
    selectedOption: "GET",
    selectedVersion: "v1.0"
  };
 }