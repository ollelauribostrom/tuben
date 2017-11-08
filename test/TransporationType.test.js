import chai, { expect } from 'chai';
import TransportationType from '../src/model/TransportationType';

describe('{unit}: model/TransporationType', () => {
  it('should have correct properties', () => {
    const type = new TransportationType('METRO');
    expect(type).to.have.all.keys('name', 'symbol');
  });

  it('should have correct symbol for type METRO', () => {
    const type = new TransportationType('METRO');
    expect(type).to.have.property('symbol', '🚇');
  });

  it('should have correct symbol for type BUS', () => {
    const type = new TransportationType('BUS');
    expect(type).to.have.property('symbol', '🚌');
  });

  it('should have correct symbol for type TRAIN', () => {
    const type = new TransportationType('TRAIN');
    expect(type).to.have.property('symbol', '🚆');
  });

  it('should have correct symbol for type TRAM', () => {
    const type = new TransportationType('TRAM');
    expect(type).to.have.property('symbol', '🚋');
  });

  it('should have correct symbol for type FERRY', () => {
    const type = new TransportationType('FERRY');
    expect(type).to.have.property('symbol', '⛴');
  });

  it('should have correct symbol for type SHIP', () => {
    const type = new TransportationType('SHIP');
    expect(type).to.have.property('symbol', '🚢');
  });

  it('should use default symbol for unspecified types', () => {
    const type = new TransportationType('OTHER');
    expect(type).to.have.property('symbol', '🔘');
  });
});
