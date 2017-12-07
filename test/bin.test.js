import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import * as travelPlanner from '../src/travelPlanner';
import * as header from '../src/view/header';
import * as table from '../src/view/table';
import * as error from '../src/view/error';

process.env.NODE_ENV = 'test';

const commander = {
  version: sinon.stub().returns({
    option: sinon.stub().returns({
      option: sinon.stub().returns({
        parse: sinon.stub(),
      }),
    }),
  }),
};

const clear = sinon.stub();
const startSpinner = sinon.stub();
const stopSpinner = sinon.stub();
const ora = sinon.stub().returns({ start: startSpinner, stop: stopSpinner });
const bin = proxyquire('../src/bin/index.js', { commander, 'cli-clear': clear, ora });

describe('{unit} bin/index.js', () => {
  let searchForStation;
  let travelTo;
  let printHeader;
  let printTravelPlanTable;
  let printError;

  before(() => {
    searchForStation = sinon.stub(travelPlanner, 'searchForStation').resolves({ id: 1 });
    travelTo = sinon.stub(travelPlanner, 'travelTo').resolves([]);
    printHeader = sinon.stub(header, 'printHeader');
    printTravelPlanTable = sinon.stub(table, 'printTravelPlanTable');
    printError = sinon.stub(error, 'printError');
    searchForStation.withArgs('err').throws(Error);
  });

  beforeEach(() => {
    searchForStation.resetHistory();
    travelTo.resetHistory();
    printHeader.resetHistory();
    printTravelPlanTable.resetHistory();
    printError.resetHistory();
    clear.resetHistory();
    startSpinner.resetHistory();
    stopSpinner.resetHistory();
  });

  after(() => {
    searchForStation.restore();
    travelTo.restore();
    printHeader.restore();
    printTravelPlanTable.restore();
    printError.restore();
    clear.reset();
    startSpinner.reset();
    stopSpinner.reset();
  });

  it('should clear the terminal window', async () => {
    await bin.plan('a', 'b');
    return expect(clear.calledOnce).to.be.true;
  });

  it('should print header', async () => {
    await bin.plan('a', 'b');
    return expect(printHeader.calledOnce).to.be.true;
  });

  it('should start spinner', async () => {
    await bin.plan('a', 'b');
    return expect(startSpinner.calledOnce).to.be.true;
  });

  it('should search for stations', async () => {
    await bin.plan('a', 'b');
    return expect(searchForStation.calledTwice).to.be.true;
  });

  it('should search for journeys', async () => {
    await bin.plan('a', 'b');
    return expect(travelTo.calledOnce).to.be.true;
  });

  it('should stop spinner', async () => {
    await bin.plan('a', 'b');
    return expect(stopSpinner.calledOnce).to.be.true;
  });

  it('should print travel plan', async () => {
    await bin.plan('a', 'b');
    return expect(printTravelPlanTable.calledOnce).to.be.true;
  });

  it('should catch and print thrown errors', async () => {
    await bin.plan('err', 'b');
    return expect(printError.calledOnce).to.be.true;
  });

  it('should stop spinner also when an error is thrown', async () => {
    await bin.plan('err', 'b');
    return expect(stopSpinner.calledOnce).to.be.true;
  });
});
