// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from './app.component';
import { isAuthenticated as isAuthHelper } from './authentication/auth';
import { IGraphApiCall, IGraphRequestHeader, ISampleQuery, substituteTokens } from './base';
import { getString } from './localization-helpers';
import { QueryRunnerService } from './query-runner.service';

export class GraphExplorerComponent {

  public explorerValues = AppComponent.explorerValues;

  public getStr(label: string): string {
    return getString(AppComponent.Options, label) || '*****' + label;
  }

  public getAssetPath(relPath: string): string {
    return AppComponent.Options.PathToBuildDir + '/' + relPath;
  }

  // Used in sidebar and panel
  public getRequestHistory = (limit?: number): IGraphApiCall[] => {
    if (limit) {
      return AppComponent.requestHistory.slice(0, limit);
    }

    return AppComponent.requestHistory;
  }

  public isAuthenticated() {
    return isAuthHelper();
  }

  public loadQueryIntoEditor(originalQuery: IGraphApiCall) {
    // Prevent logged out users from POSTing/others
    if (!this.isAuthenticated() && originalQuery.method !== 'GET') {
      return;
    }

    QueryRunnerService.clearResponse();

    // Copy the sample query or history item so we're not changing history/samples
    const query: ISampleQuery = jQuery.extend(true, {}, originalQuery);
    substituteTokens(query);

    // Set the endpoint url. if it's a relative path, add the configured graph URL
    AppComponent.explorerValues.endpointUrl = query.requestUrl.startsWith('https://') ? query.requestUrl :
      AppComponent.Options.GraphUrl + query.requestUrl;
    AppComponent.explorerValues.selectedOption = query.method;

    if (query.headers) { // tslint:disable-line
      AppComponent.explorerValues.headers = query.headers;
    } else {
      AppComponent.explorerValues.headers = [];
    }

    this.shouldEndWithOneEmptyHeader();

    AppComponent.explorerValues.postBody = '';
    if (query.postBody) {
      const rawPostBody = query.postBody;
      let formattedPostBody;
      try {
        formattedPostBody = JSON.stringify(JSON.parse(rawPostBody), null, 2);
      } catch (e) {
        throw (e);
      }
      AppComponent.explorerValues.postBody = formattedPostBody || rawPostBody;
      (window as any).bodyEditor.setValue(AppComponent.explorerValues.postBody);
    }
  }
  public shouldEndWithOneEmptyHeader() {
    const lastHeader = this.getLastHeader();
    if (lastHeader && lastHeader.name === '' && lastHeader.value === '') {
      return;
    } else {
      this.addEmptyHeader();
    }
  }

  public addEmptyHeader() {
    AppComponent.explorerValues.headers.push({
      name: '',
      value: '',
    });
  }

  public getLastHeader(): IGraphRequestHeader {
    return this.explorerValues.headers[this.explorerValues.headers.length - 1];
  }

}
