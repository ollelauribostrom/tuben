import chai, { expect } from 'chai';
import Leg from '../src/model/Leg';

describe('{unit}: model/Leg', () => {
  it('should have correct properties after instantiation', () => {
    const leg = new Leg({ Origin: {}, Destination: {} });
    expect(leg).to.have.all.keys(
      'from',
      'to',
      'departureTime',
      'arrivalTime',
      'departureDate',
      'arrivalDate',
    );
  });
  it('should throw a TypeError if instantiated with invalid leg data', () => {
    const getInstance = () => new Leg(JSON.stringify({ Origin: {}, Destination: {} }));
    expect(getInstance).to.throw(TypeError, 'Leg data must be provided in the form { Origin, Destination }');
  });
});
