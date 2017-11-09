export default class Leg {

  constructor({ Origin, Destination, ...legData } = {}) {
    if (!Origin || !Destination) {
      throw new TypeError('Leg data must be provided in the form { Origin, Destination }');
    }

    this.from = Origin.name;
    this.to = Destination.name;
    this.departureTime = Origin.time;
    this.arrivalTime = Destination.time;
    this.departureDate = Origin.date;
    this.arrivalDate = Destination.date;
    this.direction = legData.direction;
    this.transportationType = legData.Product.catOut;
  }
}
