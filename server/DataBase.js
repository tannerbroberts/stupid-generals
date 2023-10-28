const fs = require('fs')
const folderPath = './server/database/'
// A class that handles saving stringified JSON to a file by file name, and loading it back in

class DataBase {
  // Create the folders if they don't exist
  constructor() {
    // If the database's folder doesn't exist, create it
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
      // Create the users folder
      fs.mkdirSync(folderPath + '/users')
    }
  }

  getHallOfFame() {
    // If the hallOfFame file doesn't exist, create it
    if (!fs.existsSync(folderPath + 'hallOfFame.json')) {
      fs.writeFileSync(folderPath + 'hallOfFame.json', JSON.stringify(['no entries yet']))
      return [{ name: 'no entries yet', you: false }]
    }
    return JSON.parse(fs.readFileSync(folderPath + 'hallOfFame.json'))
  }

  loadUser(name) {
    if (!this.userProfileExists(name)) throw new Error(`using getUser on a user that doesn't exist`)
    const user = fs.readFileSync(getUserFolder(name))
    return JSON.parse(user)
  }

  login(loginEvent) {
    const { name, password } = loginEvent;
    // Check if the user exists
    if (!this.userProfileExists(name)) return false
    // Check if the password matches
    if (!this.userPasswordMatches(name, password)) return false

    return true
  }

  registerNewUser(registrationEvent) {
    const { name, password } = registrationEvent;
    // Check if the user exists
    if (this.userProfileExists(name)) return false
    // Create the user
    const user = { name, password }
    console.log('saving user', user)
    this.saveUser(user)
    return true
  }

  saveUser(user) {
    console.log('saveUser', user)
    if (!user.name) throw new Error(`using saveUser on a user that doesn't have a name`)
    if (!user.password) throw new Error(`using saveUser on a user that doesn't have a password`)
    fs.writeFileSync(getUserFolder(user.name), JSON.stringify(user))
  }

  userProfileExists(name) {
    if (!name) throw new Error(`using userProfileExists without a name argument`)
    return fs.existsSync(getUserFolder(name))
  }

  userPasswordMatches(name, password) {
    if (!this.userProfileExists(name)) throw new Error(`using userPasswordMatches on a user that doesn't exist`)
    const user = this.loadUser(name)
    return user.password === password
  }

}

function getUserFolder(name) {
  return `${folderPath}/users/${name}.json`
}

module.exports = DataBase
