const { Server: SocketIO } = require('socket.io')
let _io = null;

function getIo() {
  if (!_io) throw new Error('Must call startSocket before getIo')
  return _io
}

function startSocket(server) {
  _io = new SocketIO(server)
}

module.exports = {
  getIo, startSocket
}
