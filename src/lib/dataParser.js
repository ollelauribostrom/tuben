import { transportationTypes } from '../config';

export function getStation({ ResponseData: stations }) {
  const { Name: name, SiteId: id } = stations.shift();
  const similarStations = stations.map(station => station.Name);
  return { id, name, similarStations };
}

export function getLegType(typeName) {
  return transportationTypes[typeName] || transportationTypes.default;
}

export function getLeg({
  Origin: { name: from, time: departureTime, date },
  Destination: { name: to, time: arrivalTime },
  Product: { line, catOut: typeName },
  direction,
}) {
  const type = getLegType(typeName.trim());
  return { from, to, departureTime, arrivalTime, date, line, direction, type };
}

export function getJourney() {

}
