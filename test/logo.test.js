import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import * as logger from '../src/view/logger';

const logo = proxyquire('../src/view/logo', {
  chalk: {
    white: {
      bgBlue: text => text,
    },
  },
});

const expectedLogo = `
  _____           _                                 ___     _    
 |_   _|  _  _   | |__     ___    _ _       o O O  / __|   | |   
   | |   | +| |  | '_ \\   / -_)  | ' \\     o       \\__ \\   | |__ 
  _|_|_   \\_,_|  |_.__/   \\___|  |_||_|   TS__[O]  |___/   |____|
_|"""""|_|"""""|_|"""""|_|"""""|_|"""""| {======|_|"""""|_|"""""|
"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'./o--000'"\`-0-0-'"\`-0-0-'
A CLI travel planner for SL (Storstockholms Lokaltrafik)
`;

describe('{unit}: view/logo.js', () => {
  let log;

  before(() => {
    log = sinon.stub(logger, 'log');
  });

  after(() => log.restore());

  it('should print logo to console', () => {
    const expected = expectedLogo;
    logo.printLogo();
    const actual = log.getCall(0).args[0];
    return expect(actual).to.equal(expected);
  });
});
