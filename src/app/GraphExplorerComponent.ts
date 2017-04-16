// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { getString } from "./api-explorer-helpers";
import { AppComponent } from "./app.component";
import { isAuthenticated } from "./auth";
import { ExplorerValues, GraphApiCall, SampleQuery } from "./base";
import { getRequestBodyEditor } from "./api-explorer-jseditor";
import { RequestEditorsComponent } from "./request-editors.component";



export class GraphExplorerComponent {

  explorerValues = AppComponent.explorerValues;

  getStr(label:string):string {
    return getString(AppComponent.Options, label);
  }

  getAssetPath(relPath:string):string {
    return AppComponent.Options.PathToBuildDir + "/" + relPath;
  }

  isAuthenticated = () => {
    return isAuthenticated();
  }

  // used in sidebar and panel
  getRequestHistory = (limit?:number):GraphApiCall[] => {
      if (limit) return AppComponent.requestHistory.slice(0, limit);

      return AppComponent.requestHistory;
  }
  
  loadQueryIntoEditor(originalQuery:GraphApiCall) {
    // prevent logged out users from POSTing/others
    if (!isAuthenticated() && originalQuery.method != 'GET') {
      return;
    }
      // copy the sample query or history item so we're not changing history/samples
      let query:SampleQuery = jQuery.extend(true, {}, originalQuery);

      AppComponent.explorerValues.endpointUrl = query.requestUrl;
      AppComponent.explorerValues.selectedOption = query.method;
      
      if (query.headers) {
        AppComponent.explorerValues.headers = query.headers;
      } else {
        AppComponent.explorerValues.headers = []
        AppComponent.explorerValues.headers.push({
            name: "",
            value: ""
        });

      }
      // @todo call RequestEditorsComponent.addEmptyHeader()
      AppComponent.explorerValues.headers.push({
          name: "",
          value: ""
      });

      AppComponent.explorerValues.postBody = "";
      let postBodyEditorSession = getRequestBodyEditor().getSession();
      if (query.postBodyTemplateName) {
        AppComponent.explorerValues.postBody = JSON.stringify(query.postBodyTemplateContents, null, 4);
      }

      postBodyEditorSession.setValue(AppComponent.explorerValues.postBody);

  }
}