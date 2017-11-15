#! /usr/bin/env node

import commander from 'commander';
import travelPlanner from '../travelPlanner';

commander
  .version('1.0.0')
  .option('-f, --from [from]', 'from destination')
  .option('-t, --to [to]', 'to destination')
  .parse(process.argv);

travelPlanner(commander.from, commander.to)
  .then((plan) => {
    console.log(plan);
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
