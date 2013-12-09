/*
 * oy
 *
 * Copyright(c) 2013 Artur Cistov
 * MIT Licensed
 */

var stats = require('statsjs');
var stdev = require('stdev');
var _ = require('underscore');

var Stats = module.exports = {};

Stats.isValidType = function(type) {
  return type && type !== 'admin' && type !== 'no_touchout' && type !== 'no_touchin';
}

Stats.isValidJourney = function(from, to) {
  var fromType = from.type;
  if(!this.isValidType(fromType)) {
    return false;
  } else if (fromType === 'bus') {
    return true;
  } else {
    return to && this.isValidType(to.type);
  }
}

Stats.generate = function(journeys) {
  var result = {}
      times = [];

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
          result[from.type][from.text][to.type][to.text] = [];
        }
        result[from.type][from.text][to.type][to.text].push(journey.duration.inMinutes);
      }
    }
  });

  for(var type in result) {
    for(var from in result[type]) {
      for(var toType in result[type][from]) {
        for(var to in result[type][from][toType]) {
          times = result[type][from][toType][to];
          if(times && times.length) {

            try {
              times.stats = stats(times);
            } catch(e) {
              console.log(e);
            }

            var nums = times.stats;
            console.log("%s (%s) to %s (%s) - journeys: %s - min: %s - max: %s - mean: %s - med: %s - stdev: %s - %s",
                        from, type,
                        to, toType,
                        nums.size(), nums.min(), nums.max(),
                        nums.mean().toFixed(2), nums.median().toFixed(2),
                        isNaN(nums.stdDev()) ? 0 : nums.stdDev().toFixed(2),
                        times
            );

          }
        }
      }
    }
  }
  return result;
};