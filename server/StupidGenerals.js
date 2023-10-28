

const Player = require('./Player.js');


class StupidGenerals {
  constructor(socket, dataBase) {
    this.socket = socket;
    this.dataBase = dataBase;
    this.clients = [];
  }

  attemptToLogin(loginEvent) {
    const { name, password, socketId } = loginEvent;

    // Check if the client is already logged in somewhere else
    if (this.clients.find((client) => client.name === name)) {
      console.log('loginFailure event emitted');
      this.socket.to(socketId).emit('loginFailure');
      return;
    }
    // Check the database for the client's name
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

  getUserNamesList(name) {
    return this.getClients().map((client) => client.name === name ? { name: client.name, you: true } : { name: client.name, you: false});
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

    // emit the user names list to all logged in clients
    this.clients.forEach((client) => {
      this.socket.to(client.socketId).emit('userNamesList', this.getUserNamesList(client.name));
    });
  }
}

module.exports = StupidGenerals;