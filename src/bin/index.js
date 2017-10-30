#! /usr/bin/env node

import commander from 'commander';
import reseplanerare from '../reseplanerare';

commander
  .version('1.0.0')
  .option('-f, --from [from]', 'from destination')
  .option('-t, --to [to]', 'to destination')
  .parse(process.argv);

const plan = reseplanerare(commander.from, commander.to);
console.log(plan);
process.exit(0);
