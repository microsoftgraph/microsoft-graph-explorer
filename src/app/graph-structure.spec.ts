// import { HttpModule } from '@angular/http';

// import {
//     inject,
//     TestBed
// } from '@angular/core/testing';
// import { GraphService } from "./graph-service";
// import { parseMetadata } from "./graph-structure";

// let graphService:GraphService;
// describe('Graph structural tests', () => {

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//         imports: [HttpModule],
//         providers: [GraphService]
//     });
//   });

//   it('Creates an instance of the graph service', inject([GraphService], (_graphService:GraphService) => {
//     graphService = _graphService;
//   }));

//   it('should download and parse v1.0 metadata', function(done) {
//     parseMetadata(graphService, "v1.0").then(() => {
//         done();
//     });
//   });
// });