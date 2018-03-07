import { HttpModule } from '@angular/http';

import {
    inject,
    TestBed
} from '@angular/core/testing';

import { GraphService } from './graph-service';
import { GraphApiVersions } from "./base";

let graphService:GraphService;
describe('Metadata download and parsing', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [GraphService]
    });
  });

  it('Creates an instance of the graph service', inject([GraphService], (_graphService:GraphService) => {
    graphService = _graphService;
  }));

  for (let version of GraphApiVersions) {
    it(`should download ${version} metadata`, function(done) {
      graphService.getMetadata("https://graph.microsoft.com", version).then(done);
    });
  }

  it('should error on downloading v5.x metadata', function(done) {
    graphService.getMetadata("https://graph.microsoft.com", "5.x").then(() => {
      done.fail("Downloaded invalid metadata")
    }).catch(done);
  });

  it('should download canary metadata', function(done) {
    graphService.getMetadata("https://canary.graph.microsoft.com", "1.0").then(() => {
      done.fail("Downloaded invalid metadata")
    }).catch(done);
  });
});