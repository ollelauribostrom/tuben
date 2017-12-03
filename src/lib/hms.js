export function throwTypeError() {
  throw new TypeError('Please provide two time strings in the form hh:mm:ss || hh:mm');
}

export function isValidTimeString(timeString) {
  return /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9](?::([0-5]?\d))?$/.test(timeString);
}

export function parseTimeString(timeString) {
  if (!isValidTimeString(timeString)) {
    throwTypeError();
  }

  return timeString
    .split(':')
    .map(element => Number(element));
}

export function getDifference(start, end) {
  if (!start || !end) {
    throwTypeError();
  }

  const [startH, startM, startS] = parseTimeString(start);
  const [endH, endM, endS] = parseTimeString(end);

  return {
    h: endH - startH,
    m: endM - startM,
    s: endS || 0 - startS || 0,
  };
}

export function getTimeString(now = new Date(), excludeSeconds = false) {
  console.log(now, excludeSeconds);
}