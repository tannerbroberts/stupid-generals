const Player = require('./Player');
const Map = require('./Map');

class Game {
  constructor(socket, dataBase, config) {
    this.socket = socket;
    this.dataBase = dataBase;

    const { socketIds, size, cityConcentration, mountainConcentration, swampConcentration, fogOfWar } = config;
    this.players = [];
    socketIds.forEach((socketId) => {
      this.players.push(new Player(socketId));
    });

    const mapConfig = { size, cityConcentration, mountainConcentration, swampConcentration, fogOfWar };
    this.map = new Map(mapConfig);

    this.tiles = this.generateTiles();
  }

  generateTiles() {
    // generate tiles based on mapSize and concentrations
    // return array of tiles
  }

  setPlayerMoves(socketId, playerMoves) {

  }

  tick() {
    // update game state based on player moves
  }
}

module.exports = Game;