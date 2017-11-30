const pad = n => `0${n}`.slice(-2);

export function getStringDate(date = new Date()) {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    throw new TypeError();
  }
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-');
}

export function isToday(date) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    return isToday(getStringDate(date));
  }
  return date === getStringDate();
}

export function isTomorrow(date) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (Object.prototype.toString.call(date) === '[object Date]') {
    return isTomorrow(getStringDate(date));
  }

  return date === getStringDate(tomorrow);
}
