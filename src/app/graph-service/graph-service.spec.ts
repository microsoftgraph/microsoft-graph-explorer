import { ConnectionBackend, HttpModule } from '@angular/http';

import { TestBed } from '@angular/core/testing';

import { GraphApiVersions } from '../base';
import { GraphRequestInterceptor } from './graph-request-interceptor';
import { GraphService } from './graph-service';

describe('Metadata download and parsing', () => {
  let graphService: GraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [GraphService, GraphRequestInterceptor, ConnectionBackend],
    });

    graphService = TestBed.get(GraphService);
  });

  for (const version of GraphApiVersions) {
    it(`should download ${version} metadata`, (done) => {
      graphService.getMetadata('https://graph.microsoft.com', version).then(done);
    });
  }

  it('should error on downloading v5.x metadata', (done) => {
    graphService.getMetadata('https://graph.microsoft.com', '5.x').then(() => {
      done.fail('Downloaded invalid metadata');
    }).catch(done);
  });

  it('should download canary metadata', (done) => {
    graphService.getMetadata('https://canary.graph.microsoft.com', '1.0').then(() => {
      done.fail('Downloaded invalid metadata');
    }).catch(done);
  });
});
