import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import travelPlanner from '../src/travelPlanner';

chai.use(chaiAsPromised);

describe('{unit}: Example test', () => {
  it('should return correct string', () => {
    const actual = travelPlanner('Nacka Station', 'Slussen');
    const expected = 'You want to travel from Nacka Station to Slussen';
    expect(actual).to.eventually.equal(expected);
  });
});
