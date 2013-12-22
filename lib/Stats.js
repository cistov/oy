/*
 * oy
 *
 * Copyright(c) 2013 Artur Cistov
 * MIT Licensed
 */

var stats = require('statsjs');
var _ = require('underscore');

var Stats = module.exports = {};

Stats.journeys = [];

Stats.isValidType = function(type) {
  return type && type !== 'admin' && type !== 'no_touchout' && type !== 'no_touchin';
};

Stats.isValidJourney = function(from, to) {
  var fromType = from.type;
  if(!fromType) {
    return false;
  } else if(!this.isValidType(fromType)) {
    return false;
  } else if (fromType === 'bus') {
    return true;
  } else {
    return to && this.isValidType(to.type);
  }
};

Stats.reset = function() {
  this.journeys = [];
};

Stats.createJourneySummary = function(journey) {
  var summary = {
    from: journey.from,
    to: journey.to,
    durations: {
      data: [],
      stats: {}
    },
    times: {
      data: [],
      stats: {}
    }
  };
  this.journeys.push(summary);
  return summary;
};

Stats.findJourneySummary = function(journey) {
  if(!journey) { return; }
  return _.find(Stats.journeys, function(item) {
    if(journey.to) {
      return _.isEqual(journey.from, item.from) && _.isEqual(journey.to, item.to);
    } else {
      return _.isEqual(journey.from, item.from);
    }
  });
};

Stats.findOrCreateJourneySummary = function(journey) {
  var summary = this.findJourneySummary(journey);
  if(!summary) {
    summary = this.createJourneySummary(journey);
  }
  return summary;
};

Stats.updateJourneySummary = function(journey) {
  var summary = this.findOrCreateJourneySummary(journey);
  if(journey.duration && journey.duration.inMinutes) {
    summary.durations.data.push(journey.duration.inMinutes);
  }
  if(journey.startDate) {
    summary.times.data.push(journey.startDate);
  }
};

Stats.summarizeJourneys = function(journeys) {
  journeys.forEach(function(journey) {
    if(Stats.isValidJourney(journey.from, journey.to)) {
      Stats.updateJourneySummary(journey);
    }
  });
  return this.journeys;
};

Stats.calculateMetrics = function() {

  this.journeys.forEach(function(journey) {

    if(journey.durations.data.length) {

      var journeyStats = stats(journey.durations.data);

      var journeyStatsSummary = {
          size: journeyStats.size(),
          min: journeyStats.min(),
          max: journeyStats.max(),
          mean: journeyStats.mean(),
          median: journeyStats.median(),
          stdev: isNaN(journeyStats.stdDev()) ? 0 : Math.round(journeyStats.stdDev() * 100) / 100
      };

      journey.durations.stats = journeyStatsSummary;

    }

  });

};

Stats.generate = function(journeys) {
  this.reset();
  this.summarizeJourneys(journeys);
  this.calculateMetrics();
  return this.journeys;
};