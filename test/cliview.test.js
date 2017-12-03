import chai, { expect } from 'chai';
import sinon from 'sinon';
import * as logger from '../src/view/logger';
import * as view from '../src/view/cliview';

function getResponseError(status = 500) {
  const error = new Error();
  error.response = { status };
  return error;
}

function getRequestError() {
  const error = new Error();
  error.request = {};
  return error;
}

describe('{unit}: view/cliview.js', () => {
  describe('printErrorMessage()', () => {
    let log;

    before(() => {
      log = sinon.stub(logger, 'log');
    });

    after(() => {
      log.restore();
    });

    it('should log error message when error object contains response (500 range)', () => {
      const expectedMessage = 'Sorry, we are experiencing some issues with our server || Trafiklabs API';
      view.printErrorMessage(getResponseError(500));
      return expect(log.calledWith(expectedMessage)).to.be.true;
    });

    it('should log error message when error object contains response (400 range)', () => {
      const expectedMessage = 'Sorry, something went wrong. Please try again! If the problem persists - open an issue @github.com/ollelauribostrom/tuben';
      view.printErrorMessage(getResponseError(400));
      return expect(log.calledWith(expectedMessage)).to.be.true;
    });

    it('should log error message when there was a problem with the request', () => {
      const expectedMessage = 'Sorry, something went wrong. Please check your internet conneciton.';
      view.printErrorMessage(getRequestError());
      return expect(log.calledWith(expectedMessage)).to.be.true;
    });

    it('should log default message if error object does not contain response/request', () => {
      const expectedMessage = 'Sorry, something went wrong. If the problem persists - open an issue @github.com/ollelauribostrom/tuben';
      view.printErrorMessage(new Error());
      return expect(log.calledWith(expectedMessage)).to.be.true;
    });
  });
});
