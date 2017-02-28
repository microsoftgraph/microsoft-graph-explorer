import {} from 'mocha'

// var helpers = require('../build/scripts/api-explorer-helpers')

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      parseMetadata("v1.0");
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});