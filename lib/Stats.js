/*
 * oy
 *
 * Copyright(c) 2013 Artur Cistov
 * MIT Licensed
 */

var stats = require('statsjs');
var stdev = require('stdev');
// var _ = require('underscore');

var Stats = module.exports = {};

Stats.isValidType = function(type) {
  return type && type !== 'admin' && type !== 'no_touchout' && type !== 'no_touchin';
};

Stats.isValidJourney = function(from, to) {
  var fromType = from.type;
  if(!this.isValidType(fromType)) {
    return false;
  } else if (fromType === 'bus') {
    return true;
  } else {
    return to && this.isValidType(to.type);
  }
};

Stats.summarizeJourneys = function(journeys) {
  var result = {};

  journeys.forEach(function(journey) {
    var from = journey.from,
        to = journey.to;
    if(Stats.isValidJourney(from, to)) {
      if(!result[from.type]) {
        result[from.type] = {};
      }
      if(!result[from.type][from.text]) {
        result[from.type][from.text] = {};
      }
      if(from.type === 'bus') {
        if(!result[from.type][from.text].startDates) {
          result[from.type][from.text].startDates = [];
        }
        result[from.type][from.text].startDates.push(journey.startDate);
      } else {
        if(!result[from.type][from.text][to.type]) {
          result[from.type][from.text][to.type] = {};
        }
        if(!result[from.type][from.text][to.type][to.text]) {
          result[from.type][from.text][to.type][to.text] = {};
        }
        if(!result[from.type][from.text][to.type][to.text].durations) {
          result[from.type][from.text][to.type][to.text].durations = [];
        }
        result[from.type][from.text][to.type][to.text].durations.push(journey.duration.inMinutes);
      }
    }
  });

  return result;
};

Stats.calculateMetrics = function(summary) {

  var fromType, from, toType, to, times, metrics;

  if(!summary) { return metrics; }

  for(fromType in summary) {
    for(from in summary[fromType]) {
      for(toType in summary[fromType][from]) {
        for(to in summary[fromType][from][toType]) {
          if(summary[fromType][from][toType][to]) {
            times = summary[fromType][from][toType][to].durations;
            if(times && times.length) {
              metrics = stats(times);
              summary[fromType][from][toType][to].stats = {
                size: metrics.size(),
                min: metrics.min(),
                max: metrics.max(),
                mean: metrics.mean(),
                median: metrics.median(),
                stdev: isNaN(metrics.stdDev()) ? 0 : metrics.stdDev()
              };
            }
          }
        }
      }
    }
  }

  return summary;
};

Stats.generate = function(journeys) {
  var summary = this.summarizeJourneys(journeys),
      metrics = this.calculateMetrics(summary);

  return metrics;
};