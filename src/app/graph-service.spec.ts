import { HttpModule } from '@angular/http';

import {
    inject,
    TestBed,
} from '@angular/core/testing';

import { GraphApiVersions } from './base';
import { GraphService } from './graph-service';

let graphService: GraphService;
describe('Metadata download and parsing', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [GraphService],
    });
  });

  // tslint:disable-next-line
  it('Creates an instance of the graph service', inject([GraphService], (_graphService: GraphService) => {
    graphService = _graphService;
  }));

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
