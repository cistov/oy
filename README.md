# oy

_oy_ is a library for analysis of London Oyster card history statements.

[![Build Status](https://travis-ci.org/cistov/oy.png)](https://travis-ci.org/cistov/oy)
[![Dependency Status](https://david-dm.org/cistov/oy.png)](https://david-dm.org/cistov/oy)
[![Code Climate](https://codeclimate.com/github/cistov/oy.png)](https://codeclimate.com/github/cistov/oy)
[![NPM version](https://badge.fury.io/js/oy.png)](http://badge.fury.io/js/oy)

## Installation

    $ npm install oy --save

## Usage

```javascript
var oy = require('oy');

oy.parse(csvData, function(err, data) {
  if(err) { /* handle error */ }
  console.log(data);
});
```

Structure of a journey object:

```javascript
{
  note: '',
  date: '01-Nov-2013',
  startTime: '12:49',
  startDate: Fri Nov 01 2013 12:49:00 GMT+0000 (GMT),
  endTime: '13:02',
  endDate: Fri Nov 01 2013 13:02:00 GMT+0000 (GMT),
  duration: {
     inMilliseconds: 780000,
     inSeconds: 780,
     inMinutes: 13,
     inHours: 0,
     inDays: 0,
     inMonths: 0,
     inYears: 0
  },
  description: 'Liverpool Street [London Underground] to Tottenham Court Road',
  charge: 0,
  credit: 0,
  balance: 7.6,
  to: {
    text: 'Tottenham Court Road',
    type: 'underground'
  },
  from: {
    text: 'Liverpool Street [London Underground]',
    type: 'underground'
  }
}
```

## Running tests

To run the tests:

    $ npm test

## License

MIT © [Artur Cistov](http://cistov.com)
