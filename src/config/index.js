import env from 'dotenv';

env.load();

export const transportationTypes = {
  METRO: { name: 'METRO', symbol: '🚇', char: 'T' },
  BUS: { name: 'BUS', symbol: '🚌', char: 'B' },
  TRAIN: { name: 'TRAIN', symbol: '🚆', char: 'J' },
  TRAM: { name: 'TRAM', symbol: '🚋', char: 'L' },
  FERRY: { name: 'FERRY', symbol: '⛴', char: 'W' },
  SHIP: { name: 'SHIP', symbol: '🚢', char: 'W' },
  default: { name: 'OTHER', symbol: '🔘', char: '?' },
};

export const stationUrl = 'http://api.sl.se/api2/typeahead.json';
export const journeyUrl = 'http://api.sl.se/api2/TravelplannerV3/trip.json';
export const getStationKey = () => process.env.STATION_API_KEY;
export const getJourneyKey = () => process.env.JOURNEY_API_KEY;
