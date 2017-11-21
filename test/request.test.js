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
