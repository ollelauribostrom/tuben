import { getStation } from './lib/dataParser';
import { get } from './lib/request';
import { stationUrl, getStationKey } from './config';

export async function searchForStation(searchstring) {
  return getStation(
    await get(stationUrl, { searchstring, key: getStationKey() }),
  );
}
