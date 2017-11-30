import chai, { expect } from 'chai';
import sinon from 'sinon';
import * as ymd from '../src/lib/ymd';

let getFullYear;
let getMonth;
let getDate;

function mockDatePrototype() {
  getFullYear = sinon.stub(Date.prototype, 'getFullYear').returns(2017);
  getMonth = sinon.stub(Date.prototype, 'getMonth').returns(10);
  getDate = sinon.stub(Date.prototype, 'getDate').returns(25);
}

function restoreDatePrototype() {
  getFullYear.restore();
  getMonth.restore();
  getDate.restore();
}

describe('{unit}: lib/ymd.js', () => {
  describe('getStringDate()', () => {
    before(() => mockDatePrototype());
    after(() => restoreDatePrototype());

    it('should return todays date in ymd-string format', () => {
      const actual = ymd.getStringDate();
      const expected = '2017-11-25';
      return expect(actual).to.equal(expected);
    });

    it('should return date in ymd-string format when called with date object', () => {
      restoreDatePrototype();
      const actual = ymd.getStringDate(new Date('2017-11-03'));
      const expected = '2017-11-03';
      return expect(actual).to.equal(expected);
    });

    it('should throw exception if provided argument isn´t a Date instance', () => {
      const callToGetStringDate = () => ymd.getStringDate({});
      return expect(callToGetStringDate).to.throw(TypeError);
    });
  });

  describe('isToday()', () => {
    before(() => mockDatePrototype());
    after(() => restoreDatePrototype());

    it('should return true if provided date in ymd-string format matches todays date', () => {
      const actual = ymd.isToday('2017-11-25');
      return expect(actual).to.be.true;
    });

    it('should return false if provided date in ymd-string format does not match todays date', () => {
      const actual = ymd.isToday('2017-11-23');
      return expect(actual).to.be.false;
    });

    it('should return true if provided date object matches todays date', () => {
      restoreDatePrototype();
      const actual = ymd.isToday(new Date());
      return expect(actual).to.be.true;
    });

    it('should return false if provided date object does not match todays date', () => {
      restoreDatePrototype();
      const actual = ymd.isToday(new Date('2017-11-23'));
      return expect(actual).to.be.false;
    });
  });

  describe('isTomorrow()', () => {
    before(() => mockDatePrototype());
    after(() => restoreDatePrototype());

    it('should return true if provided date in ymd-string format matches tomorrows date', () => {
      const actual = ymd.isTomorrow('2017-11-26');
      return expect(actual).to.be.true;
    });

    it('should return false if provided date in ymd-string format does not match tomorrows date', () => {
      const actual = ymd.isTomorrow('2017-11-23');
      return expect(actual).to.be.true;
    });

    it('should return true if provided date object matches tomorrows date', () => {
      restoreDatePrototype();
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() + 1);
      const actual = ymd.isTomorrow(dateObj);
      return expect(actual).to.be.true;
    });

    it('should return false if provided date object does not match tomorrows date', () => {
      restoreDatePrototype();
      const actual = ymd.isTomorrow(new Date());
      return expect(actual).to.be.true;
    });
  });
});
