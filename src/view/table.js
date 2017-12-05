import chalk from 'chalk';
import { excludeSeconds } from '../lib/hms';

export function createSymbol({ char }) {
  return chalk.inverse(char);
}

export function createLegDeparture(symbol, deptTime, deptFrom, legType, lineNumber, direction) {
  return `${symbol}: ${deptTime} ${deptFrom} - ${legType} ${lineNumber} mot ${direction}\n`;
}

export function createLegArrival(arrivalTime, arrivedAt) {
  return ` : ${arrivalTime} ${arrivedAt}\n`;
}

export function createLeg(leg) {
  const departure = createLegDeparture(
    createSymbol(leg.type),
    excludeSeconds(leg.departureTime),
    leg.from,
    leg.type.svName,
    leg.line,
    leg.direction,
  );
  const arrival = createLegArrival(excludeSeconds(leg.arrivalTime), leg.to);
  return `${departure}${arrival}`;
}
