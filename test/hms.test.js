import chai, { expect } from 'chai';
import sinon from 'sinon';
import * as hms from '../src/lib/hms';

let getHours;
let getMinutes;
let getSeconds;

function mockDatePrototype({ hour, minute, second }) {
  getHours = sinon.stub(Date.prototype, 'getHours').returns(hour);
  getMinutes = sinon.stub(Date.prototype, 'getMinutes').returns(minute);
  getSeconds = sinon.stub(Date.prototype, 'getSeconds').returns(second);
}

function restoreDatePrototype() {
  getHours.restore();
  getMinutes.restore();
  getSeconds.restore();
}

describe('{unit}: lib/hms.js getDifference()', () => {
  it('should return an object with calculated time difference { h, m, s }', () => {
    const expected = { h: 0, m: 30, s: 0, difference: 1800000 };
    const actual = hms.getDifference('12:15:00', '12:45:00');
    return expect(actual).to.deep.equal(expected);
  });

  it('should handle 60 minutes as 1h, 0m', () => {
    const expected = { h: 1, m: 0, s: 0, difference: 3600000 };
    const actual = hms.getDifference('12:00:00', '13:00:00');
    return expect(actual).to.deep.equal(expected);
  });

  it('should handle cases where startDate and endDate parameters are supplied to span over multiple dates', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const expected = { h: 0, m: 45, s: 0, difference: 2700000 };
    const actual = hms.getDifference('23:30:00', '00:15:00', new Date(), tomorrow);
    return expect(actual).to.deep.equal(expected);
  });

  it('should handle cases where only hour and minutes are provided', () => {
    const expected = { h: 0, m: 2, s: 0, difference: 120000 };
    const actual = hms.getDifference('12:15', '12:17');
    return expect(actual).to.deep.equal(expected);
  });

  it('should throw TypeError if two hms strings are not provided', () => {
    const callToGetDifference = () => hms.getDifference('12:15:00');
    return expect(callToGetDifference).to.throw(TypeError);
  });

  it('should throw TypeError if hms string is in wrong format', () => {
    const callToGetDifference = () => hms.getDifference('12.15', '12.19');
    return expect(callToGetDifference).to.throw(TypeError);
  });

  it('should detect invalid hours (outside range 00-23) and throw TypeError', () => {
    const callToGetDifference = () => hms.getDifference('12:15:00', '24:19:00');
    return expect(callToGetDifference).to.throw(TypeError);
  });

  it('should detect invalid minutes (outside range 00-59) and throw TypeError', () => {
    const callToGetDifference = () => hms.getDifference('12:15:00', '12:60:00');
    return expect(callToGetDifference).to.throw(TypeError);
  });

  it('should detect invalid seconds (outside range 00-59) and throw TypeError', () => {
    const callToGetDifference = () => hms.getDifference('12:15:60', '12:15:61');
    return expect(callToGetDifference).to.throw(TypeError);
  });
});

describe('{unit}: lib/hms.js validateDateObject()', () => {
  it('should throw a TypeError if called with invalid Date object', () => {
    const expectedMessage = 'Please provide a valid Date object';
    const callToValidateDateObject = () => hms.validateDateObject(new Date('invalid date'));
    return expect(callToValidateDateObject).to.throw(TypeError, expectedMessage);
  });

  it('should not throw TypError if called with valid Date Object', () => {
    const callToValidateDateObject = () => hms.validateDateObject(new Date());
    return expect(callToValidateDateObject).to.not.throw(TypeError);
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
    before(() => mockDatePrototype({ hour: 12, minute: 10, second: 10 }));
    after(() => restoreDatePrototype());

    it('should return "now" as hh-mm-ss time string if called without any arguments', () => {
      const expected = '12:10:10';
      const actual = hms.getTimeString();
      return expect(actual).to.equal(expected);
    });

    it('should excludeSeconds if option is set to true', () => {
      const expected = '12:10';
      const actual = hms.getTimeString(new Date(), true);
      return expect(actual).to.equal(expected);
    });

    it('should pad single digits and always return format hh-mm-ss', () => {
      restoreDatePrototype();
      mockDatePrototype({ hour: 9, minute: 9, second: 9 });
      const expected = '09:09:09';
      const actual = hms.getTimeString();
      return expect(actual).to.equal(expected);
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

describe('{unit}: lib/hms.js setTimeTo()', () => {
  it('should set time of given date object to provided time string in hh:mm:ss format', () => {
    const dateObj = hms.setTimeTo(new Date(), '12:10:10');
    const actual = [dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds()];
    const expected = [12, 10, 10];
    expect(actual).to.deep.equal(expected);
  });

  it('should return the provided date object', () => {
    const actual = hms.setTimeTo(new Date(), '12:10:10');
    expect(actual).to.be.an.instanceof(Date);
  });

  it('should throw TypeError if no date object is provided', () => {
    const callToSetTimeToWithoutDateObj = () => hms.setTimeTo();
    expect(callToSetTimeToWithoutDateObj).to.throw(TypeError);
  });

  it('should throw TypeError if a invalid date object is provided', () => {
    const callToSetTimeToWithInvalidDateObj = () => hms.setTimeTo(new Date('invalid date'), '12:10:10');
    expect(callToSetTimeToWithInvalidDateObj).to.throw(TypeError);
  });

  it('should throw TypeError if something else than a date object is provided', () => {
    const callToSetTimeToWithNonDate = () => hms.setTimeTo({}, '12:10:10');
    expect(callToSetTimeToWithNonDate).to.throw(TypeError);
  });

  it('should throw TypeError if time string is invalid', () => {
    const callToSetTimeToWithInvalidTimeString = () => hms.setTimeTo({}, '12.10');
    expect(callToSetTimeToWithInvalidTimeString).to.throw(TypeError);
  });

  it('should handle time strings in format hh:mm', () => {
    const dateObj = hms.setTimeTo(new Date(), '09:09');
    const actual = [dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds()];
    const expected = [9, 9, 0];
    expect(actual).to.deep.equal(expected);
  });
});

describe('{unit}: lib/hms.js isDateObject()', () => {
  it('should return true for valid Date object', () => {
    const actual = hms.isDateObject(new Date());
    return expect(actual).to.be.true;
  });

  it('should return false for invalid date objects', () => {
    const actual = hms.isDateObject(new Date('invalid date'));
    return expect(actual).to.be.false;
  });

  it('should return false when called with Date', () => {
    const actual = hms.isDateObject(Date);
    return expect(actual).to.be.false;
  });

  it('should return false for argument that is not a Date object', () => {
    const actual = hms.isDateObject({});
    return expect(actual).to.be.false;
  });
});

describe('{unit}: lib/hms.js stripSeconds()', () => {
  it('should remove seconds from provided time string in format hh:mm:ss', () => {
    const expected = '12:15';
    const actual = hms.stripSeconds('12:15:10');
    return expect(actual).to.equal(expected);
  });

  it('should return time string if seconds is not included', () => {
    const expected = '12:15';
    const actual = hms.stripSeconds('12:15');
    return expect(actual).to.equal(expected);
  });

  it('should throw TypeError for invalid time strings', () => {
    const invalidCallToStripSecondsSeconds = () => hms.stripSeconds('12.15.10');
    return expect(invalidCallToStripSecondsSeconds).to.throw(TypeError);
  });
});

