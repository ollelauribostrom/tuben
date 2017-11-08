import chai, { expect } from 'chai';
import Journey from '../src/model/Journey';

describe('{unit}: model/Journey', () => {
  it('should have correct properties after instantiation', () => {
    const journey = new Journey({ Origin: {}, Destination: {} });
    expect(journey).to.have.all.keys(
      'from',
      'to',
      'departureTime',
      'arrivalTime',
      'departureDate',
      'arrivalDate',
    );
  });
  it('should throw a TypeError if instantiated with invalid journey data', () => {
    const getInstance = () => new Journey(JSON.stringify({ Origin: {}, Destination: {} }));
    expect(getInstance).to.throw(TypeError, 'Journey data must be provided in the form { Origin, Destination }');
  });
});
