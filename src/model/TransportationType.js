export default class TransportationType {

  static types = [
    { name: 'METRO', symbol: '🚇' },
    { name: 'BUS', symbol: '🚌' },
    { name: 'TRAIN', symbol: '🚆' },
    { name: 'TRAM', symbol: '🚋' },
    { name: 'FERRY', symbol: '⛴' },
    { name: 'SHIP', symbol: '🚢' },
  ];

  static defaultSymbol = '🔘';

  constructor(typeName) {
    this.name = typeName;
    this.symbol = TransportationType.getSymbolByTypeName(typeName);
  }

  static getSymbolByTypeName(typeName) {
    const type = TransportationType.types.find(typeObject => typeObject.name === typeName);
    return type ? type.symbol : TransportationType.defaultSymbol;
  }
}
