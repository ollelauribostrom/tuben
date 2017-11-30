import chai, { expect } from 'chai';
import * as config from '../src/config';

describe('{unit}: config', () => {
  it('should export transportationTypes', () => {
    expect(config).to.have.property('transportationTypes');
  });

  it('should export stationUrl', () => {
    expect(config).to.have.property('stationUrl');
  });

  it('should export journeyUrl', () => {
    expect(config).to.have.property('journeyUrl');
  });

  it('getStationKey should return STATION_API_KEY from env', () => {
    process.env.STATION_API_KEY = 'super-secret-key';
    expect(config.getStationKey()).to.equal('super-secret-key');
  });

  it('getJourneyKey should return JOURNEY_API_KEY from env', () => {
    process.env.JOURNEY_API_KEY = 'super-secret-key';
    expect(config.getJourneyKey()).to.equal('super-secret-key');
  });
});
