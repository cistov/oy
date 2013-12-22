var parser = require('./Parser'),
  stats = require('./Stats');

module.exports = function(input, cb) {
  parser.parse(input, function(err, data) {
    if(err) { return cb(err); }
    var summary = stats.generate(data);
    cb(err, summary);
  });
};