import chalk from 'chalk';
import { log } from './logger';

const description = `

 A CLI travel planner for SL (Storstockholms Lokaltrafik)
 Contribute @ https://github.com/ollelauribostrom/tuben
 -h, --help for help
 `;

const logo = `
   _____           _                                 ___     _    
  |_   _|  _  _   | |__     ___    _ _       o O O  / __|   | |   
    | |   | +| |  | '_ \\   / -_)  | ' \\     o       \\__ \\   | |__ 
   _|_|_   \\_,_|  |_.__/   \\___|  |_||_|   TS__[O]  |___/   |____|
 _|"""""|_|"""""|_|"""""|_|"""""|_|"""""| {======|_|"""""|_|"""""|
 "\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'./o--000'"\`-0-0-'"\`-0-0-'`;

export function printHeader() {
  const header = `${chalk.green(logo)}${chalk.blue(description)}`;
  log(header);
}
