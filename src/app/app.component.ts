// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { refreshAceEditorsContent } from './ace-utils';
import { initAuth, localLogout } from './authentication/auth';
import {
  GraphApiVersion, GraphApiVersions, IExplorerOptions, IExplorerValues, IGraphApiCall, IMessage,
  IMessageBarContent, RequestType,
} from './base';
import { initFabricComponents } from './fabric-components';
import { GenericDialogComponent } from './generic-message-dialog.component';
import { GraphService } from './graph-service';
import { parseMetadata } from './graph-structure';
import { GraphExplorerComponent } from './GraphExplorerComponent';
import { loadHistoryFromLocalStorage, saveHistoryToLocalStorage } from './history/history';
import { getGraphUrl, getParameterByName } from './util';

declare let mwfAutoInit;
declare let moment;

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
`],
})
export class AppComponent extends GraphExplorerComponent implements OnInit, AfterViewInit {

  public static messageBarContent: IMessageBarContent;
  public static _changeDetectionRef: ChangeDetectorRef; // tslint:disable-line
  public static message: IMessage;

  public static Options: IExplorerOptions = {
    ClientId: '',
    Language: 'en-US',
    DefaultUserScopes: 'openid profile User.ReadWrite User.ReadBasic.All Sites.ReadWrite.All Contacts.ReadWrite ' +
    'People.Read Notes.ReadWrite.All Tasks.ReadWrite Mail.ReadWrite Files.ReadWrite.All Calendars.ReadWrite',
    AuthUrl: 'https://login.microsoftonline.com',
    GraphVersions: GraphApiVersions,
    PathToBuildDir: '',
  };

  public static explorerValues: IExplorerValues = {
    selectedOption: getParameterByName('method') as RequestType || 'GET',
    selectedVersion: getParameterByName('version') as GraphApiVersion || 'v1.0',
    authentication: {
      user: {},
    },
    showImage: false,
    requestInProgress: false,
    headers: [],
    postBody: '',
  };

  public static requestHistory: IGraphApiCall[] = loadHistoryFromLocalStorage();

  public static addRequestToHistory(request: IGraphApiCall) {
    AppComponent.requestHistory.splice(0, 0, request); // Add history object to the array
    saveHistoryToLocalStorage(AppComponent.requestHistory);
  }

  public static removeRequestFromHistory(request: IGraphApiCall) {
    const idx = AppComponent.requestHistory.indexOf(request);

    if (idx > -1) {
      AppComponent.requestHistory.splice(idx, 1);
    } else {
      return;
    }
    saveHistoryToLocalStorage(AppComponent.requestHistory);
  }

  public static setMessage(message: IMessage) {
    AppComponent.message = message;
    setTimeout(() => { GenericDialogComponent.showDialog(); });
  }

  constructor(private GraphService: GraphService, private chRef: ChangeDetectorRef) { // tslint:disable-line
    super();
    AppComponent._changeDetectionRef = chRef;
  }

  public ngAfterViewInit(): void {
    // When clicking on a pivot (request headers/body or response headers/body), notify ACE to update content
    if (typeof $ !== 'undefined') {
      $('api-explorer .ms-Pivot-link').on('click', () => {
        setTimeout(refreshAceEditorsContent, 0);
      });
    }

    parseMetadata(this.GraphService, 'v1.0');
    parseMetadata(this.GraphService, 'beta');
  }

  public getLocalisedString(message: string): string {
    const g = new GraphExplorerComponent();
    return g.getStr(message);
  }

  public ngOnInit() {
    for (const key in AppComponent.Options) {
      if (key in window) {
        AppComponent.Options[key] = window[key];
      }
    }

    const hash = location.hash.substr(1);
    if (hash.includes('mode')) {
      const mode = 'canary';
      localStorage.setItem('GRAPH_MODE', JSON.stringify(mode));
      localStorage.setItem('GRAPH_URL', 'https://canary.graph.microsoft.com');
      localLogout();
    }

    AppComponent.Options.GraphVersions.push('Other');

    initAuth(AppComponent.Options, this.GraphService, this.chRef);

    initFabricComponents();

    mwfAutoInit.ComponentFactory.create([{
      component: mwfAutoInit.Drawer,
    }]);

    moment.locale(AppComponent.Options.Language);

    // Set explorer state that depends on configuration
    AppComponent.explorerValues.endpointUrl = getGraphUrl()
      + `/${(getParameterByName('version') || 'v1.0')}/${getParameterByName('request') || 'me/'}`;

    // Show the Microsoft Graph TOU when we load GE.
    AppComponent.messageBarContent = {
      // tslint:disable
      text: this.getLocalisedString('use the Microsoft Graph API') + `
        <br><br><a class='link' href='https://docs.microsoft.com/${AppComponent.Options.Language}/legal/microsoft-apis/terms-of-use?context=graph/context\' ' +
        target='_blank'>${this.getLocalisedString('Terms of use')}</a><br>
        <a class='link' href='https://privacy.microsoft.com/${AppComponent.Options.Language}/privacystatement'
         target=_blank>${this.getLocalisedString('Microsoft Privacy Statement')}</a>.
      `,
      // tslint:enable
      backgroundClass: 'ms-MessageBar--warning',
      icon: 'none',
    };
  }
}
