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
	/** The lobby should:
	 * 1. Show the user's name in multiple lists
	 *   a. List of all users sorted alphabetically (also shows how many challenges currently waiting for them)
	 *   b. Two lists that shuffle their map dimensions every thirty minutes
	 *     i. Map size
	 *     ii. Number of players
	 *     iii. Team size
	 *     iv. Castle density
	 *     v. Fog of war
	 *     vi. Swamp density
	 *     vii. Mountain density
			 NOTE: the user shows below the bottom line in each list if they have not played a game yet
	 * 2. Show a loop of the replay from the winner's perspective of the last game won by the player that won the last challenge in each game mode
	 * 3. Show a hall of fame for each past game mode
	 * 4. Show a chat with the most recent messages in larger text than the rest
	 */
	/** Steps to sign in:
	 * 1. Ask for the users name
	 * 2. Start the first-time player tutorial
	 */
	/** Steps to create a challenge:
	 * 1. Ask the user for details
	 *   a. Who do you want to challenge?
	 *   b. Inform the user on the current status of the challenge, including their place in the queue for that game mode
	 *   c. If the user cancels the challenge, return to the previous screen and remove the challenge from the challengee's queue
	 */
	/** When a challenge has been accepted:
	 * 1. Immediately begin the challenge between the two players
	 * 2. Send each player's game state to them just like a regular generals.io game
	 * 3. Set match count updates for all to be seen all throughout the challenge
	 */

	socket.on('disconnect', () => { stupidGenerals.removeClient(socket.id) })
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
	process.exit()
})

// Start the server
const port = process.env.PORT || 8001
server.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
