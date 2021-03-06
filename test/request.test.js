import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import axios from 'axios';
import sinon from 'sinon';
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

  it('should return empty string from empty parameters object', () => {
    const actual = request.buildQueryString({});
    const expected = '';
    expect(actual).to.equal(expected);
  });

  it('should remove parameters with undefined values', () => {
    const actual = request.buildQueryString({ a: undefined, b: 2 });
    const expected = 'b=2';
    expect(actual).to.equal(expected);
  });
});

describe('{unit}: request.buildUrl', () => {
  it('should build complete url from url-string and parameters object', () => {
    const actual = request.buildUrl('http://google.com', { a: 1, b: 2 });
    const expected = 'http://google.com?a=1&b=2';
    expect(actual).to.equal(expected);
  });

  it('should build correct url from url-string without parameters object', () => {
    const actual = request.buildUrl('http://google.com');
    const expected = 'http://google.com';
    expect(actual).to.equal(expected);
  });
});

describe('{unit}: request.get', () => {
  let get;

  before(() => {
    get = sinon.stub(axios, 'get');
    get.returns(Promise.resolve({ data: [] }));
    get.withArgs('http://badurl.com').throws(Error);
  });

  after(() => get.restore());

  it('should resolve promise on success', () => {
    const req = request.get('http://google.com');
    return expect(req).to.eventually.be.resolved;
  });

  it('should reject promise on error', () => {
    const req = request.get('http://badurl.com');
    return expect(req).to.eventually.be.rejected;
  });

  it('should make request to correct url when no parameter object is provided', () => {
    request.get('http://noparams.com');
    const actual = get.withArgs('http://noparams.com').calledOnce;
    return expect(actual).to.be.true;
  });

  it('should make request to correct url when parameter object is provided', () => {
    request.get('http://twoparams.com', { a: 1, b: 2 });
    const actual = get.withArgs('http://twoparams.com?a=1&b=2').calledOnce;
    return expect(actual).to.be.true;
  });
});
