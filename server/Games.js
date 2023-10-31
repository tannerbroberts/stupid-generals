const Game = require('./Game.js');

class Games {
  constructor(socket, dataBase) {
    this.games = [];

    const config = {
      socketIds: ['socket1', 'socket2'],
      mapSize: 10,
      cityConcentration: 0.05,
      mountainConcentration: 0.05,
      swampConcentration: 0.05,
      fogOfWar: false,
    }
    this.games.push(new Game(socket, dataBase, config));
    this.socket = socket;
    this.dataBase = dataBase;
  }

  initializeNewGame(clientIds) {
    // Create a new game instance

    // Tell the clients they're in the game and start sending updates

    // Listen for client moves

    // 
  }

  removeGame(gameId) {
    // Record the results

    // Send the results to the clients

    // Remove the game from the games array
  }

  tick() {
    // tick all games

    // Remove games that are over
  }
}

module.exports = Games