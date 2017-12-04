import chalk from 'chalk';
import cliWidth from 'cli-width';
import { log } from './logger';

export function padLines(text) {
  return text
    .split('\n')
    .map(line => line.padEnd(cliWidth(), ' '))
    .join('\n');
}

const description = padLines(`
 A CLI travel planner for SL (Storstockholms Lokaltrafik)
 Contribute @ https://github.com/ollelauribostrom/tuben
 -h, --help for help
 `);

const logo = padLines(`
   _____           _                                 ___     _    
  |_   _|  _  _   | |__     ___    _ _       o O O  / __|   | |   
    | |   | +| |  | '_ \\   / -_)  | ' \\     o       \\__ \\   | |__ 
   _|_|_   \\_,_|  |_.__/   \\___|  |_||_|   TS__[O]  |___/   |____|
 _|"""""|_|"""""|_|"""""|_|"""""|_|"""""| {======|_|"""""|_|"""""|
 "\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'./o--000'"\`-0-0-'"\`-0-0-'`);

export function printHeader() {
  const header = `${chalk.white(padLines(logo))}${chalk.green(padLines(description))}`;
  log(chalk.bgBlue(header));
}
