// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { initAuth } from './authentication/auth';
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
import { getGraphUrl,  getParameterByName  } from './util';

declare let mwf;
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
        GraphUrl: getParameterByName('GraphUrl') || getGraphUrl(),
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

    constructor(private GraphService: GraphService, private chRef: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { // tslint:disable-line
        super();
        AppComponent._changeDetectionRef = chRef;
    }

    public ngAfterViewInit(): void {
        parseMetadata(this.GraphService, 'v1.0');
        parseMetadata(this.GraphService, 'beta');
    }

    public ngOnInit() {
        for (const key in AppComponent.Options) {
            if (key in window) {
                AppComponent.Options[key] = window[key];
            }
        }

        this.activatedRoute.queryParams.subscribe((params) => {
            const mode = params.mode;
            if (mode) {
                localStorage.setItem('GRAPH_MODE', JSON.stringify(mode));
                localStorage.setItem('GRAPH_URL', 'https://canary.graph.microsoft.com/');
            }
        });

        AppComponent.Options.GraphVersions.push('Other');

        initAuth(AppComponent.Options, this.GraphService, this.chRef);

        initFabricComponents();

        mwf.ComponentFactory.create([{
            component: mwf.Drawer,
        }]);

        moment.locale(AppComponent.Options.Language);

        // Set explorer state that depends on configuration
        AppComponent.explorerValues.endpointUrl = AppComponent.Options
            .GraphUrl + `/${(getParameterByName('version') || 'v1.0')}/${getParameterByName('request') || 'me/'}`;

        // Show the Microsoft Graph TOU when we load GE.
        AppComponent.messageBarContent = {
            text: 'When you use the Microsoft Graph API, you agree to the <a href=\'https://aka.ms/msgraphtou\' ' +
                'target=\'_blank\'>Microsoft Graph Terms of Use</a> and the ' +
                '<a href=\'https://go.microsoft.com/fwlink/?LinkId=521839\'' +
                ' target=\'_blank\'>Microsoft Privacy Statement</a>.',
            backgroundClass: 'ms-MessageBar--warning',
            icon: 'none',
        };
    }
}
