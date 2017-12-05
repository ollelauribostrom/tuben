import chalk from 'chalk';
import { excludeSeconds, getDifference } from '../lib/hms';

export function createSymbol({ char }) {
  return chalk.inverse(char);
}

export function createLegLine({ symbol = '➜', time, station, description = '' }) {
  return `${symbol}: ${time} ${station} ${description}\n`;
}

export function createDescriptiveLegLine({ type, departureTime, from, line, direction }) {
  return createLegLine({
    symbol: createSymbol(type),
    time: excludeSeconds(departureTime),
    station: from,
    description: `- ${type.svName} ${line} mot ${direction}`,
  });
}

export function createLeg(leg) {
  const departure = createDescriptiveLegLine(leg);
  const arrival = createLegLine({ time: excludeSeconds(leg.arrivalTime), station: leg.to });
  return `${departure}${arrival}`;
}

export function createJourneyRow({ from, to, departureTime, arrivalTime, legs }) {

  const { h, m } = getDifference(departureTime, arrivalTime);
  let duration = '';

  if (h > 1) {
    duration += `${h} timmar ${m} minuter`;
  } else if (h === 1) {
    duration += `${h} timme ${m} minuter`;
  } else {
    duration += `${m} minuter`;
  }

  return [
    from,
    to,
    excludeSeconds(departureTime),
    excludeSeconds(arrivalTime),
    duration,
    legs.map(leg => createLeg(leg)).join(''),
  ];
}
