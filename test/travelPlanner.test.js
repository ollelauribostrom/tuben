import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import * as travelPlanner from '../src/travelPlanner';
import * as request from '../src/lib/request';
import * as dataParser from '../src/lib/dataParser';
import * as config from '../src/config';
import { stationObject, journeyArray } from './data';

chai.use(chaiAsPromised);

describe('{unit}: travelPlanner.js searchForStation()', () => {
  let get;
  let getStation;
  let getStationKey;

  before(() => {
    get = sinon.stub(request, 'get').returns(Promise.resolve());
    get.withArgs(config.stationUrl, { key: 'key', searchstring: 'not a station' }).throws(Error);
    getStation = sinon.stub(dataParser, 'getStation').returns(Promise.resolve(stationObject));
    getStationKey = sinon.stub(config, 'getStationKey').returns('key');
  });

  after(() => {
    get.restore();
    getStation.restore();
    getStationKey.restore();
  });

  it('should resolve promise with station object on success', () => {
    const expected = stationObject;
    const actual = travelPlanner.searchForStation('Nacka Station');
    return expect(actual).to.eventually.deep.equal(expected);
  });

  it('should reject promise on error', () => {
    const actual = travelPlanner.searchForStation('not a station');
    return expect(actual).to.eventually.be.rejected;
  });
});

describe('{unit}: travelPlanner.js travelTo()', () => {
  let get;
  let getJourneys;
  let getJourneyKey;

  before(() => {
    get = sinon.stub(request, 'get').returns(Promise.resolve());
    get.withArgs(config.journeyUrl, { key: 'key', destId: 'to', originId: 'from', time: undefined, date: undefined }).throws(Error);
    getJourneys = sinon.stub(dataParser, 'getJourneys').returns(Promise.resolve(journeyArray));
    getJourneyKey = sinon.stub(config, 'getJourneyKey').returns('key');
  });

  after(() => {
    get.restore();
    getJourneys.restore();
    getJourneyKey.restore();
  });

  it('should resolve promise with array of journeys on success', () => {
    const expected = journeyArray;
    const actual = travelPlanner.travelTo('Nacka Station', 'Slussen');
    return expect(actual).to.eventually.deep.equal(expected);
  });

  it('should reject promise on error', () => {
    const actual = travelPlanner.travelTo('from', 'to');
    return expect(actual).to.eventually.be.rejected;
  });
});
