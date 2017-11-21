import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as request from '../src/lib/request';

chai.use(chaiAsPromised);

describe('{unit}: request.buildParam', () => {
  it('should build query param string from string values', () => {
    const actual = request.buildParam('a', 'b');
    const expected = 'a=b';
    expect(actual).to.equal(expected);
  });
  it('should build query param string from numeric values', () => {
    const actual = request.buildParam(1, 2);
    const expected = '1=2';
    expect(actual).to.equal(expected);
  });
});

describe('{unit}: request.buildQueryString', () => {
  it('should build query string from parameters object', () => {
    const actual = request.buildQueryString({ a: 1, b: 2 });
    const expected = 'a=1&b=2';
    expect(actual).to.equal(expected);
  });
});
