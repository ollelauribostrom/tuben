import chai, { expect } from 'chai';
import * as dataParser from '../src/lib/dataParser';
import { mockJourneyData, mockStationData, stationObject, journeyArray } from './data';

describe('{unit}: lib/dataParser.js getStation()', () => {
  it('should parse raw station data and return object', () => {
    const actual = dataParser.getStation(mockStationData);
    const expected = stationObject;
    expect(actual).to.deep.equal(expected);
  });
});

describe('{unit}: lib/dataParser.js getLegType()', () => {
  it('should resolve correct legType object for type METRO', () => {
    const actual = dataParser.getLegType('METRO');
    const expected = { name: 'METRO', symbol: '🚇', char: 'T', svName: 'Tunnelbana' };
    expect(actual).to.deep.equal(expected);
  });

  it('should resolve correct legType object for type BUS', () => {
    const actual = dataParser.getLegType('BUS');
    const expected = { name: 'BUS', symbol: '🚌', char: 'B', svName: 'Buss' };
    expect(actual).to.deep.equal(expected);
  });

  it('should resolve correct legType object for type TRAIN', () => {
    const actual = dataParser.getLegType('TRAIN');
    const expected = { name: 'TRAIN', symbol: '🚆', char: 'J', svName: 'Pendeltåg' };
    expect(actual).to.deep.equal(expected);
  });

  it('should resolve correct legType object for type TRAM', () => {
    const actual = dataParser.getLegType('TRAM');
    const expected = { name: 'TRAM', symbol: '🚋', char: 'L', svName: 'Lokalbana' };
    expect(actual).to.deep.equal(expected);
  });

  it('should resolve correct legType object for type FERRY', () => {
    const actual = dataParser.getLegType('FERRY');
    const expected = { name: 'FERRY', symbol: '⛴', char: 'W', svName: 'Båt' };
    expect(actual).to.deep.equal(expected);
  });

  it('should resolve correct legType object for type SHIP', () => {
    const actual = dataParser.getLegType('SHIP');
    const expected = { name: 'SHIP', symbol: '🚢', char: 'W', svName: 'Båt' };
    expect(actual).to.deep.equal(expected);
  });

  it('should resolve correct legType object for type WALK', () => {
    const actual = dataParser.getLegType('WALK');
    const expected = { name: 'WALK', symbol: '🚶', char: '»', svName: 'Gå' };
    expect(actual).to.deep.equal(expected);
  });

  it('should resolve correct legType object for unspecified types', () => {
    const actual = dataParser.getLegType('unspecified type');
    const expected = { name: 'OTHER', symbol: '🔘', char: '?', svName: 'Res' };
    expect(actual).to.deep.equal(expected);
  });
});

describe('{unit}: lib/dataParser.js getLeg()', () => {
  it('should parse raw leg data and return object', () => {
    const actual = dataParser.getLeg(mockJourneyData.Trip[0].LegList.Leg[0]);
    const expected = journeyArray[0].legs[0];
    expect(actual).to.deep.equal(expected);
  });

  it('if Product is undefined assume leg is of type WALK and add distance to line', () => {
    const legData = mockJourneyData.Trip[0].LegList.Leg[0];
    const mockLeg = Object.assign({}, legData, { Product: undefined, dist: 100 });
    const actual = dataParser.getLeg(mockLeg);
    const expected = Object.assign({}, journeyArray[0].legs[0], {
      line: '100 meter',
      type: { name: 'WALK', symbol: '🚶', char: '»', svName: 'Gå' },
    });
    expect(actual).to.deep.equal(expected);
  });

  it('if direction is undefined, use to as default', () => {
    const legData = mockJourneyData.Trip[0].LegList.Leg[0];
    const mockLeg = Object.assign({}, legData, { direction: undefined });
    const actual = dataParser.getLeg(mockLeg);
    expect(actual.direction).to.deep.equal('T-Centralen');
  });
});

describe('{unit}: dataParser.getJourney', () => {
  it('should parse raw journey data and return object', () => {
    const actual = dataParser.getJourney(mockJourneyData.Trip[0]);
    const expected = journeyArray[0];
    expect(actual).to.deep.equal(expected);
  });
});

describe('{unit}: dataParser.getJourneys', () => {
  it('should parse raw journeys data and return array of journeys', () => {
    const actual = dataParser.getJourneys(mockJourneyData);
    const expected = journeyArray;
    expect(actual).to.deep.equal(expected);
  });
});
