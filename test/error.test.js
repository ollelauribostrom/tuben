import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import * as logger from '../src/view/logger';

const view = proxyquire('../src/view/error', {
  chalk: {
    white: {
      bgRed: text => text,
    },
    blue: text => text,
  },
});

function getResponseError(status = 500) {
  const error = new Error();
  error.response = { status };
  return error;
}

describe('{unit}: view/error.js', () => {
  let log;

  before(() => {
    log = sinon.stub(logger, 'log');
  });

  after(() => log.restore());

  it('should log error message when error object contains response (500 range)', () => {
    const expected = '\nSorry, something went wrong. 😢\nWe´re having some issues with our server / Trafiklabs API.\nIf the problem persists - open an issue @ https://github.com/ollelauribostrom/tuben/issues\n';
    view.printError(getResponseError(500));
    const actual = log.getCall(0).args[0];
    return expect(actual).to.equal(expected);
  });

  it('should log error message when error object contains response (400 range)', () => {
    const expected = '\nSorry, something went wrong. 😢\nPlease try again!\nIf the problem persists - open an issue @ https://github.com/ollelauribostrom/tuben/issues\n';
    view.printError(getResponseError(400));
    const actual = log.getCall(1).args[0];
    return expect(actual).to.equal(expected);
  });

  it('should log error message when there was a problem with the request', () => {
    const error = new Error();
    error.request = {};
    const expected = '\nSorry, something went wrong. 😢\nPlease check your internet connection.\nIf the problem persists - open an issue @ https://github.com/ollelauribostrom/tuben/issues\n';
    view.printError(error);
    const actual = log.getCall(2).args[0];
    return expect(actual).to.equal(expected);
  });

  it('should log default message if error object does not contain response/request', () => {
    const expected = '\nSorry, something went wrong. 😢\nPlease try again!\nIf the problem persists - open an issue @ https://github.com/ollelauribostrom/tuben/issues\n';
    view.printError(new Error());
    const actual = log.getCall(3).args[0];
    return expect(actual).to.equal(expected);
  });
});
