import chalk from 'chalk';
import Table from 'cli-table';
import { excludeSeconds, getDifference } from '../lib/hms';
import { log } from './logger';

export function createSymbol({ char }) {
  return chalk.inverse(` ${char} `);
}

export function createLegLine({ symbol = ' ➜ ', time, station, description = '' }) {
  return `${symbol}: ${time} ${station} ${description}\n`;
}

export function createDescriptiveLegLine({ type, departureTime, from, line, direction }) {
  return createLegLine({
    symbol: createSymbol(type, line),
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

export function createDurationString({ h: hours, m: minutes }) {
  const theWordHours = hours === 1 ? 'timme' : 'timmar';
  const theWordMinutes = minutes === 1 ? 'minut' : 'minuter';

  if (hours === 0) {
    return `${minutes} ${theWordMinutes}`;
  }
  return `${hours} ${theWordHours} ${minutes} ${theWordMinutes}`;
}

export function createJourneyRow({
  from,
  to,
  departureTime,
  arrivalTime,
  legs,
  departureDate,
  arrivalDate,
}) {
  const depDateObj = new Date(departureDate);
  const arrDateObj = new Date(arrivalDate);
  const difference = getDifference(departureTime, arrivalTime, depDateObj, arrDateObj);
  const duration = createDurationString(difference);
  const depTime = excludeSeconds(departureTime);
  const arrTime = excludeSeconds(arrivalTime);
  const legList = legs.map(leg => createLeg(leg)).join('');

  return [from, to, depTime, arrTime, duration, legList];
}

export function printTravelPlanTable(journeys) {
  const table = new Table({ head: ['Från', 'Till', 'När', 'Framme', 'Restid', 'Hur?'] });
  const rows = journeys.map(journey => createJourneyRow(journey));
  table.push(...rows);
  log(table.toString());
}
