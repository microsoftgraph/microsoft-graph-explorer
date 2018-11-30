// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

// tslint:disable-next-line
// gen-queries.spec.ts prepares non destructive sample queries and runs the tests.

import { Headers, HttpModule } from '@angular/http';

import {
  inject,
  TestBed,
} from '@angular/core/testing'; // tslint:disable-line

import { localLogout } from './authentication/auth';
import { GraphApiVersion, GraphApiVersions, IGraphRequestHeader, substituteTokens } from './base';
import { SampleQueries } from './gen-queries';
import { GraphService } from './graph-service/graph-service';

function getGraphVersionFromUrl(url: string): GraphApiVersion {
  for (const version of GraphApiVersions) {
    if (url.indexOf(`/${version}/`) !== -1) {
      return version;
    }
  }
}

// Convert from GraphRequestHeaders to Fetch API headers.
function convertHeaders(graphRequestHeaders: IGraphRequestHeader[]): Headers {
  const headers = new Headers();

  if (graphRequestHeaders) {
    for (let i = 0; i < graphRequestHeaders.length; ++i) { // tslint:disable-line
      headers.append(graphRequestHeaders[i].name, graphRequestHeaders[i].value);
    }
  }

  return headers;
}

let graphService: GraphService;
describe('Sample query validation', () => {

  beforeAll(() => {
    localLogout();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GraphService],
    });
  });

  it('Creates an instance of the graph service', inject([GraphService], (graphSvc: GraphService) => {
    graphService = graphSvc;
  }));

  for (const query of SampleQueries) {
    it(`${query.humanName}: Doc link should exist and match request version`, () => {
      if (!query.docLink) {
        throw new Error(`${query.humanName}: Doc link doesn't exist`);
      }

      const docLinkVersion = getGraphVersionFromUrl(query.docLink);
      const requestUrlVersion = getGraphVersionFromUrl(query.requestUrl);

      // Some doc links go to concept pages, not /version/doc page
      if (docLinkVersion && requestUrlVersion) {
        expect(docLinkVersion).toBe(requestUrlVersion);
      }
    });

    if (query.method !== 'GET') {
      continue;
    }
    if (query.skipTest) {
      continue;
    }
    substituteTokens(query);
    it(`GET query should execute: ${query.humanName}`, (done) => {
      substituteTokens(query);

      /**
       * Indicates whether we will skip the named query response length check.
       * @returns {Boolean} - A value of true indicates that the we should skip the response length check.
       */
      function skipResponseLengthCheck(): boolean {

        /*
         A list of query names from gen-queries.ts that we will skip.
         These are the names of samples where we expect to a get a response body
         that contains an empty JSON object.
         We are using this to skip the empty response check.
        */
        const skipQueryList = [
          'get recent user activities',
        ];

        skipQueryList.map((queryName) => {
          if (queryName === query.humanName) {
            return true;
          }
        });

        return false;
      }

      const headers = convertHeaders(query.headers);

      graphService.performAnonymousQuery(query.method, 'https://graph.microsoft.com' + query.requestUrl, headers)
        .then((res) => {
        if (res.headers.get('Content-Type').indexOf('application/json') !== -1) {
          const response = res.json();
          if (response && response.value && response.value.constructor === Array) {
            if (response.value.length === 0 && skipResponseLengthCheck()) {
              done.fail(`${query.humanName}: All sample GETs on collections must have values`);
            }
          }
        }
        done();
      }).catch((e: Response) => {
        done.fail(`${query.humanName}: Can't execute sample GET request, ${e.status}, ${JSON.stringify(e.json())}`);
      });
    });
  }
});
