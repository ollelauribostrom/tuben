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
});
