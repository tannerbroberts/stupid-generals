const Player = require('./Player.js');
const Games = require('./Games.js');


class StupidGenerals {
  constructor(socket, dataBase) {
    this.socket = socket;
    this.dataBase = dataBase;
    this.loggedInClients = [];
    this.games = new Games(socket, dataBase);
    socket.on('connection', (socket) => {
      socket.on('login', (data) => this.attemptToLogin(socket.id, data))
      socket.on('register', (data) => this.attemptToRegisterClient(socket.id, data))
      socket.on('loggout', () => this.loggout(socket.id))
      // socket.on('disconnect', () => this.loggout(socket.id))
    });
  }

  attemptToLogin(socketId, loginEvent) {
    if (!socketId) throw new Error('attemptToLogin socketId is undefined');
    if (!loginEvent) throw new Error('attemptToLogin loginEvent is undefined');
    if (!loginEvent.name) console.log('login attempt missing name');
    if (!loginEvent.password) console.log('login attempt missing password');

    console.log('loginEvent', loginEvent)
    const { name } = loginEvent;

    // Check if the client is already logged in somewhere else
    if (this.loggedInClients.find((client) => client.name === name)) {
      this.socket.to(socketId).emit('loginFailure');
      return;
    }
    // Check the database for the client's name and password
    if (this.dataBase.login(loginEvent)) {
      this.socket.to(socketId).emit('loginSuccess');
      const loggedInClients = { name, socketId };
      this.updateClients(loggedInClients, 'add')
    } else {
      this.socket.to(socketId).emit('loginFailure');
    }
  }

  attemptToRegisterClient(socketId, registrationEvent) {
    if (!socketId) throw new Error('attemptToRegisterClient socketId is undefined');
    if (!registrationEvent) throw new Error('attemptToRegisterClient registrationEvent is undefined');
    if (!registrationEvent.name) console.log('registration attempt missing name');
    if (!registrationEvent.password) console.log('registration attempt missing password');

    const { name, password } = registrationEvent;
    // Check the database for the client's name
    if (this.dataBase.registerNewUser(registrationEvent)) {

      const registrationSuccessEvent = { name, password };
      this.socket.to(socketId).emit('registrationSuccess', registrationSuccessEvent);

      const loginEvent = { name, password };
      this.attemptToLogin(socketId, loginEvent);
    } else {
      this.socket.to(socketId).emit('loginFailure');
    }
  }

  getHallOfFame(name) {
    if (!name) throw new Error('getHallOfFame name is undefined');

    return this.dataBase.getHallOfFame().map((entry) => entry.name === name ? { name: entry, you: true } : { name: entry, you: false });
  }

  getUserNamesList(name) {
    if (!name) throw new Error('getUserNamesList name is undefined');

    return this.loggedInClients.map((client) => client.name === name ? { name: client.name, you: true } : { name: client.name, you: false });
  }

  loggout(socketId) {
    if (!socketId) throw new Error('loggout socketId is undefined');

    const client = this.loggedInClients.find((client) => client.socketId === socketId);
    if (client) {
      this.updateClients(client, 'remove')
      this.socket.to(socketId).emit('logout');
    }
  }

  removeStaleClients() {
    // If a client's socket connection is closed, remove them from the loggedInClients array
    this.loggedInClients.forEach((client) => {
      const socket = this.socket.sockets.sockets.get(client.socketId);
      if (socket) return;
      console.log(`removing stale client ${client.name}`);
      this.updateClients(client, 'remove')
    });
  }

  start() {
    this.intervalIntegerId = setInterval(() => {
      this.tick();
    }, 1000 / 1)
  }

  stop() {
    clearInterval(this.intervalIntegerId);
    //send a logout event to all loggedInClients
    this.loggedInClients.forEach((client) => {
      this.socket.to(client.socketId).emit('logout');
    });
  }

  tick() {

    this.removeStaleClients();

    // emit the user names list to all logged in loggedInClients
    this.loggedInClients.forEach((client) => {
      this.socket.to(client.socketId).emit('userNamesList', this.getUserNamesList(client.name));
      if (this.tickCount % 60 === 0) this.socket.to(client.socketId).emit('hallOfFame', this.getHallOfFame(client.name));
    });

    this.games.tick();
    this.tickCount++;
  }

  updateClients(client, action) {

    if (action !== 'add' && action !== 'remove') throw new Error('updateClients action must be "add" or "remove"');
    if (action === 'add') {
      this.loggedInClients.push(client)
      console.log(`+ [${this.loggedInClients.length}]`)
    } else if (action === 'remove') {
      this.loggedInClients = this.loggedInClients.filter((loggedInClients) => loggedInClients.name !== client.name);
      console.log(`- [${this.loggedInClients.length}]`)
    }
  }
}

module.exports = StupidGenerals;