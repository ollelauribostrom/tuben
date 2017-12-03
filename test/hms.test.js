import chai, { expect } from 'chai';
import sinon from 'sinon';
import * as hms from '../src/lib/hms';

let getHours;
let getMinutes;
let getSeconds;

function mockDatePrototype(hour, minute, second) {
  getHours = sinon.stub(Date.prototype, 'getHours').returns(hour);
  getMinutes = sinon.stub(Date.prototype, 'getMinutes').returns(minute);
  getSeconds = sinon.stub(Date.prototype, 'getSeconds').returns(second);
}

function restoreDatePrototype() {
  getHours.restore();
  getMinutes.restore();
  getSeconds.restore();
}

describe('{unit}: lib/hms.js', () => {
  it('should return an object with calculated time difference { h, m, s }', () => {
    const actual = hms.getDifference('12:15:00', '12:45:00');
    return expect(actual).to.deep.equal({ h: 0, m: 30, s: 0 });
  });

  it('should handle cases where only hour and minutes are provided', () => {
    const actual = hms.getDifference('12:15', '12:17');
    return expect(actual).to.deep.equal({ h: 0, m: 2, s: 0 });
  });

  it('should throw TypeError if two hms strings are not provided', () => {
    const callToHmsDiffWithOneArgument = () => hms.getDifference('12:15:00');
    return expect(callToHmsDiffWithOneArgument).to.throw(TypeError);
  });

  it('should throw TypeError if hms string is in wrong format', () => {
    const callToHmsDiffWithOneArgument = () => hms.getDifference('12.15', '12.19');
    return expect(callToHmsDiffWithOneArgument).to.throw(TypeError);
  });

  it('should detect invalid hours (outside range 00-23) and throw TypeError', () => {
    const callToHmsDiffWithOneArgument = () => hms.getDifference('12:15:00', '24:19:00');
    return expect(callToHmsDiffWithOneArgument).to.throw(TypeError);
  });

  it('should detect invalid minutes (outside range 00-59) and throw TypeError', () => {
    const callToHmsDiffWithOneArgument = () => hms.getDifference('12:15:00', '12:60:00');
    return expect(callToHmsDiffWithOneArgument).to.throw(TypeError);
  });

  it('should detect invalid seconds (outside range 00-59) and throw TypeError', () => {
    const callToHmsDiffWithOneArgument = () => hms.getDifference('12:15:60', '12:15:61');
    return expect(callToHmsDiffWithOneArgument).to.throw(TypeError);
  });
});

describe('{unit}: lib/hms.js throwTypeError()', () => {
  it('should throw a TypeError with correct message', () => {
    const expectedMessage = 'Please provide two time strings in the form hh:mm:ss || hh:mm';
    const callToThrowTypeError = () => hms.throwTypeError();
    return expect(callToThrowTypeError).to.throw(TypeError, expectedMessage);
  });
});

describe('{unit}: lib/hms.js isValidTimeString()', () => {
  it('should return true for valid time strings in format hh:mm:ss', () => {
    const actual = hms.isValidTimeString('23:59:59');
    return expect(actual).to.be.true;
  });

  it('should return true for valid time strings in format hh:mm', () => {
    const actual = hms.isValidTimeString('23:59');
    return expect(actual).to.be.true;
  });

  it('should detect invalid hours (outside range 00-23) and return false', () => {
    const actual = hms.isValidTimeString('24:00:00');
    return expect(actual).to.be.false;
  });

  it('should detect invalid minutes (outside range 00-59) and return false', () => {
    const actual = hms.isValidTimeString('00:60:00');
    return expect(actual).to.be.false;
  });

  it('should detect invalid seconds (outside range 00-59) and return false', () => {
    const actual = hms.isValidTimeString('00:00:60');
    return expect(actual).to.be.false;
  });

  it('should return false for strings in wrong format (h:m:s)', () => {
    const actual = hms.isValidTimeString('1:2:3');
    return expect(actual).to.be.false;
  });

  it('should return false for strings in wrong format (hh.mm)', () => {
    const actual = hms.isValidTimeString('10.25');
    return expect(actual).to.be.false;
  });
});

describe('{unit}: lib/hms.js parseTimeString()', () => {
  it('should parse valid time string and return array of numbers [hh, mm, ss]', () => {
    const actual = hms.parseTimeString('10:12:00');
    return expect(actual).to.deep.equal([10, 12, 0]);
  });

  it('should throw TypeError if called with invalid time string', () => {
    const invalidCallToParseTimeString = () => hms.parseTimeString('10.12');
    return expect(invalidCallToParseTimeString).to.throw(TypeError);
  });
});

describe('{unit}: lib/hms.js getTimeString()', () => {

  describe('...', () => {
    before(() => mockDatePrototype(12, 10, 10));
    after(() => restoreDatePrototype());

    it('should return "now" as hh-mm-ss time string if called without any arguments', () => {
      const actual = hms.getTimeString();
      return expect(actual).to.equal('12:10:10');
    });

    it('should exclude seconds if option is set to true', () => {
      const actual = hms.getTimeString(new Date(), true);
      return expect(actual).to.equal('12:10');
    });

    it('should pad single digits and always return format hh-mm-ss', () => {
      restoreDatePrototype();
      mockDatePrototype(9, 9, 9);
      const actual = hms.getTimeString();
      return expect(actual).to.equal('09:09:09');
    });
  });

  it('should throw typeError if called with invalid date object', () => {
    const callWithInvalidDateObject = () => hms.getTimeString(new Date('invalid date'));
    return expect(callWithInvalidDateObject).to.throw(TypeError);
  });

  it('should throw typeError if called with something else than a date object', () => {
    const callWithNonDate = () => hms.getTimeString({});
    return expect(callWithNonDate).to.throw(TypeError);
  });
});
