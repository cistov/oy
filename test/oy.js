var oy = require('../'),
    should = require('should'),
    fs = require('fs'),
    input = fs.readFileSync('./test/fixtures/sample.csv', 'utf-8');

describe('oy', function() {

  describe('Integration tests', function() {

    it('Summary generation', function(done) {
        oy(input, function(err, data) {
          data.should.be.ok;
          should.equal(data.length, 9);
          done();
        });
    });

  });

});