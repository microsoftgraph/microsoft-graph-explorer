import {} from 'mocha'
import { parseMetadata } from '../scripts/graph-structure'
// var helpers = require('../build/scripts/api-explorer-helpers')
parseMetadata("v1.0")

// describe('Metadata download and parsing', function() {
//   describe('Download metadata', function() {
//     this.timeout(50*1000);
//     it('should download v1.0 metadata', function(done) {
//       return parseMetadata("v1.0");
//     });
//   });
// });