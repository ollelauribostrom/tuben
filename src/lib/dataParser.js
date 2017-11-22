import { transportationTypes } from '../config';

export function getStation({ ResponseData: stations }) {
  const { Name: name, SiteId: id } = stations.shift();
  const similarStations = stations.map(station => station.Name);
  return { id, name, similarStations };
}

export function getLegType(typeName) {
  return transportationTypes[typeName] || transportationTypes.default;
}

export function getLeg({ Origin, Destination, Product, direction }) {
  return {
    from: Origin.name,
    to: Destination.name,
    departureTime: Origin.time,
    arrivalTime: Destination.time,
    departureDate: Origin.date,
    arrivalDate: Destination.date,
    line: Product.line,
    direction,
    transportationType: getLegType(Product.catOut.trim()),
  };
}
