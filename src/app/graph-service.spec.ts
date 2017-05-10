import { HttpModule } from '@angular/http';

import {
    inject,
    TestBed
} from '@angular/core/testing';

import { GraphService } from './graph-service';

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

  it('should download beta metadata', function(done) {
    graphService.getMetadata("https://graph.microsoft.com", "beta").then(() => {
      done();
    });
  });

  it('should download v1.0 metadata', function(done) {
    graphService.getMetadata("https://graph.microsoft.com", "v1.0").then(() => {
      done();
    });
  });

  it('should error on downloading v5.x metadata', function(done) {
    graphService.getMetadata("https://graph.microsoft.com", "5.x").then(() => {
      throw new Error("Downloaded invalid metadata")
    }).catch(() => {
      done();
    });
  });
});