var fs = require('fs'),
    should   = require('should'),
    Stats = require('../lib/Stats'),
    sampleData = require('./fixtures/parsed'),
    stats = Stats.generate(sampleData);

/*
Expected format:

[
     {
      "from": { "name": "Leytonstone", "type": "underground" },
      "to": { "name": "Stratford", "type": "underground" },
      "times": {
        "data": [19, 20, 21, 18],
        "stats": {
              "size": 4,
              "min": 18,
              "max": 21,
              "mean": 19.5,
              "median": 19.5,
              "stdev": 1.29
            }
      }
     }
   ]
*/

describe('Stats', function() {

  describe('Report data structure', function() {

    it('Journeys', function() {
        stats.should.be.an.instanceOf(Array);
    });

    it('Journey', function() {
      var journey = stats[0];
      journey.should.have.property('to');
      journey.should.have.property('from');
      journey.should.have.property('times');
    });

    it('Journey times', function() {
      var journey = stats[0];
      journey.times.should.have.property('data');
      journey.times.should.have.property('stats');
    });

    it('Metric formatting', function() {
      var journey = stats[8];
      journey.durations.should.have.property('data');
      journey.durations.should.have.property('stats');
      journey.durations.stats.should.have.property('stdev', 1.29);
    });

    it('Reset', function() {
      Stats.reset();
      Stats.journeys.should.have.property('length', 0);
    });

  });

});