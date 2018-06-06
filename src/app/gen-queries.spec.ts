// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

// gen-queries.spec.ts prepares non destructive sample queries and runs the tests.

import { HttpModule, Headers } from '@angular/http';

import {
  inject,
  TestBed
} from '@angular/core/testing';

import { GraphService } from './graph-service';
import { GraphApiVersion, substituteTokens, GraphApiVersions, GraphRequestHeader } from "./base";
import { SampleQueries } from "./gen-queries";
import { localLogout } from "./auth";

function getGraphVersionFromUrl(url: string): GraphApiVersion {
  for (let version of GraphApiVersions) {
    if (url.indexOf(`/${version}/`) !== -1) {
      return version;
    }
  }
}

// Convert from GraphRequestHeaders to Fetch API headers.
function convertHeaders(graphRequestHeaders: GraphRequestHeader[]): Headers {
  var headers = new Headers();

  if (graphRequestHeaders) {
    for (let i = 0; i < graphRequestHeaders.length; ++i) {
      headers.append(graphRequestHeaders[i].name, graphRequestHeaders[i].value);
    }
  }

  return headers;
}

let graphService: GraphService;
describe('Sample query validation', () => {

  beforeAll(() => {
    localLogout();
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GraphService]
    });
  });

  it('Creates an instance of the graph service', inject([GraphService], (_graphService: GraphService) => {
    graphService = _graphService;
  }));

  for (let query of SampleQueries) {
    it(`${query.humanName}: Doc link should exist and match request version`, function () {
      if (!query.docLink) {
        throw new Error(`${query.humanName}: Doc link doesn't exist`);
      }

      let docLinkVersion = getGraphVersionFromUrl(query.docLink);
      let requestUrlVersion = getGraphVersionFromUrl(query.requestUrl);

      // some doc links go to concept pages, not /version/doc page
      if (docLinkVersion && requestUrlVersion) {
        expect(docLinkVersion).toBe(requestUrlVersion);
      }
    });

    // it(`Doc link shouldn't contain a language for ${query.docLink}`, function() {
    //     if (!query.docLink) return;

    //     let hasLanguage = query.docLink.indexOf("en-us") !== -1;

    //     expect(hasLanguage).toBe(false);
    // })

    // XMLHttpRequest cannot load https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/planner_overview. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:9876' is therefore not allowed access.
    // it(`Doc link should be valid for ${query.requestUrl}`, function(done) {
    //     GraphService._http.get(query.docLink).toPromise().then(() => {
    //         done()
    //     });
    // });

    if (query.method !== "GET") {
      continue;
    }
    substituteTokens(query);
    it(`GET query should execute: ${query.humanName}`, function (done) {
      substituteTokens(query);

      /**
       * Indicates whether we will skip the named query response length check.
       * @returns {Boolean} - A value of true indicates that the we should skip the response length check.
       */
      function skipResponseLengthCheck(): Boolean {

        // A list of query names from gen-queries.ts that we will skip.
        // These are the names of samples where we expect to a get a response body
        // that contains an empty JSON object.
        // We are using this to skip the empty response check.
        let skipQueryList = [
          "get recent user activities"
        ];

        skipQueryList.map((queryName) => {
          if (queryName === query.humanName) {
            return true;
          }
        })

        return false;
      }

      var headers = convertHeaders(query.headers);

      graphService.performAnonymousQuery(query.method, 'https://graph.microsoft.com' + query.requestUrl, headers).then((res) => {
        if (res.headers.get('Content-Type').indexOf('application/json') !== -1) {
          let response = res.json();
          if (response && response.value && response.value.constructor === Array) {
            if (response.value.length === 0 && skipResponseLengthCheck()) {
              done.fail(`${query.humanName}: All sample GETs on collections must have values`)
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