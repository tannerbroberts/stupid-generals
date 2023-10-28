class StupidGenerals {
  constructor(socket, dataBase) {
    this.socket = socket;
    this.dataBase = dataBase;
    this.clients = [];
  }

  addClient(clientObject) {
    this.clients.push(clientObject);
  }

  getClients() {
    return this.clients
  }

  getClientsList() {
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
    this.socket.emit('clientsList', this.getClientsList());
  }
}

module.exports = StupidGenerals;