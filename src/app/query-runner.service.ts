import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AppComponent } from './app.component';
import { checkHasValidAuthToken, isAuthenticated } from './authentication/auth';
import { IGraphApiCall } from './base';
import { GraphService } from './graph-service';
import { constructGraphLinksFromFullPath } from './graph-structure';
import { generateHar } from './history/har/harUtil';
import { getString } from './localization-helpers';
import {
  getContentType, handleHtmlResponse, handleJsonResponse, handleTextResponse, handleXmlResponse,
  insertHeadersIntoResponseViewer, isImageResponse, showResults,
} from './response-handlers';
import { createHeaders } from './util';

@Injectable()
export class QueryRunnerService {

  public static clearResponse(clearAllViewers?: boolean) {
    // Clear response preview and headers
    if (clearAllViewers) {
      (window as any).bodyEditor.setValue('');
    }
    (window as any).headersViewer.setValue('');
    (window as any).resultsViewer.setValue('');
    AppComponent.explorerValues.showImage = false;
    AppComponent.messageBarContent = null;
  }

  constructor(private GraphService: GraphService) { } // tslint:disable-line

  public executeExplorerQuery(fromSample?: boolean) {

    // #hack.  When clicking on an autocomplete option, the model isn't updated
    if (fromSample !== true) {
      AppComponent.explorerValues.endpointUrl = $('#graph-request-url input').val();
    }

    let postBodyValue = '';
    if (AppComponent.explorerValues.selectedOption !== 'GET') {
      postBodyValue = (window as any).bodyEditor.getValue();
    }

    const query: IGraphApiCall = {
      requestUrl: AppComponent.explorerValues.endpointUrl,
      method: AppComponent.explorerValues.selectedOption,
      requestSentAt: new Date(),
      headers: AppComponent.explorerValues.headers,
      postBody: postBodyValue,
    };

    checkHasValidAuthToken();
    let graphRequest: Promise<Response>;
    if (isAuthenticated()) {
      graphRequest = this.GraphService.performQuery(query.method, query.requestUrl, query.postBody,
        createHeaders(query.headers));
    } else {
      graphRequest = this.GraphService.performAnonymousQuery(query.method, query.requestUrl,
        createHeaders(query.headers));
    }
    AppComponent.explorerValues.requestInProgress = true;

    graphRequest.then((res) => {
      try {
        this.handleSuccessfulQueryResponse(res, query);
      } catch (e) {
        AppComponent.messageBarContent = {
          text: getString(AppComponent.Options, 'explorer-error'),
          backgroundClass: 'ms-MessageBar--error',
          icon: 'ms-Icon--ErrorBadge',
        };
      }
    }).catch((res) => {
      this.handleUnsuccessfulQueryResponse(res, query);
    });
  }

  public handleSuccessfulQueryResponse(res: Response, query: IGraphApiCall) {
    this.commonResponseHandler(res, query);
    const { headers } = res;

    const resultBody = res.text();

    AppComponent.explorerValues.showImage = false;
    const contentType = getContentType(headers);

    if (isImageResponse(contentType)) {
      /*
       For image responses don't insert the headers yet since we need
       to turn around and make a second request to the Graph for the image
      */
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

  public fetchImage(query: IGraphApiCall) {
    let fetchImagePromise: Promise<any>;
    if (isAuthenticated()) {
      fetchImagePromise = this.GraphService
        .performQuery('GET_BINARY', AppComponent.explorerValues.endpointUrl);
    } else {
      fetchImagePromise = this.GraphService
        .performAnonymousQuery('GET_BINARY', AppComponent.explorerValues.endpointUrl);
    }

    fetchImagePromise.then((result: any) => {
      const blob = new Blob([result.arrayBuffer()], { type: 'image/jpeg' });
      const imageUrl = window.URL.createObjectURL(blob);

      const imageResultViewer = document.getElementById('responseImg') as HTMLImageElement;
      imageResultViewer.src = imageUrl;
      AppComponent.explorerValues.showImage = true;

      insertHeadersIntoResponseViewer(result.headers);
    }).catch((res) => { this.handleUnsuccessfulQueryResponse(res, query); });
  }

  public handleUnsuccessfulQueryResponse(res: Response, query: IGraphApiCall) {
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

    if (errorText.indexOf('<!DOCTYPE html>') !== -1) {
      handleHtmlResponse(errorText);
    } else {
      showResults(errorText, 'text');
    }

  }

  public commonResponseHandler(res: Response, query: IGraphApiCall) {
    QueryRunnerService.clearResponse();

    // Common ops for successful and unsuccessful
    AppComponent.explorerValues.requestInProgress = false;

    query.duration = (new Date()).getTime() - query.requestSentAt.getTime();
    query.statusCode = res.status;

    AppComponent.messageBarContent = {
      text: this.createTextSummary(query),
      backgroundClass: this.isSuccessful(query) ? 'ms-MessageBar--success' : 'ms-MessageBar--error',
      icon: this.isSuccessful(query) ? 'ms-Icon--Completed' : 'ms-Icon--ErrorBadge',
    };

    // Telemetry data points.
    const dataPoints: any[] = [query.statusCode];

    const urlGraph = constructGraphLinksFromFullPath(query.requestUrl);
    if (urlGraph && urlGraph.length > 0) {
      const cleanedUrl = urlGraph.map((link) => link.type).join('/');
      dataPoints.push(cleanedUrl);
    } else {
      dataPoints.push('UnknownUrl');
    }
    dataPoints.push(isAuthenticated() ? 'authenticated' : 'demo');

    const harPayload = this.createHarPayload(query, res);
    const har = JSON.stringify(generateHar(harPayload));

    const historyItem = { ...query, har };
    AppComponent.addRequestToHistory(historyItem);
  }

  public createTextSummary(query: IGraphApiCall) {
    let text = '';
    if (this.isSuccessful(query)) {
      text += getString(AppComponent.Options, 'Success');
    } else {
      text += getString(AppComponent.Options, 'Failure');
    }

    text += ` - ${getString(AppComponent.Options, 'Status Code')} ${query.statusCode}, `;

    text += `<span style="font-weight: 800; margin-left: 40px;">${query.duration}ms</span>`;

    if (query.statusCode === 401 || query.statusCode === 403) {
      text += `
      <span style="margin-left: 40px;">Looks like you may not have the permissions for this call. Please
      <a href="#" class="c-hyperlink" onclick="window.launchPermissionsDialog()" class="">modify your permissions</a>.
      </span>`;
    }

    return text;
  }

  public isSuccessful(query: IGraphApiCall) {
    return query.statusCode >= 200 && query.statusCode < 300;
  }

  private createHarPayload(query: IGraphApiCall, res: Response) {
    let harPayload = {
      startedDateTime: query.requestSentAt.toString(),
      time: query.duration,
      method: query.method,
      url: query.requestUrl,
      cookies: [],
      queryString: [{ name: '', value: '' }],
      status: query.statusCode,
      statusText: res.statusText,
      content: {
        text: res.text(),
        size: res.text().length,
        mimeType: 'application/json',
      },
      request: {
        headers: query.headers,
      },
      response: {
        headers: res.headers.keys().reduce((acc: any, key: string) => {
          const header = { name: key, value: res.headers.get(key) };
          return [...acc, header];
        }, []),
      },
      sendTime: 0,
      waitTime: 0,
      receiveTime: 0,
      httpVersion: 'HTTP/1.1',
    };

    if (query.postBody) {
      harPayload = Object.assign(harPayload, { //tslint:disable-line
        postData: {
          mimeType: 'application/json',
          text: query.postBody,
        },
      });
    }
    return harPayload;
  }
}
