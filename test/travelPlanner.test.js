import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import * as travelPlanner from '../src/travelPlanner';
import * as request from '../src/lib/request';
import * as dataParser from '../src/lib/dataParser';
import * as config from '../src/config';
import { stationObject } from './data';

chai.use(chaiAsPromised);

describe('{unit}: travelPlanner.searchForStation', () => {
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
    const search = travelPlanner.searchForStation('Nacka Station');
    return expect(search).to.eventually.deep.equal({
      id: '9430',
      name: 'Nacka station (Nacka)',
      similarStations: ['Järla station (Nacka)', 'Sickla station (Nacka)'],
    });
  });

  it('should reject promise on error', () => {
    const search = travelPlanner.searchForStation('not a station');
    return expect(search).to.eventually.be.rejected;
  });
});
