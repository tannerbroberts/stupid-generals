const Player = require('./Player.js');
const GameSlotHandler = require('./GameSlotHandler.js');
const { getIo } = require('./sockets.js');

/**
  * User interactions:
  * A player logs in
  * A player registers
  * A player logs out
 */
class StupidGenerals {
  constructor(db) {
    this.socket = getIo();
    this.db = db;
    this.loggedInClients = [];
    this.gameSlotHandler = new GameSlotHandler();
    this.socket.on('connection', (instance) => {
      instance.on('login', (data) => this.attemptToLogin(instance.id, data))
      instance.on('register', (data) => this.attemptToRegisterClient(instance.id, data))
      instance.on('loggout', () => this.loggout(instance.id))
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
    if (this.getLoggedInClients().find((client) => client.name === name)) {
      this.socket.to(socketId).emit('loginFailure');
      return;
    }
    // Check the database for the client's name and password
    if (this.db.login(loginEvent)) {
      this.socket.to(socketId).emit('loginSuccess');
      const loggedInClient = { name, socketId };
      this.setLoggedInClients(loggedInClient, 'add')
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
    if (this.db.registerNewUser(registrationEvent)) {

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

  getLoggedInClients() {
    return [...this.loggedInClients]
  }

  getUserNamesList(name) {
    if (!name) throw new Error('getUserNamesList name is undefined');

    return this.getLoggedInClients().map((client) => client.name === name ? { name: client.name, you: true } : { name: client.name, you: false });
  }

  loggout(socketId) {
    if (!socketId) throw new Error('loggout socketId is undefined');

    const client = this.getLoggedInClients().find((client) => client.socketId === socketId);
    if (client) {
      this.setLoggedInClients(client, 'remove')
      this.socket.to(socketId).emit('logout');
    }
  }

  removeStaleClients() {
    // If a client's socket connection is closed, remove them from the loggedInClients array
    this.getLoggedInClients().forEach((client) => {
      const socket = this.socket.sockets.sockets.get(client.socketId);
      if (socket) return;
      console.log(`removing stale client ${client.name}`);
      this.setLoggedInClients(client, 'remove')
    });
  }

  start() {
    this.intervalIntegerId = setInterval(() => {
      this.tick();
      this.tickCount++;
    }, 1000 / 1)
  }

  stop() {
    clearInterval(this.intervalIntegerId);
    //send a logout event to all loggedInClients
    this.getLoggedInClients().forEach((client) => {
      this.socket.to(client.socketId).emit('logout');
    });
  }

  tick(tickCount) {

    this.removeStaleClients();

    // emit the user names list to all logged in loggedInClients
    this.getLoggedInClients().forEach((client) => {
      this.socket.to(client.socketId).emit('userNamesList', this.getUserNamesList(client.name));
      if (tickCount % 60 === 0) this.socket.to(client.socketId).emit('hallOfFame', this.getHallOfFame(client.name));
    });

    // this.gameSlotHandler.tick(tickCount);
  }

  setLoggedInClients(client, action) {

    if (action !== 'add' && action !== 'remove') throw new Error('setLoggedInClients action must be "add" or "remove"');
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