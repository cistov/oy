# oy

_oy_ is a library for analysis of London Oyster card history statements. It performs basic statistical analysis of journeys providing average and median journey times, journey time variation etc.

It accepts Oyster history files in CSV format. They can be downloaded from TfL website: https://oyster.tfl.gov.uk/oyster/

[![Build Status](https://travis-ci.org/cistov/oy.png)](https://travis-ci.org/cistov/oy)
[![Coverage Status](https://coveralls.io/repos/cistov/oy/badge.png?branch=master)](https://coveralls.io/r/cistov/oy?branch=master)
[![Dependency Status](https://gemnasium.com/cistov/oy.png)](https://gemnasium.com/cistov/oy)
[![Code Climate](https://codeclimate.com/github/cistov/oy.png)](https://codeclimate.com/github/cistov/oy)

## Installation

    npm install oy --save

## Usage

_oy_ exposes a single function, which accepts CSV string as input and returns summarised journey data:

```javascript
var oy = require('oy');

oy(csvData, function(err, data) {
  if(err) { /* handle error */ }
  console.log(data);
});
```

## Journey object

Data variable in the example above is an array consisting of multiple __journey__ objects. Here is a sample __journey__ object:

```js
 {
  "from": {
    "text": "Dalston Junction [London Overground]",
    "type": "overground"
  },
  "to": {
    "text": "Shoreditch High Street [London Overground]",
    "type": "overground"
  },
  "durations": {
    "data": [19, 20, 21, 18],
    "stats": {
      "size": 4,
      "min": 18,
      "max": 21,
      "mean": 19.5,
      "median": 19.5,
      "stdev": 1.29
    }
  },
  "times": {
    "data": [
      "2013-11-14T14:24:00.000Z",
      "2013-11-15T14:24:00.000Z",
      "2013-11-16T14:24:00.000Z",
      "2013-11-14T14:24:00.000Z"
     ],
    "stats": {}
  }
```

## Release history

[Changelog](CHANGELOG)

## Tests

    npm test

## License

[MIT](LICENSE)
