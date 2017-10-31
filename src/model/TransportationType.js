export default class TransportationType {

  static types = [
    { type: 'METRO', symbol: '🚇' },
    { type: 'BUS', symbol: '🚌' },
    { type: 'TRAIN', symbol: '🚆' },
    { type: 'TRAM', symbol: '🚋' },
    { type: 'FERRY', symbol: '⛴' },
    { type: 'SHIP', symbol: '🚢' },
  ];

  static defaultSymbol = '🔘';

  constructor(typeName) {
    this.type = typeName;
    this.symbol = TransportationType.getSymbolOfType(typeName);
  }

  static getSymbolOfType(typeName) {
    const type = TransportationType.types.find(t => t.type === typeName);
    return type ? type.symbol : TransportationType.defaultSymbol;
  }
}
