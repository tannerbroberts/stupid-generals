class Map {
  constructor(config) {
    const { size, cityConcentration, mountainConcentration, swampConcentration, fogOfWar } = config;
    this.size = size;
    this.cityConcentration = cityConcentration;
    this.mountainConcentration = mountainConcentration;
    this.swampConcentration = swampConcentration;
    this.fogOfWar = fogOfWar;
  }

  at(x, y) {
    return this.size * y + x;
  }
}

module.exports = Map;