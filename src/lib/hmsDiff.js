export default function (start, end) {

  if (!start || !end) {
    throw new TypeError();
  }

  const [startH, startM, startS] = start.split(':').map(element => Number(element));
  const [endH, endM, endS] = end.split(':').map(element => Number(element));

  if (!startH || !startM || !endH || !endM) {
    throw new TypeError();
  }

  return {
    h: endH - startH,
    m: endM - startM,
    s: endS ? endS : 0 - startS ? startS : 0,
  };
}
