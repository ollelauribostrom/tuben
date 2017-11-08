export default class Journey {

  constructor({ Origin, Destination } = {}) {
    if (!Origin || !Destination) {
      throw new TypeError('Journey data must be provided in the form { Origin, Destination }');
    }

    this.from = Origin.name;
    this.to = Destination.name;
    this.departureTime = Origin.time;
    this.arrivalTime = Destination.time;
    this.departureDate = Origin.date;
    this.arrivalDate = Destination.date;
  }
}
