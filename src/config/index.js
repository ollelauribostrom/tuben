import env from 'dotenv';

env.load();

export const transportationTypes = {
  METRO: { name: 'METRO', symbol: '🚇', char: 'T', svName: 'Tunnelbana' },
  BUS: { name: 'BUS', symbol: '🚌', char: 'B', svName: 'Buss' },
  TRAIN: { name: 'TRAIN', symbol: '🚆', char: 'J', svName: 'Pendeltåg' },
  TRAM: { name: 'TRAM', symbol: '🚋', char: 'L', svName: 'Lokalbana' },
  FERRY: { name: 'FERRY', symbol: '⛴', char: 'W', svName: 'Båt' },
  SHIP: { name: 'SHIP', symbol: '🚢', char: 'W', svName: 'Båt' },
  default: { name: 'OTHER', symbol: '🔘', char: '?', svName: 'Resa' },
};

export const stationUrl = 'http://api.sl.se/api2/typeahead.json';
export const journeyUrl = 'http://api.sl.se/api2/TravelplannerV3/trip.json';
export const getStationKey = () => process.env.STATION_API_KEY;
export const getJourneyKey = () => process.env.JOURNEY_API_KEY;
