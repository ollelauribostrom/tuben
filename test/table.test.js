import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import Table from 'cli-table';
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
  let stripSeconds;
  let pushToTable;
  let tableToString;

  beforeEach(() => {
    log = sinon.stub(logger, 'log');
    stripSeconds = sinon.stub(hms, 'stripSeconds').returns('12:00');
    pushToTable = sinon.spy(Table.prototype, 'push');
    tableToString = sinon.spy(Table.prototype, 'toString');
  });

  afterEach(() => {
    log.restore();
    stripSeconds.restore();
    pushToTable.restore();
    tableToString.restore();
  });

  describe('createSymbol()', () => {
    it('should produce a correct symbol for legs of type METRO', () => {
      const expected = ' T ';
      const actual = table.createSymbol({ name: 'METRO', char: 'T' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type BUS', () => {
      const expected = ' B ';
      const actual = table.createSymbol({ name: 'BUS', char: 'B' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type TRAIN', () => {
      const expected = ' J ';
      const actual = table.createSymbol({ name: 'TRAIN', char: 'J' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type TRAM', () => {
      const expected = ' L ';
      const actual = table.createSymbol({ name: 'TRAM', char: 'L' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type FERRY', () => {
      const expected = ' W ';
      const actual = table.createSymbol({ name: 'FERRY', char: 'W' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type SHIP', () => {
      const expected = ' W ';
      const actual = table.createSymbol({ name: 'SHIP', char: 'W' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of type WALK', () => {
      const expected = ' » ';
      const actual = table.createSymbol({ name: 'WALK', char: '»' });
      return expect(actual).to.equal(expected);
    });

    it('should produce a correct symbol for legs of unknown types', () => {
      const expected = ' ? ';
      const actual = table.createSymbol({ name: 'OTHER', char: '?' });
      return expect(actual).to.equal(expected);
    });
  });

  describe('createLeg()', () => {
    it('should produce a correct leg string', () => {
      const expected = ' T : 12:00 Slussen - Tunnelbana 13 mot Ropsten\n ➜ : 12:00 T-Centralen \n';
      const actual = table.createLeg(journeyArray[0].legs[0]);
      return expect(actual).to.equal(expected);
    });
  });

  describe('createDescriptiveLegLine()', () => {
    it('should produce a correct leg line with description', () => {
      const expected = ' T : 12:00 Slussen - Tunnelbana 13 mot Ropsten\n';
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
      const expected = ' ➜ : b c \n';
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
      const expected = 'Slussen';
      const [actual] = table.createJourneyRow(journeyArray[0]);
      return expect(actual).to.equal(expected);
    });

    it('should include to-station', () => {
      const expected = 'T-Centralen';
      const actual = table.createJourneyRow(journeyArray[0]);
      return expect(actual[1]).to.equal(expected);
    });

    it('should include departure-time', () => {
      const expected = '12:00';
      const actual = table.createJourneyRow(journeyArray[0]);
      return expect(actual[2]).to.equal(expected);
    });

    it('should include arrival-time', () => {
      const expected = '12:00';
      const actual = table.createJourneyRow(journeyArray[0]);
      return expect(actual[3]).to.equal(expected);
    });

    it('should include duration (travel time)', () => {
      const expected = '4 minuter';
      const actual = table.createJourneyRow(journeyArray[0]);
      return expect(actual[4]).to.equal(expected);
    });

    it('should include leg list as string', () => {
      const expected = ' T : 12:00 Slussen - Tunnelbana 13 mot Ropsten\n ➜ : 12:00 T-Centralen \n';
      const actual = table.createJourneyRow(journeyArray[0]);
      return expect(actual[5]).to.equal(expected);
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

  describe('printTravelPlanTable()', () => {
    it('should push created journeys to the table', () => {
      table.printTravelPlanTable(journeyArray);
      return expect(pushToTable.calledOnce).to.be.true;
    });

    it('should convert to string', () => {
      table.printTravelPlanTable(journeyArray);
      return expect(tableToString.calledOnce).to.be.true;
    });

    it('should log table strint to console', () => {
      table.printTravelPlanTable(journeyArray);
      return expect(log.calledOnce).to.be.true;
    });
  });
});
