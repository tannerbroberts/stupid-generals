class StupidGenerals {
  constructor(socket, dataBase) {
    this.socket = socket;
    this.dataBase = dataBase;
    this.clients = [];
  }



  attemptToRegisterClient(registrationEvent) {
    const { name, password, socketId } = registrationEvent;
    const loginEvent = { name, password, socketId };
    // Check the database for the client's name
    if (this.dataBase.login(loginEvent)) {
      this.socket.to(socketId).emit('loginSuccess');
      this.clients.push(registrationEvent);
    } else {
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