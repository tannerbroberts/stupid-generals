const express = require('express')
const http = require('http')
const { Server: SocketIO } = require('socket.io')
const cors = require('cors')
const path = require('path')
const Aether = require('./pages/Aether/Aether.js')
const DataBase = require('./DataBase.js')
// Create an express app

const app = express()
// Create a server and enable cors
const server = http.createServer(app)

app.use(cors())
app.use(express.static('client/public'))

// Define a mime type for .map files so I can serve the source maps
express.static.mime.define({ 'application/json': ['map'] })

// Define a single route for every URL (the react client does the routing)
app.get('*', (req, res) => {
	// send the react app's index.html file
	res.sendFile(path.join(__dirname, '../client/public/index.html'))
})



// All the socket event handlers
const io = new SocketIO(server)
const dataBase = new DataBase()

// Declare the aether instance (top level game object, main menu-ish)
const aether = new Aether(io, dataBase, 10)

// Listen for the interrupt signal (ctrl-c)
process.on('SIGINT', () => {
	console.log('\n\nstopping server, saving data... okay, not really, but eventually\n')
	aether.stop()
	process.exit()
})

// Start the server
const port = process.env.PORT || 8001
server.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
