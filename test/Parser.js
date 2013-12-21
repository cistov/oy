var fs = require('fs'),
    should   = require('should'),
    Parser = require('../lib/Parser');

describe('Parser', function() {

  describe('Loading CSV data', function() {

    it('Row count', function(done) {
        var input = fs.readFileSync('./test/fixtures/sample.csv', 'utf-8');
        Parser.getCSVData(input, function(err, data) {
          if(err) { return done(err); }
          should.equal(data.length, 18);
          done();
        });
    });

  });

  describe('Parsing header rows', function() {

    it('Return value', function() {
        var row = [ 'Note', 'Date', 'Start Time', 'End Time', 'Journey/Action', 'Charge', 'Credit', 'Balance' ],
            journey = Parser.parseRow(row);
        should.equal(journey, undefined);
    });

  });

  describe('Parsing data rows', function() {

    it('Input check', function() {
        var journey = Parser.parseRow(5);
        should.equal(journey, undefined);
    });

    it('Note', function() {

        var row = [ '', '', '', '', '', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.should.be.ok;
        journey.note.should.equal('');

    });

    it('Note (non-empty)', function() {

        var row = [ 'You have been charged for travelling in zones not covered by your Travelcard.',
                    '', '', '', '', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.should.be.ok;
        journey.note.should.equal('You have been charged for travelling in zones not covered by your Travelcard.');
    });

    it('Dates', function() {

        var row = [ '', '29-Jun-2013', '15:45', '15:57', '', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.date.should.equal('29-Jun-2013');
        journey.startTime.should.equal('15:45');
        journey.startDate.toDateString().should.equal('Sat Jun 29 2013');
        journey.endTime.should.equal('15:57');
        journey.endDate.toDateString().should.equal('Sat Jun 29 2013');
        journey.duration.should.be.ok;
        should.equal(journey.duration.inMinutes, 12);
        should.equal(journey.duration.inMilliseconds, 720000);

    });

    it('Dates (no end date)', function() {

        var row = [ '', '29-Jun-2013', '15:45', '', '', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.date.should.equal('29-Jun-2013');
        journey.startTime.should.equal('15:45');
        journey.startDate.toDateString().should.equal('Sat Jun 29 2013');
        should.equal(journey.endTime, undefined);
        should.equal(journey.endDate, undefined);
        should.equal(journey.duration.inMinutes, 0);
        should.equal(journey.duration.inMilliseconds, 0);

    });

    it('Description', function() {

        var row = [ '', '', '', '', 'Stratford to Leytonstone', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.description.should.equal('Stratford to Leytonstone');

    });

    it('Charges & credits', function() {

        var row = [ '', '', '', '', '', '.00', '', '16.80' ],
            journey = Parser.parseRow(row);

        journey.charge.should.equal(0);
        journey.credit.should.equal(0);
        journey.balance.should.equal(16.8);

    });

    it('Start point (Underground)', function() {

        var row = [ '', '', '', '', 'Stratford to Leytonstone', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('underground');
        journey.from.text.should.equal('Stratford');

    });

    it('Start point (Underground)', function() {

        var row = [ '', '', '', '', 'Heathrow Terminals 123 [London Underground] to Leytonstone', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('underground');
        journey.from.text.should.equal('Heathrow Terminals 123 [London Underground]');

    });

    it('Start point (Underground)', function() {

        var row = [ '', '', '', '', 'Kings Cross (Met, Circle, H&C lines) to Leytonstone', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('underground');
        journey.from.text.should.equal('Kings Cross (Met, Circle, H&C lines)');

    });

    it('Start point (Underground)', function() {

        var row = [ '', '', '', '', 'Hammersmith (District, Piccadilly lines) to Leytonstone', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('underground');
        journey.from.text.should.equal('Hammersmith (District, Piccadilly lines)');

    });

    it('Start point (Overground)', function() {

        var row = [ '', '', '', '', 'Dalston Junction [London Overground] to Leytonstone', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('overground');
        journey.from.text.should.equal('Dalston Junction [London Overground]');

    });

    it('Start point (National Rail)', function() {

        var row = [ '', '', '', '', 'Liverpool Street [National Rail] to Leytonstone', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('rail');
        journey.from.text.should.equal('Liverpool Street [National Rail]');

    });

    it('Start point (Bus)', function() {

        var row = [ '', '', '', '', 'Bus journey, route 111', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('bus');
        journey.from.text.should.equal('Bus journey, route 111');

    });

    it('Start point (No touch-in)', function() {

        var row = [ '', '', '', '', '[No touch-in]', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('no_touchin');
        journey.from.text.should.equal('[No touch-in]');

    });

    it('Start point (No touch-out)', function() {

        var row = [ '', '', '', '', '[No touch-out]', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('no_touchout');
        journey.from.text.should.equal('[No touch-out]');

    });

    it('Admin (Season ticket)', function() {

        var row = [ '', '', '', '', 'Season ticket added on touch in, Old Street', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('admin');
        journey.from.text.should.equal('Season ticket added on touch in, Old Street');

    });

    it('Admin (Entered and exited)', function() {

        var row = [ '', '', '', '', 'Entered and exited Angel Road [National Rail]', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('admin');
        journey.from.text.should.equal('Entered and exited Angel Road [National Rail]');

    });

    it('Admin (Topped-up)', function() {

        var row = [ '', '', '', '', 'Topped-up on touch in, Old Street', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        journey.from.type.should.equal('admin');
        journey.from.text.should.equal('Topped-up on touch in, Old Street');

    });

    it('End point', function() {

        var row = [ '', '', '', '', 'Stratford to Leytonstone', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.to.should.be.ok;
        journey.to.type.should.equal('underground');
        journey.to.text.should.equal('Leytonstone');

    });

    it('End point (Bus)', function() {

        var row = [ '', '', '', '', 'Bus journey, route 111', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.to.should.be.ok;
        should.equal(journey.to.type, undefined);
        should.equal(journey.to.text, undefined);

    });

    it('End point (Topped-up)', function() {

        var row = [ '', '', '', '', 'Topped-up on touch in, Old Street', '', '', '' ],
            journey = Parser.parseRow(row);

        journey.from.should.be.ok;
        should.equal(journey.to.type, undefined);
        should.equal(journey.to.text, undefined);

    });

  });

  describe('Parsing', function() {

    it('Row count', function(done) {
        var input = fs.readFileSync('./test/fixtures/sample.csv', 'utf-8');
        Parser.parse(input, function(err, data) {
          if(err) { return done(err); }
          should.equal(data.length, 17);
          done();
        });
    });

  });

});