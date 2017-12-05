import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import * as logger from '../src/view/logger';

const header = proxyquire('../src/view/header', {
  chalk: {
    blue: text => text,
    green: text => text,
  },
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
});
