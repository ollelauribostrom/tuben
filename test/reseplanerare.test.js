import chai, { expect } from 'chai';
import reseplanerare from '../src/reseplanerare';

describe('{unit}: Example test', () => {
  it('should return correct string', () => {
    const actual = reseplanerare('Nacka Station', 'Slussen');
    const expected = 'You want to travel from Nacka Station to Slussen';
    expect(actual).to.equal(expected);
  });
});
