var fs = require('fs'),
    should   = require('should'),
    Stats = require('../lib/Stats'),
    sampleData = require('./fixtures/parsed');

describe('Stats', function() {

  describe('Reports', function() {

    it('Generation', function() {
        var stats = Stats.generate(sampleData);
        console.log(JSON.stringify(stats));
    });

  });

});