import chai, { expect } from 'chai';
import * as dataParser from '../src/lib/dataParser';
import { mockJourneyData, mockStationData } from './data';

describe('{unit}: dataParser.getStation', () => {
  it('should parse raw station data and return object', () => {
    const actual = dataParser.getStation(mockStationData);
    const expected = {
      id: '9430',
      name: 'Nacka station (Nacka)',
      similarStations: ['Järla station (Nacka)', 'Sickla station (Nacka)'],
    };
    expect(actual).to.deep.equal(expected);
  });
});
