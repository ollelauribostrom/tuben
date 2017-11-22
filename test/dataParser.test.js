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

describe('{unit}: dataParser.getLegType', () => {
  it('should resolve correct symbol, name and char for type METRO', () => {
    const actual = dataParser.getLegType('METRO');
    const expected = { name: 'METRO', symbol: '🚇', char: 'T' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type BUS', () => {
    const actual = dataParser.getLegType('BUS');
    const expected = { name: 'BUS', symbol: '🚌', char: 'B' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type TRAIN', () => {
    const actual = dataParser.getLegType('TRAIN');
    const expected = { name: 'TRAIN', symbol: '🚆', char: 'J' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type TRAM', () => {
    const actual = dataParser.getLegType('TRAM');
    const expected = { name: 'TRAM', symbol: '🚋', char: 'L' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type FERRY', () => {
    const actual = dataParser.getLegType('FERRY');
    const expected = { name: 'FERRY', symbol: '⛴', char: 'W' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type SHIP', () => {
    const actual = dataParser.getLegType('SHIP');
    const expected = { name: 'SHIP', symbol: '🚢', char: 'W' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for unspecified types', () => {
    const actual = dataParser.getLegType('unspecified type');
    const expected = { name: 'OTHER', symbol: '🔘', char: '?' };
    expect(actual).to.deep.equal(expected);
  });
});
