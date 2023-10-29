const Player = require('./Player');

class Game {
  constructor(socket, dataBase, configuration) {
    this.socket = socket;
    this.dataBase = dataBase;

    const { socketIds, mapSize, cityConcentration, mountainConcentration, swampConcentration, fogOfWar } = configuration;
    this.players = [];
    socketIds.forEach((socketId) => {
      this.players.push(new Player(socketId));
    });

    const mapConfig = { mapSize, cityConcentration, mountainConcentration, swampConcentration, fogOfWar };
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
