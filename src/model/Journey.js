export default class Journey {

  constructor(journeyData = {}) {
    this.from = journeyData.from;
    this.to = journeyData.to;
    this.departureTime = journeyData.departureTime;
    this.arrivalTime = journeyData.arrivalTime;
    this.departureDate = journeyData.departureDate;
    this.arrivalDate = journeyData.arrivalDate;
  }
}
