#! /usr/bin/env node

import commander from 'commander';
import clear from 'cli-clear';
import ora from 'ora';
import { searchForStation, travelTo } from '../travelPlanner';
import { printHeader } from '../view/header';
import { printTravelPlanTable } from '../view/table';
import { printError } from '../view/error';
import { version } from '../../package.json';

commander
  .version(version)
  .option('-f, --from [from]', 'from destination')
  .option('-t, --to [to]', 'to destination')
  .parse(process.argv);

export async function plan(from, to) {
  const spinner = ora('Söker efter resor');

  try {
    clear();
    printHeader();
    spinner.start();
    const toStation = await searchForStation(to);
    const fromStation = await searchForStation(from);
    const travelPlan = await travelTo(fromStation.id, toStation.id);
    spinner.stop();
    printTravelPlanTable(travelPlan);
  } catch (error) {
    spinner.stop();
    printError(error);
    console.error(error);
  }
}

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  plan(commander.from, commander.to);
}
