import chai, { expect } from 'chai';
import travelPlanner from '../src/travelPlanner';

describe('{unit}: Example test', () => {
  it('should return correct string', () => {
    const actual = travelPlanner('Nacka Station', 'Slussen');
    const expected = 'You want to travel from Nacka Station to Slussen';
    expect(actual).to.equal(expected);
  });
});
