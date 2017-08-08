// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { getString } from "./localization-helpers";
import { AppComponent } from "./app.component";
import { GraphApiCall, SampleQuery, GraphRequestHeader, substituteTokens } from "./base";
import { getRequestBodyEditor } from "./api-explorer-jseditor";
import { isAuthenticated as isAuthHelper } from "./auth";
import { QueryRunnerService } from "./query-runner.service";

export class GraphExplorerComponent {

  explorerValues = AppComponent.explorerValues;

  getStr(label:string):string {
    return getString(AppComponent.Options, label) || "*****" + label ;
  }

  getAssetPath(relPath:string):string {
    return AppComponent.Options.PathToBuildDir + "/" + relPath;
  }

  // used in sidebar and panel
  getRequestHistory = (limit?:number):GraphApiCall[] => {
      if (limit) {
        return AppComponent.requestHistory.slice(0, limit);
      }

      return AppComponent.requestHistory;
  }

  isAuthenticated() {
    return isAuthHelper();
  }
  
  loadQueryIntoEditor(originalQuery:GraphApiCall) {
    // prevent logged out users from POSTing/others
    if (!this.isAuthenticated() && originalQuery.method !== 'GET') {
      return;
    }

    QueryRunnerService.clearResponse();


      // copy the sample query or history item so we're not changing history/samples
      let query:SampleQuery = jQuery.extend(true, {}, originalQuery);
      substituteTokens(query);
    
      // set the endpoint url. if it's a relative path, add the configured graph URL
      AppComponent.explorerValues.endpointUrl = query.requestUrl.startsWith("https://") ? query.requestUrl : AppComponent.Options.GraphUrl + query.requestUrl;
      AppComponent.explorerValues.selectedOption = query.method;

      if (query.headers) {
        AppComponent.explorerValues.headers = query.headers;
      } else {
        AppComponent.explorerValues.headers = []
      }

      this.shouldEndWithOneEmptyHeader();

      AppComponent.explorerValues.postBody = "";
      let postBodyEditorSession = getRequestBodyEditor().getSession();
      if (query.postBody) {

        let rawPostBody = query.postBody;

        // try to format the post body

        let formattedPostBody;
        try {
          formattedPostBody = JSON.stringify(JSON.parse(rawPostBody), null, 2);
        } catch (e) {
          console.log("Can't format JSON post body");
        }

        AppComponent.explorerValues.postBody = formattedPostBody || rawPostBody;
      }

      postBodyEditorSession.setValue(AppComponent.explorerValues.postBody);


  }
  shouldEndWithOneEmptyHeader() {
    let lastHeader = this.getLastHeader();
    if (lastHeader && lastHeader.name === "" && lastHeader.value === "") {
      return;
    } else {
      this.addEmptyHeader();
    }
  }

  addEmptyHeader() {
      AppComponent.explorerValues.headers.push({
          name: "",
          value: ""
      })
  }

  getLastHeader():GraphRequestHeader {
      return this.explorerValues.headers[this.explorerValues.headers.length - 1]
  }

}