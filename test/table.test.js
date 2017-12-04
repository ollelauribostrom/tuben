import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import * as logger from '../src/view/logger';

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

  before(() => {
    log = sinon.stub(logger, 'log');
  });

  after(() => log.restore());

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
});
