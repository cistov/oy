/*
 * oy
 *
 * Copyright(c) 2013 Artur Cistov
 * MIT Licensed
 */

var csv = require('csv');
var tt = require('timeTraveller');

var Parser = module.exports = {};

Parser.TYPES = [
  { name: 'admin', match: /^Entered and exited|^Topped-up|^Season ticket/ },
  { name: 'bus', match: /^Bus journey, route ([\d]*)$/ },
  { name: 'rail', match: /\[National Rail\]$/ },
  { name: 'overground', match: /\[London Overground\]$/ },
  { name: 'no_touchin', match: /^\[No touch-in\]$/ },
  { name: 'no_touchout', match: /^\[No touch-out\]$/ },
  { name: 'underground', match: /(^[\w\s()&,]*$|\[London Underground\]$)/ }
];

Parser.checkType = function(text) {
  var typeName = '', i, type;
  for(i = 0; i < this.TYPES.length; i++) {
    type = this.TYPES[i];
    if(text.match(type.match)) {
      typeName = type.name;
      break;
    }
  }
  return typeName;
};


Parser.parseRow = function(row) {

  if( row[0] && row[0] === 'Note' || !(row instanceof Array) ) { return null; }

  var startDate = new Date(Date.parse(row[1] + ' ' + row[2])),
      endDate = row[3] ? new Date(Date.parse(row[1] + ' ' + row[3])) : null,
      duration = endDate ? new tt.TimeSpan(endDate, startDate) :
                 new tt.TimeSpan(startDate, startDate),
      description = (row[4] || '').trim(),
      descriptionData = description.split(' to '),
      from = {},
      to = {},
      journey;

  if(descriptionData.length === 1) {
    from = { text: description, type: this.checkType(descriptionData[0]) };
  } else {
    from = { text: descriptionData[0], type: this.checkType(descriptionData[0]) };
    to = { text: descriptionData[1], type: this.checkType(descriptionData[1]) };
  }

  journey = {
    note: row[0],
    date: row[1],
    startTime: row[2],
    startDate: startDate,
    endTime: row[3] || null,
    endDate: endDate,
    duration: duration,
    description: description,
    charge: Number(row[5] || 0),
    credit: Number(row[6] || 0),
    balance: Number(row[7] || 0),
    to: to,
    from: from
  };
  return journey;
};

Parser.getCSVData = function(input, cb) {
  var rows = [];
  csv()
  .from(input)
  .transform(function(row) {
    row.unshift(row.pop());
    return row;
  })
  .on('record', function(row) {
    rows.push(row);
  })
  .on('end', function() {
    cb(null, rows);
  })
  .on('error', cb);
};


Parser.parse = function(input, cb) {
  var journeys = [];
  this.getCSVData(input, function(err, rows) {
    if(err) { return cb(err); }
    rows.forEach(function(row) {
      var journey = Parser.parseRow(row);
      if(journey) {
        journeys.push(journey);
      }
    });
    cb(null, journeys);
  });
};
