import chai, { expect } from 'chai';
import sinon from 'sinon';
import * as logger from '../src/view/logger';

describe('{unit} view/logger.js', () => {
  let log;

  before(() => {
    log = sinon.spy(console, 'log');
  });

  after(() => log.restore());

  it('should call console.log with provided arguments', () => {
    logger.log();
    return expect(log.calledOnce).to.be.true;
  });
});
