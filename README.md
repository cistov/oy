# oy

_oy_ is a library for analysis of London Oyster card history statements.

[![Build Status](https://travis-ci.org/cistov/oy.png)](https://travis-ci.org/cistov/oy)
[![Coverage Status](https://coveralls.io/repos/cistov/oy/badge.png?branch=master)](https://coveralls.io/r/cistov/oy?branch=master)
[![Dependency Status](https://gemnasium.com/cistov/oy.png)](https://gemnasium.com/cistov/oy)
[![Code Climate](https://codeclimate.com/github/cistov/oy.png)](https://codeclimate.com/github/cistov/oy)

## Installation

    npm install oy --save

## Usage

```javascript
var oy = require('oy');

oy.parse(csvData, function(err, data) {
  if(err) { /* handle error */ }
  console.log(data);
});
```

## Running tests

    npm test

## License

[MIT](MIT-LICENSE.txt)
