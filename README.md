# oy

_oy_ is a library for analysis of London Oyster card history statements.

[![Build Status](https://travis-ci.org/[cistov]/[oy].png)](https://travis-ci.org/[cistov]/[oy])

## Installation

    $ npm install oy --save

## Usage

```javascript
var fs = require('fs'),
    oy = require('oy');
var input = fs.readFileSync('./test/fixtures/sample.csv', 'utf-8');

oy.parse(input, function(err, data) {
  if(err) { /* handle error */ }
  // 'data' holds an array of journey objects
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

(The MIT License)

Copyright (c) 2013 Artur Cistov

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
