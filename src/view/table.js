import chalk from 'chalk';

export function createSymbol({ char }) {
  return chalk.inverse(char);
}
