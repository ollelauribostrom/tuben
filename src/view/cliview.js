import { log } from './logger';

export function printErrorMessage(error) {
  if (error.response) {
    const serverError = error.response.status >= 500;
    const serverErrorMessage = 'Sorry, we are experiencing some issues with our server || Trafiklabs API';
    const clientErrorMessage = 'Sorry, something went wrong. Please try again! If the problem persists - open an issue @github.com/ollelauribostrom/tuben';
    return log(serverError ? serverErrorMessage : clientErrorMessage);
  }

  if (error.request) {
    return log('Sorry, something went wrong. Please check your internet conneciton.');
  }

  return log('Sorry, something went wrong. If the problem persists - open an issue @github.com/ollelauribostrom/tuben');
}
