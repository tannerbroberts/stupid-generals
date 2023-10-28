

const Player = require('./Player.js');


class StupidGenerals {
  constructor(socket, dataBase) {
    this.socket = socket;
    this.dataBase = dataBase;
    this.clients = [];
  }

  attemptToRegisterClient(registrationEvent) {
    const { name, password, socketId } = registrationEvent;
    // Check the database for the client's name
    if (this.dataBase.registerNewUser(registrationEvent)) {
      console.log('registerSuccess event emitted')
      this.socket.to(socketId).emit('registrationSuccess', { name, password });
      this.socket.to(socketId).emit('loginSuccess');
      this.clients.push(new Player(name, socketId));
    } else {
      console.log('registerFailure event emitted')
      this.socket.to(socketId).emit('loginFailure');
    }
  }

  getClients() {
    return this.clients
  }

  getUserNamesList() {
    return this.getClients().map((client) => client.name);
  }

  removeClient(socketId) {
    this.clients = this.clients.filter((client) => client.socketId !== socketId);
  }

  start() {
    this.intervalIntegerId = setInterval(() => {
      this.tick();
    }, 1000 / 2)
  }

  stop() {
    clearInterval(this.intervalIntegerId);
  }

  tick() {
    // send each client the list of connected clients
    console.log('sending clients list')
    this.socket.emit('userNamesList', this.getUserNamesList());
  }
}

module.exports = StupidGenerals;