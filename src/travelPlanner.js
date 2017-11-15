export default async function (from, to) {
  const work = await fakePromise();
  return `You want to travel from ${from} to ${to}`;
}

const fakePromise = () => new Promise((res, rej) => setTimeout(() => res(), 2000));
