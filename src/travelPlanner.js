import { getStation, getJourneys } from './lib/dataParser';
import { get } from './lib/request';
import { stationUrl, journeyUrl, getStationKey, getJourneyKey } from './config';

export async function searchForStation(searchstring) {
  return getStation(
    await get(stationUrl, { searchstring, key: getStationKey() }),
  );
}

export async function travelTo(to, from, time, date) {
  return getJourneys(
    await get(journeyUrl, { to, from, time, date, key: getJourneyKey() }),
  );
}
