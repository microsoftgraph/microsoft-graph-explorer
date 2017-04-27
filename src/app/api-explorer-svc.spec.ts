import { Http, HttpModule } from '@angular/http';

import {
    inject,
    TestBed
} from '@angular/core/testing';

import { GraphService } from './api-explorer-svc';

describe('Metadata download and parsing', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [GraphService]
    });
  });

  it('should download v1.0 metadata', inject([GraphService], (graphService:GraphService, done) => {
    setTimeout(() => {
        expect(true).toBe(false);
        done();
      }, 500)
        // graphService.getMetadata("https://graph.microsoft.com", "v5.0").then((res) => {
        //     expect(res.status).toBe(200);
        //     done()
        // }).catch((e) => {
        //     expect(e).toBeNull();
        //     done()
        // });
  }));
    // it('should download beta metadata', function() {
    // return graphService.getMetadata("https://graph.microsoft.com", "beta");
    // });
    // it('should error on downloading v5.x metadata', function() {
    // return new Promise((resolve, reject) => {
    //     return graphService.getMetadata("https://graph.microsoft.com", "5.x").then(reject).catch(resolve);
    // });
    // });
    // return graph.getMetadata("https://graph.microsoft.com", "v1.0")
    // fixture.detectChanges();
    // expect(queryTextEl.textContent).toContain(comp.query.requestUrl);
//   }));

//   it('should display a different test title', () => {
//     comp.query.requestUrl = 'Test Title';
//     fixture.detectChanges();
//     expect(queryTextEl.textContent).toContain('Test Title');
//   });
});