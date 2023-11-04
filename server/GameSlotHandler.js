const { getDb } = require('./DataBase.js');
const { getIo } = require('./sockets.js');

/**
 * User interactions:
 * A player sends the id of the game they want to join in a joinGameSlotQueue event
 * A player cancels their request to join a game with a cancelGameQueue event
 */
class GameSlotHandler {
  constructor() {
    this.socket = getIo();
    this.dataBase = getDb();

    this.gameSlots = [];

    this.socket.on('connect', (instance) => 
      instance.on('joinGameSlotQueue', (data) => this.addPlayerToGameSlotQueue(instance.id, data)
    ));
  }
}

module.exports = GameSlotHandler;