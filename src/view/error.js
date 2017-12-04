import chalk from 'chalk';
import { bugs } from '../../package.json';
import { log } from './logger';

export function generateErrorMessage(message = 'Please try again!') {
  const header = `${chalk.white.bgRed('Sorry, something went wrong.')} 😢`;
  const footer = `If the problem persists - open an issue @ ${chalk.blue(bugs.url)}`;
  return `\n${header}\n${message}\n${footer}\n`;
}

export function printError(error) {
  if (error.response) {
    const serverError = error.response.status >= 500;
    const serverErrorMessage = generateErrorMessage('We´re having some issues with our server / Trafiklabs API.');
    const clientErrorMessage = generateErrorMessage();
    return log(serverError ? serverErrorMessage : clientErrorMessage);
  }

  if (error.request) {
    return log(generateErrorMessage('Please check your internet connection.'));
  }

  return log(generateErrorMessage());
}
