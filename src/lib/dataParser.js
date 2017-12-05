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
  Origin: { name: from, time: departureTime, date: departureDate },
  Destination: { name: to, time: arrivalTime, date: arrivalDate },
  Product = {},
  dist,
  direction = to,
}) {
  const { line = `${dist} meter`, catOut: typeName = 'WALK' } = Product;
  const type = getLegType(typeName.trim());

  return {
    from,
    to,
    departureTime,
    arrivalTime,
    departureDate,
    arrivalDate,
    line,
    direction,
    type,
  };
}

export function getJourney({ LegList: { Leg: legsData } }) {
  const legs = legsData.map(leg => getLeg(leg));
  const { from, departureTime, departureDate } = legs[0];
  const { to, arrivalTime, arrivalDate } = legs[legs.length - 1];
  return { from, to, departureTime, arrivalTime, departureDate, arrivalDate, legs };
}

export function getJourneys({ Trip: journeys }) {
  return journeys.map(journey => getJourney(journey));
}
