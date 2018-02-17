import { Injectable } from '@angular/core';
import { AppComponent } from "./app.component";
import { GraphApiCall } from "./base";
import { Response } from "@angular/http"
import { getRequestBodyEditor, getJsonViewer, getAceEditorFromElId } from "./api-explorer-jseditor";
import { checkHasValidAuthToken, isAuthenticated } from "./auth";
import { isImageResponse, insertHeadersIntoResponseViewer, handleHtmlResponse, handleXmlResponse, handleJsonResponse, showResults, handleTextResponse, getContentType } from "./response-handlers";
import { getString } from "./localization-helpers";
import { constructGraphLinksFromFullPath } from "./graph-structure";
import { GraphService } from "./graph-service";
import { createHeaders } from "./util";

@Injectable()
export class QueryRunnerService {

  constructor(private GraphService: GraphService) { }

  executeExplorerQuery(fromSample?: boolean) {

    // #hack.  When clicking on an autocomplete option, the model isn't updated
    if (fromSample !== true) {
      AppComponent.explorerValues.endpointUrl = $("#graph-request-url input").val();
    }

    let query: GraphApiCall = {
      requestUrl: AppComponent.explorerValues.endpointUrl,
      method: AppComponent.explorerValues.selectedOption,
      requestSentAt: new Date(),
      headers: AppComponent.explorerValues.headers,
      postBody: getRequestBodyEditor().getSession().getValue()
    };

    checkHasValidAuthToken();
    let graphRequest: Promise<Response>;
    if (isAuthenticated()) {
      graphRequest = this.GraphService.performQuery(query.method, query.requestUrl, query.postBody, createHeaders(query.headers));
    } else {
      graphRequest = this.GraphService.performAnonymousQuery(query.method, query.requestUrl, createHeaders(query.headers));
    }
    AppComponent.explorerValues.requestInProgress = true;

    graphRequest.then((res) => {
      try {
        this.handleSuccessfulQueryResponse(res, query)
      } catch (e) {
        console.error(e);
        AppComponent.messageBarContent = {
          text: getString(AppComponent.Options, 'explorer-error'),
          backgroundClass: "ms-MessageBar--error",
          icon: "ms-Icon--ErrorBadge"
        }
      }
    }).catch((res) => {
      this.handleUnsuccessfulQueryResponse(res, query);
    });
  }

  static clearResponse() {
    // clear response preview and headers
    getAceEditorFromElId("response-header-viewer").getSession().setValue("");
    getJsonViewer().getSession().setValue("")

    AppComponent.explorerValues.showImage = false;
    AppComponent.messageBarContent = null;
  }

  handleSuccessfulQueryResponse(res: Response, query: GraphApiCall) {
    this.commonResponseHandler(res, query);
    let { headers } = res;

    let resultBody = res.text();

    AppComponent.explorerValues.showImage = false;
    let contentType = getContentType(headers);

    if (isImageResponse(contentType)) {
      // For image responses don't insert the headers yet since we need
      // to turn around and make a second request to the Graph for the image
      this.fetchImage(query);
      return;
    }

    insertHeadersIntoResponseViewer(headers);
    switch (contentType) {
      case 'application/json': {
        handleJsonResponse(res.json());
        break;
      }

      case 'text/html':
      case 'application/xhtml+xml': {
        handleHtmlResponse(resultBody);
        break;
      }

      case 'application/xml': {
        handleXmlResponse(resultBody);
        break;
      }

      default: {
        handleTextResponse(resultBody);
      }
    }
  }

  fetchImage(query: GraphApiCall) {
    let fetchImagePromise: Promise<any>;
    if (isAuthenticated()) {
      fetchImagePromise = this.GraphService.performQuery("GET_BINARY", AppComponent.explorerValues.endpointUrl)
    } else {
      fetchImagePromise = this.GraphService.performAnonymousQuery("GET_BINARY", AppComponent.explorerValues.endpointUrl)
    }

    fetchImagePromise.then((result: any) => {
      let blob = new Blob([result.arrayBuffer()], { type: "image/jpeg" });
      let imageUrl = window.URL.createObjectURL(blob);

      const imageResultViewer = <HTMLImageElement>document.getElementById("responseImg");
      imageResultViewer.src = imageUrl;
      AppComponent.explorerValues.showImage = true;

      insertHeadersIntoResponseViewer(result.headers);
    }).catch((res) => { this.handleUnsuccessfulQueryResponse(res, query) });
  }

  handleUnsuccessfulQueryResponse(res: Response, query: GraphApiCall) {
    this.commonResponseHandler(res, query);
    insertHeadersIntoResponseViewer(res.headers);
    let errorText;

    try {
      errorText = res.json();
      handleJsonResponse(errorText);
      return;
    } catch (e) {
      errorText = res.text();
    }

    if (errorText.indexOf("<!DOCTYPE html>") !== -1) {
      handleHtmlResponse(errorText);
    } else {
      showResults(errorText, "text")
    }

  }

  commonResponseHandler(res: Response, query: GraphApiCall) {

    QueryRunnerService.clearResponse();

    // common ops for successful and unsuccessful
    AppComponent.explorerValues.requestInProgress = false;

    query.duration = (new Date()).getTime() - query.requestSentAt.getTime();
    query.statusCode = res.status;
    AppComponent.addRequestToHistory(query);

    AppComponent.messageBarContent = {
      text: this.createTextSummary(query),
      backgroundClass: this.isSuccessful(query) ? "ms-MessageBar--success" : "ms-MessageBar--error",
      icon: this.isSuccessful(query) ? "ms-Icon--Completed" : "ms-Icon--ErrorBadge"
    }

    // Telemetry data points.
    let dataPoints: any[] = [query.statusCode]

    let urlGraph = constructGraphLinksFromFullPath(query.requestUrl);
    if (urlGraph && urlGraph.length > 0) {
      let cleanedUrl = urlGraph.map((link) => link.type).join("/");
      dataPoints.push(cleanedUrl);
    } else {
      dataPoints.push("UnknownUrl");
    }
    dataPoints.push(isAuthenticated() ? "authenticated" : "demo");
  }

  createTextSummary(query: GraphApiCall) {
    let text = "";
    if (this.isSuccessful(query)) {
      text += getString(AppComponent.Options, "Success");
    } else {
      text += getString(AppComponent.Options, "Failure");
    }

    text += ` - ${getString(AppComponent.Options, "Status Code")} ${query.statusCode}, `


    text += `<span style="font-weight: 800; margin-left: 40px;">${query.duration}ms</span>`;

    if (query.statusCode === 401 || query.statusCode === 403) {
      text += `<span style="margin-left: 40px;">Looks like you may not have the permissions for this call. Please <a href="#" class="c-hyperlink" onclick="window.launchPermissionsDialog()" class="">modify your permissions</a>.</span>`
    }

    return text;
  }


  isSuccessful(query: GraphApiCall) {
    return query.statusCode >= 200 && query.statusCode < 300;
  }

}