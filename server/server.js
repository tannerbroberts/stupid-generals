const express = require('express')
const http = require('http')
const { Server: SocketIO } = require('socket.io')
const cors = require('cors')
const path = require('path')
const DataBase = require('./DataBase.js')
const StupidGenerals = require('./StupidGenerals.js')

const app = express()
// Create a server and enable cors
const server = http.createServer(app)

app.use(cors())
app.use(express.static('client/public'))

// Define a mime type for .map files so I can serve the source maps
express.static.mime.define({ 'application/json': ['map'] })

// Define a single route for every URL (the react client does the routing)
app.get('*', (req, res) => {
	// send the react index.html file
	res.sendFile(path.join(__dirname, '../client/public/index.html'))
})

// All the socket event handlers
const io = new SocketIO(server)
const dataBase = new DataBase()
const stupidGenerals = new StupidGenerals(io, dataBase)

io.on('connection', (socket) => {
	const socketId = socket.id

	socket.on('disconnect', () => { stupidGenerals.removeClient(socket.id) })
	socket.on('login', (data) => { stupidGenerals.attemptToLogin({ ...data, socketId }) })
	socket.on('register', (data) => { stupidGenerals.attemptToRegisterClient({ ...data, socketId }) })

	socket.on('sendChallenge', () => { })
	socket.on('acceptChallenge', () => { })
	socket.on('cancelChallenge', () => { })
	socket.on('declineChallenge', () => { })
	socket.on('clientMoves', () => { })
})

// Start the game
stupidGenerals.start()

// Listen for the interrupt signal (ctrl-c)
process.on('SIGINT', () => {
	console.log('\n\nstopping server, saving data... okay, not really, but eventually\n')
	stupidGenerals.stop()
	process.exit()
})

// Start the server
const port = process.env.PORT || 8001
server.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
