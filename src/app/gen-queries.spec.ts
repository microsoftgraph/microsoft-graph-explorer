import { HttpModule } from '@angular/http';

import {
    inject,
    TestBed
} from '@angular/core/testing';

import { GraphService } from './graph-service';
import { GraphApiVersion, substitueTokens, GraphApiVersions } from "./base";
import { SampleQueries } from "./gen-queries";

function getGraphVersionFromUrl(url:string):GraphApiVersion {
    for (let version of GraphApiVersions) {
        if (url.indexOf(`/${version}/`) !== -1) {
            return version;
        }
    }
}

let graphService:GraphService;
describe('Sample query validation', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [GraphService]
    });
  });

  it('Creates an instance of the graph service', inject([GraphService], (_graphService:GraphService) => {
    graphService = _graphService;
  }));

  for (let query of SampleQueries) {
    it(`${query.humanName}: Doc link should exist and match request version`, function() {
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
    substitueTokens(query);
    it(`GET query should execute: ${query.humanName}`, function(done) {
      graphService.performAnonymousQuery(query.method, query.requestUrl).then((res) => {
        if (res.headers.get('Content-Type').indexOf('application/json') !== -1) {
          let response = res.json();
          if (response && response.value && response.value.constructor === Array) {
            if (response.value.length === 0) {
              done.fail(`${query.humanName}: All sample GETs on collections must have values`)
            }
          }
        }
        done();
      }).catch((e:Response) => {
        done.fail(`${query.humanName}: Can't execute sample GET request, ${e.status}, ${JSON.stringify(e.json())}`);
      });
    });
  }
});