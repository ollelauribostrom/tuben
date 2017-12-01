export function isDateObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]' && isFinite(obj);
}

export function getStringDate(dateObj = new Date()) {
  if (!isDateObject(dateObj)) {
    throw new TypeError('Please provide a valid Date object');
  }

  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
  const date = `${dateObj.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${date}`;
}

export function isToday(date) {
  if (isDateObject(date)) {
    return getStringDate(date) === getStringDate();
  }
  return date === getStringDate();
}

export function isTomorrow(date) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (isDateObject(date)) {
    return getStringDate(date) === getStringDate(tomorrow);
  }
  return date === getStringDate(tomorrow);
}
