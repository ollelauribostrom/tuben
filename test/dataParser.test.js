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
    const expected = { name: 'METRO', symbol: '🚇', char: 'T', svName: 'Tunnelbana' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type BUS', () => {
    const actual = dataParser.getLegType('BUS');
    const expected = { name: 'BUS', symbol: '🚌', char: 'B', svName: 'Buss' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type TRAIN', () => {
    const actual = dataParser.getLegType('TRAIN');
    const expected = { name: 'TRAIN', symbol: '🚆', char: 'J', svName: 'Pendeltåg' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type TRAM', () => {
    const actual = dataParser.getLegType('TRAM');
    const expected = { name: 'TRAM', symbol: '🚋', char: 'L', svName: 'Lokalbana' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type FERRY', () => {
    const actual = dataParser.getLegType('FERRY');
    const expected = { name: 'FERRY', symbol: '⛴', char: 'W', svName: 'Båt' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type SHIP', () => {
    const actual = dataParser.getLegType('SHIP');
    const expected = { name: 'SHIP', symbol: '🚢', char: 'W', svName: 'Båt' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for type WALK', () => {
    const actual = dataParser.getLegType('WALK');
    const expected = { name: 'WALK', symbol: '🚶', char: '»', svName: 'Gå' };
    expect(actual).to.deep.equal(expected);
  });
  it('should resolve correct symbol, name and char for unspecified types', () => {
    const actual = dataParser.getLegType('unspecified type');
    const expected = { name: 'OTHER', symbol: '🔘', char: '?', svName: 'Res' };
    expect(actual).to.deep.equal(expected);
  });
});

describe('{unit}: dataParser.getLeg', () => {
  it('should parse raw leg data and return object', () => {
    const actual = dataParser.getLeg(mockJourneyData.Trip[0].LegList.Leg[0]);
    const expected = {
      from: 'Slussen',
      to: 'T-Centralen',
      arrivalDate: '2017-11-23',
      arrivalTime: '12:05:00',
      departureTime: '12:01:00',
      departureDate: '2017-11-23',
      line: '13',
      direction: 'Ropsten',
      type: { name: 'METRO', symbol: '🚇', char: 'T', svName: 'Tunnelbana' },
    };
    expect(actual).to.deep.equal(expected);
  });
  it('if Product is undefined assume leg is of type WALK and add distance to line', () => {
    const mockLeg = Object.assign({}, mockJourneyData.Trip[0].LegList.Leg[0], {
      Product: undefined,
      dist: 100,
    });
    const actual = dataParser.getLeg(mockLeg);
    const expected = {
      from: 'Slussen',
      to: 'T-Centralen',
      arrivalDate: '2017-11-23',
      arrivalTime: '12:05:00',
      departureTime: '12:01:00',
      departureDate: '2017-11-23',
      line: '100 meter',
      direction: 'Ropsten',
      type: { name: 'WALK', symbol: '🚶', char: '»', svName: 'Gå' },
    };
    expect(actual).to.deep.equal(expected);
  });
  it('if direction is undefined, use to as default', () => {
    const mockLeg = Object.assign({}, mockJourneyData.Trip[0].LegList.Leg[0], {
      direction: undefined,
    });
    const actual = dataParser.getLeg(mockLeg);
    expect(actual.direction).to.deep.equal('T-Centralen');
  });
});

describe('{unit}: dataParser.getJourney', () => {
  it('should parse raw journey data and return object', () => {
    const actual = dataParser.getJourney(mockJourneyData.Trip[0]);
    const expected = {
      from: 'Slussen',
      to: 'T-Centralen',
      departureTime: '12:01:00',
      arrivalTime: '12:05:00',
      departureDate: '2017-11-23',
      arrivalDate: '2017-11-23',
      legs: [
        {
          from: 'Slussen',
          to: 'T-Centralen',
          departureTime: '12:01:00',
          arrivalTime: '12:05:00',
          departureDate: '2017-11-23',
          arrivalDate: '2017-11-23',
          line: '13',
          direction: 'Ropsten',
          type: { name: 'METRO', symbol: '🚇', char: 'T', svName: 'Tunnelbana' },
        },
      ],
    };
    expect(actual).to.deep.equal(expected);
  });
});

describe('{unit}: dataParser.getJourneys', () => {
  it('should parse raw journeys data and return array of journeys', () => {
    const actual = dataParser.getJourneys(mockJourneyData);
    const expected = [
      {
        from: 'Slussen',
        to: 'T-Centralen',
        departureTime: '12:01:00',
        arrivalTime: '12:05:00',
        departureDate: '2017-11-23',
        arrivalDate: '2017-11-23',
        legs: [
          {
            from: 'Slussen',
            to: 'T-Centralen',
            departureTime: '12:01:00',
            arrivalTime: '12:05:00',
            departureDate: '2017-11-23',
            arrivalDate: '2017-11-23',
            line: '13',
            direction: 'Ropsten',
            type: { name: 'METRO', symbol: '🚇', char: 'T', svName: 'Tunnelbana' },
          },
        ],
      },
      {
        from: 'Slussen',
        to: 'T-Centralen',
        departureTime: '12:02:00',
        arrivalTime: '12:06:00',
        departureDate: '2017-11-23',
        arrivalDate: '2017-11-23',
        legs: [
          {
            from: 'Slussen',
            to: 'T-Centralen',
            departureTime: '12:02:00',
            arrivalTime: '12:06:00',
            departureDate: '2017-11-23',
            arrivalDate: '2017-11-23',
            line: '19',
            direction: 'Hässelby strand',
            type: { name: 'METRO', symbol: '🚇', char: 'T', svName: 'Tunnelbana' },
          },
        ],
      },
      {
        from: 'Slussen',
        to: 'T-Centralen',
        departureTime: '12:04:00',
        arrivalTime: '12:09:00',
        departureDate: '2017-11-23',
        arrivalDate: '2017-11-23',
        legs: [
          {
            from: 'Slussen',
            to: 'T-Centralen',
            departureTime: '12:04:00',
            arrivalTime: '12:09:00',
            departureDate: '2017-11-23',
            arrivalDate: '2017-11-23',
            line: '14',
            direction: 'Mörby centrum',
            type: { name: 'METRO', symbol: '🚇', char: 'T', svName: 'Tunnelbana' },
          },
        ],
      },
    ];
    expect(actual).to.deep.equal(expected);
  });
});
