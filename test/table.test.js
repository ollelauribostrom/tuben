import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import * as logger from '../src/view/logger';
import * as hms from '../src/lib/hms';
import { journeyArray } from './data';

const table = proxyquire('../src/view/table', {
  chalk: {
    white: text => text,
    bgBlue: text => text,
    bgRed: text => text,
    bgGreen: text => text,
    inverse: text => text,
  },
});

describe('{unit}: view/table.js', () => {
  let log;
  let excludeSeconds;

  before(() => {
    log = sinon.stub(logger, 'log');
    excludeSeconds = sinon.stub(hms, 'excludeSeconds').returns('12:00');
  });

  after(() => {
    log.restore();
    excludeSeconds.restore();
  });

  describe('createSymbol()', () => {
    it('should produce a correct symbol for legs of type METRO', () => {
      const expected = 'T';
      const actual = table.createSymbol({ name: 'METRO', char: 'T' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type BUS', () => {
      const expected = 'B';
      const actual = table.createSymbol({ name: 'BUS', char: 'B' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type TRAIN', () => {
      const expected = 'J';
      const actual = table.createSymbol({ name: 'TRAIN', char: 'J' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type TRAM', () => {
      const expected = 'L';
      const actual = table.createSymbol({ name: 'TRAM', char: 'L' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type FERRY', () => {
      const expected = 'W';
      const actual = table.createSymbol({ name: 'FERRY', char: 'W' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type SHIP', () => {
      const expected = 'W';
      const actual = table.createSymbol({ name: 'SHIP', char: 'W' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of unknown types', () => {
      const expected = '?';
      const actual = table.createSymbol({ name: 'OTHER', char: '?' });
      return expect(actual).to.equal(expected);
    });
  });

  describe('createLeg()', () => {
    it('should produce a correct leg string', () => {
      const expected = 'T: 12:00 Slussen - Tunnelbana 13 mot Ropsten\n➜: 12:00 T-Centralen \n';
      const actual = table.createLeg(journeyArray[0].legs[0]);
      return expect(actual).to.equal(expected);
    });
  });

  describe('createDescriptiveLegLine()', () => {
    it('should produce a correct leg line with description', () => {
      const expected = 'T: 12:00 Slussen - Tunnelbana 13 mot Ropsten\n';
      const actual = table.createDescriptiveLegLine({
        type: { name: 'METRO', symbol: '🚇', char: 'T', svName: 'Tunnelbana' },
        departureTime: '12:00:00',
        from: 'Slussen',
        line: '13',
        direction: 'Ropsten',
      });
      return expect(actual).to.equal(expected);
    });
  });

  describe('createLegLine()', () => {
    it('should produce a correct leg line with description', () => {
      const expected = 'a: b c d\n';
      const actual = table.createLegLine({ symbol: 'a', time: 'b', station: 'c', description: 'd' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct leg line without description', () => {
      const expected = 'a: b c \n';
      const actual = table.createLegLine({ symbol: 'a', time: 'b', station: 'c' });
      return expect(actual).to.equal(expected);
    });

    it('should use default symbol if none provided', () => {
      const expected = '➜: b c \n';
      const actual = table.createLegLine({ time: 'b', station: 'c' });
      return expect(actual).to.equal(expected);
    });
  });

  describe('createJourneyRow()', () => {
    it('should return an array', () => {
      const actual = table.createJourneyRow(journeyArray[0]);
      return expect(actual).to.be.an('array');
    });

    it('should include from-station', () => {
      const [from] = table.createJourneyRow(journeyArray[0]);
      return expect(from).to.equal('Slussen');
    });

    it('should include to-station', () => {
      const [from, to] = table.createJourneyRow(journeyArray[0]);
      return expect(to).to.equal('T-Centralen');
    });

    it('should include departure-time', () => {
      const [from, to, departureTime] = table.createJourneyRow(journeyArray[0]);
      return expect(departureTime).to.equal('12:00');
    });

    it('should include arrival-time', () => {
      const [from, to, departureTime, arrivalTime] = table.createJourneyRow(journeyArray[0]);
      return expect(arrivalTime).to.equal('12:00');
    });

    it('should include duration (travel time)', () => {
      const [
        from,
        to,
        departureTime,
        arrivalTime,
        duration,
      ] = table.createJourneyRow(journeyArray[0]);
      return expect(duration).to.equal('4 minuter');
    });

    it('should include leg list as string', () => {
      const expected = 'T: 12:00 Slussen - Tunnelbana 13 mot Ropsten\n➜: 12:00 T-Centralen \n';
      const [
        from,
        to,
        departureTime,
        arrivalTime,
        duration,
        legs
      ] = table.createJourneyRow(journeyArray[0]);
      return expect(legs).to.equal(expected);
    });
  });

  describe('createDurationString()', () => {
    it('should produce a correct duration string for single hour & single minute', () => {
      const expected = '1 timme 1 minut';
      const actual = table.createDurationString({ h: 1, m: 1 });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct duration string for multiple hours & multiple minutes', () => {
      const expected = '2 timmar 2 minuter';
      const actual = table.createDurationString({ h: 2, m: 2 });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct duration string for cases where hours are 0', () => {
      const expected = '5 minuter';
      const actual = table.createDurationString({ h: 0, m: 5 });
      return expect(actual).to.equal(expected);
    });
  });
});
