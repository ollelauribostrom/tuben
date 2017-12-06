export function isDateObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]' && isFinite(obj);
}

export function validateDateObject(obj) {
  if (!isDateObject(obj)) {
    throw new TypeError('Please provide a valid Date object');
  }
}

export function isValidTimeString(timeString) {
  return /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9](?::([0-5]?\d))?$/.test(timeString);
}

export function parseTimeString(timeString) {
  if (!isValidTimeString(timeString)) {
    throw new TypeError('Please provide a valid time string in the form hh:mm:ss || hh:mm');
  }

  return timeString
    .split(':')
    .map(element => Number(element));
}

export function setTimeTo(dateObj, timeString) {
  validateDateObject(dateObj);
  const [hours, minutes, seconds = 0] = parseTimeString(timeString);
  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);
  dateObj.setSeconds(seconds);
  return dateObj;
}

export function getDifference(start, end, startDate = new Date(), endDate = new Date()) {
  if (!start || !end) {
    throw new TypeError('Please provide two time strings to compare');
  }

  const startDateObj = setTimeTo(startDate, start);
  const endDateObj = setTimeTo(endDate, end);
  const difference = endDateObj.getTime() - startDateObj.getTime();

  return {
    h: Math.floor((difference / (1000 * 60 * 60)) % 24),
    m: ((difference / (1000 * 60)) % 60),
    s: (difference / 1000) % 60,
    difference,
  };
}

export function getTimeString(now = new Date(), excludeSeconds = false) {
  validateDateObject(now);
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');
  const seconds = `${now.getSeconds()}`.padStart(2, '0');

  if (excludeSeconds) {
    return `${hours}:${minutes}`;
  }

  return `${hours}:${minutes}:${seconds}`;
}

export function stripSeconds(timeString) {
  const [h, m] = parseTimeString(timeString);
  const hours = `${h}`.padStart(2, '0');
  const minutes = `${m}`.padStart(2, '0');
  return `${hours}:${minutes}`;
}
