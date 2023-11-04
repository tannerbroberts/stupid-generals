const express = require('express')
const http = require('http')
const cors = require('cors')
const path = require('path')
const StupidGenerals = require('./StupidGenerals.js')
const { dataBaseConnect, getCollection, getDb } = require('./DataBase.js')
const { startSocket } = require('./sockets.js')

const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.static('client/public'))
express.static.mime.define({ 'application/json': ['map'] })

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/public/index.html'))
})

let stupidGenerals = null;

// Connect to the database first
const port = process.env.PORT || 8001
dataBaseConnect().then(() => {
	startSocket(server)
	// Once the database is connected, start the server
	server.listen(port, () => {
		console.log(`Server is running on port ${port}`)
		stupidGenerals = new StupidGenerals()
		stupidGenerals.start()
	})
})

// Listen for the interrupt signal (ctrl-c)
process.on('SIGINT', () => {
	console.log('\n\nstopping server, saving data... okay, not really, but eventually\n')
	stupidGenerals.stop()
	process.exit()
})
