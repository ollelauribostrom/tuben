import chalk from 'chalk';
import { log } from './logger';

const logo = `
  _____           _                                 ___     _    
 |_   _|  _  _   | |__     ___    _ _       o O O  / __|   | |   
   | |   | +| |  | '_ \\   / -_)  | ' \\     o       \\__ \\   | |__ 
  _|_|_   \\_,_|  |_.__/   \\___|  |_||_|   TS__[O]  |___/   |____|
_|"""""|_|"""""|_|"""""|_|"""""|_|"""""| {======|_|"""""|_|"""""|
"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'./o--000'"\`-0-0-'"\`-0-0-'
A CLI travel planner for SL (Storstockholms Lokaltrafik)
`;

export function printLogo() {
  log(`${chalk.white.bgBlue(logo)}`);
}
