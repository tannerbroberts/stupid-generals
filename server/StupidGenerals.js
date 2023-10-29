const Player = require('./Player.js');
const Games = require('./Games.js');


class StupidGenerals {
  constructor(socket, dataBase) {
    this.socket = socket;
    this.dataBase = dataBase;
    this.clients = [];
    this.games = new Games();
  }

  attemptToLogin(loginEvent) {
    const { name, password, socketId } = loginEvent;

    // Check if the client is already logged in somewhere else
    if (this.clients.find((client) => client.name === name)) {
      console.log('loginFailure event emitted');
      this.socket.to(socketId).emit('loginFailure');
      return;
    }
    // Check the database for the client's name and password
    if (this.dataBase.login(loginEvent)) {
      console.log('loginSuccess event emitted');
      this.socket.to(socketId).emit('loginSuccess');
      this.clients.push(new Player(name, socketId));
    } else {
      console.log('loginFailure event emitted');
      this.socket.to(socketId).emit('loginFailure');
    }
  }

  attemptToRegisterClient(registrationEvent) {
    const { name, password, socketId } = registrationEvent;
    // Check the database for the client's name
    if (this.dataBase.registerNewUser(registrationEvent)) {
      this.socket.to(socketId).emit('registrationSuccess', { name, password });

      const loginEvent = { name, password, socketId };
      this.attemptToLogin(loginEvent);
    } else {
      this.socket.to(socketId).emit('loginFailure');
    }
  }

  getClients() {
    return this.clients
  }

  getHallOfFame(name) {
    return this.dataBase.getHallOfFame().map((entry) => entry.name === name ? { name: entry, you: true } : { name: entry, you: false });
  }

  getUserNamesList(name) {
    return this.getClients().map((client) => client.name === name ? { name: client.name, you: true } : { name: client.name, you: false });
  }

  removeClient(socketId) {
    this.clients = this.clients.filter((client) => client.socketId !== socketId);
  }

  removeStaleClients() {
    this.clients.forEach((client) => {
      const socket = this.socket.sockets.connected[client.socketId];
      if (!socket || !socket.connected) {
        this.removeClient(client.socketId);
      }
    });
  }

  start() {
    this.intervalIntegerId = setInterval(() => {
      this.tick();
    }, 1000 / 1)
  }

  stop() {
    clearInterval(this.intervalIntegerId);
    //send a logout event to all clients
    this.clients.forEach((client) => {
      this.socket.to(client.socketId).emit('logout');
    });
  }

  tick() {
    // emit the user names list to all logged in clients
    this.clients.forEach((client) => {
      this.socket.to(client.socketId).emit('userNamesList', this.getUserNamesList(client.name));
      if (this.tickCount % 60 === 0) this.socket.to(client.socketId).emit('hallOfFame', this.getHallOfFame(client.name));
    });

    this.games.tick();
    this.tickCount++;
  }
}

module.exports = StupidGenerals;