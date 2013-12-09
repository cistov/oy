var fs = require('fs'),
    should   = require('should'),
    Stats = require('../lib/Stats'),
    sampleData = require('./fixtures/parsed');

describe('Stats', function() {

  describe('Generating reports', function() {

    it('Row count', function() {
        var stats = Stats.generate(sampleData);
    });

  });

});