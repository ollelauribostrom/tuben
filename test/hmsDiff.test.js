import chai, { expect } from 'chai';
import hmsDiff from '../src/lib/hmsDiff';

describe('{unit}: lib/hmsDiff.js', () => {
  it('should return an object with calculated time difference { h, m, s }', () => {
    const actual = hmsDiff('12:15:00', '12:45:00');
    return expect(actual).to.deep.equal({ h: 0, m: 30, s: 0 });
  });

  it('should handle cases where only hour and minutes are provided', () => {
    const actual = hmsDiff('12:15', '12:17');
    return expect(actual).to.deep.equal({ h: 0, m: 2, s: 0 });
  });

  it('should throw TypeError if two hms strings are not provided', () => {
    const callToHmsDiffWithOneArgument = hmsDiff('12:15:00');
    return expect(callToHmsDiffWithOneArgument).to.throw(TypeError);
  });

  it('should throw TypeError if hms string is in wrong format', () => {
    const callToHmsDiffWithOneArgument = hmsDiff('12.15', '12.19');
    return expect(callToHmsDiffWithOneArgument).to.throw(TypeError);
  });
});
