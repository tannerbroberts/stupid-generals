const Game = require('./Game.js');

/**
 * User interactions:
 * A player sends the id of the game they want to join in a joinGameSlotQueue event
 * A player cancels their request to join a game with a cancelGameQueue event
 */
class GameSlotHandler {
  constructor(socket, dataBase) {
    this.socket = socket;
    this.dataBase = dataBase;

    this.
    this.gameSlots = [];

    socket.on('connect', (instance) => 
      instance.on('joinGameSlotQueue', (data) => this.addPlayerToGameSlotQueue(instance.id, data)
    ));
  }

  addPlayerToGameSlotQueue(socketId, data) {
    const { gameId } = data;

    // Check if the game slot exists
    const gameSlot = this.gameSlots.find((gameSlot) => gameSlot.getId() === gameId);
    if (!gameSlot) {
      this.socket.to(socketId).emit('toastError', `${gameId} is not a valid game id`);
      return;
    }

    // Add the gameId to the player's wish list of future games

  }

  getGameSlotIds() {
    return this.gameSlots.map((gameSlot) => gameSlot.getId());
  }

  // Listen for and handle requests to join a game slot queue
  // Tick all games
  // Create new game types
  // Tear down expired game types

  tick(tickCount, loggedInClients) {
    this.gameSlots.forEach(() => {

    })

    this.socket.emit('activeGames', this.getGameSlotIds())
    // tick all games

    // Remove games that are over
  }
}

module.exports = GameSlotHandler;