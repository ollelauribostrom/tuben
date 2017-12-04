import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import * as logger from '../src/view/logger';

const header = proxyquire('../src/view/header', {
  chalk: {
    white: text => text,
    green: text => text,
    bgBlue: text => text,
  },
  'cli-width': () => 100,
});

describe('{unit}: view/header.js', () => {
  describe('printHeader()', () => {
    let log;

    before(() => {
      log = sinon.stub(logger, 'log');
    });

    after(() => log.restore());

    it('should print header to console', () => {
      header.printHeader();
      return expect(log.calledOnce).to.be.true;
    });
  });

  describe('padLines()', () => {
    it('should return string padded at the end to with of cli', () => {
      const actual = header.padLines('hej');
      return expect(actual.length).to.equal(100);
    });
    it('should handle mutiple lines of text', () => {
      const actual = header.padLines('hej\nhej');
      return expect(actual.length).to.equal(201);
    });
    it('should pad with whitespace', () => {
      const actual = header.padLines('hej');
      return expect(actual.trim()).to.equal('hej');
    });
  });
});
