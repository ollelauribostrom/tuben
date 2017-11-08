export default class Journey {

  constructor({ Origin, Destination }) {
    this.from = Origin.name;
    this.to = Destination.name;
    this.departureTime = Origin.time;
    this.arrivalTime = Destination.time;
    this.departureDate = Origin.date;
    this.arrivalDate = Destination.date;
  }
}
