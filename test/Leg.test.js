import chai, { expect } from 'chai';
import Leg from '../src/model/Leg';

const legData = {
  Origin: {
    name: 'Slussen',
    type: 'ST',
    id: 'A=1@O=Slussen@X=18071743@Y=59319591@U=74@L=400101011@',
    extId: '400101011',
    lon: 18.071743,
    lat: 59.319591,
    prognosisType: 'PROGNOSED',
    time: '22:40:00',
    date: '2017-11-08',
    track: '1',
    rtTime: '22:40:00',
    rtDate: '2017-11-08',
    hasMainMast: true,
    mainMastId: 'A=1@O=Slussen (Stockholm)@X=18071860@Y=59320284@U=74@L=300109192@',
    mainMastExtId: '300109192',
  },
  Destination: {
    name: 'T-Centralen',
    type: 'ST',
    id: 'A=1@O=T-Centralen@X=18061639@Y=59331295@U=74@L=400102051@',
    extId: '400102051',
    lon: 18.061639,
    lat: 59.331295,
    prognosisType: 'PROGNOSED',
    time: '22:43:00',
    date: '2017-11-08',
    track: '1',
    rtTime: '22:43:00',
    rtDate: '2017-11-08',
    hasMainMast: true,
    mainMastId: 'A=1@O=Sergels torg (Stockholm)@X=18064327@Y=59332563@U=74@L=300101000@',
    mainMastExtId: '300101000',
  },
  JourneyDetailRef: {
    ref: '1|6859|0|74|8112017',
  },
  JourneyStatus: 'P',
  Product: {
    name: 'TUNNELBANA 19',
    num: '10603',
    line: '19',
    catOut: 'METRO ',
    catIn: 'MET',
    catCode: '1',
    catOutS: 'MET',
    catOutL: 'TUNNELBANA ',
    operatorCode: 'SL',
    operator: 'Storstockholms Lokaltrafik',
    admin: '106019',
  },
  idx: '0',
  name: 'TUNNELBANA 19',
  number: '10603',
  category: 'MET',
  type: 'JNY',
  reachable: true,
  direction: 'Hässelby strand',
};

describe('{unit}: model/Leg', () => {
  it('should have correct properties after instantiation', () => {
    const leg = new Leg(legData);
    expect(leg).to.have.all.keys(
      'from',
      'to',
      'departureTime',
      'arrivalTime',
      'departureDate',
      'arrivalDate',
      'direction',
      'transportationType',
    );
  });
  it('should throw a TypeError if instantiated with invalid leg data', () => {
    const getInstance = () => new Leg(JSON.stringify(legData));
    expect(getInstance).to.throw(TypeError, 'Leg data must be provided in the form { Origin, Destination }');
  });
  it('should throw a TypeError if instantiated with undefined value', () => {
    const getInstance = () => new Leg(undefined);
    expect(getInstance).to.throw(TypeError, 'Leg data must be provided in the form { Origin, Destination }');
  });
});
