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
        if (url.indexOf(`/${version}/`) != -1) {
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
    it(`Doc link should exist and match request version for ${query.requestUrl}`, function() {
        if (!query.docLink) throw new Error(`Doc link doesn't exist for ${query.requestUrl}`);

        let docLinkVersion = getGraphVersionFromUrl(query.docLink);
        let requestUrlVersion = getGraphVersionFromUrl(query.requestUrl);

        // some doc links go to concept pages, not /version/doc page
        if (docLinkVersion && requestUrlVersion)
            expect(docLinkVersion).toBe(requestUrlVersion);
    })

    // XMLHttpRequest cannot load https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/planner_overview. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:9876' is therefore not allowed access.
    // it(`Doc link should be valid for ${query.requestUrl}`, function(done) {
    //     GraphService._http.get(query.docLink).toPromise().then(() => {
    //         done()
    //     });
    // })



    if (query.method != "GET") continue;
    substitueTokens(query);
    it(`Sample GET query should execute: ${query.requestUrl}`, function(done) {
      graphService.performAnonymousQuery(query.method, query.requestUrl).then(() => {
        done();
      }).catch((e) => {
        throw new Error(`Can't execute sample GET request for ${query.requestUrl}`);
      });
    });
  }

});