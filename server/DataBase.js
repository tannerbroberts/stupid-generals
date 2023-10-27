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

  // Save the password to a file named password.txt in a folder named after the user
  registerUser(userName, password) {
    // Check that the username and password are provided
    if (!userName || !password) throw new Error('Registration failed: Username or password not provided')

    // Check that the user's folder doesn't already exist
    const userPath = getUserFolderPath(userName)
    if (fs.existsSync(userPath)) throw new Error('Registration failed: User already exists')

    fs.mkdirSync(userPath)
    // Create the password file
    fs.writeFileSync(getUserPasswordFile(userName), password)
  }

  // Returns profile data
  login(userName, password) {
    // Check that the username and password are provided
    if (!userName || !password) throw new Error('Login failed: Username or password not provided')

    // Check that the user's folder exists
    const userPath = getUserFolderPath(userName)
    if (!fs.existsSync(userPath)) throw new Error('Login failed: User does not exist')

    // Check that the password file exists
    const passwordFile = getUserPasswordFile(userName)
    if (!fs.existsSync(passwordFile)) throw new Error('Login failed: User password file not exist')

    // Check that the password matches
    const savedPassword = fs.readFileSync(passwordFile, 'utf8')
    if (password !== savedPassword) throw new Error('Login failed: Password does not match')

    // Check that the profile file exists
    const profileFile = getUserProfileFile(userName)
    if (!fs.existsSync(profileFile)) throw new Error('Login failed: User profile file not exist')

    // Load the profile data and validate the profile data
    const profileData = fs.readFileSync(profileFile, 'utf8')
    const parsedProfileData = JSON.parse(profileData)
    if (!parsedProfileData) throw new Error('Login failed: User profile data not valid')

    // Return the profile data
    return parsedProfileData
  }
  // Throws erros
  save(userName, data) {
    // Check that the username and data are provided
    if (!userName || !data) return new Error('Save failed: Username or data not provided')

    // Check that the user's folder exists
    const userPath = getUserFolderPath(userName)
    if (!fs.existsSync(userPath)) return new Error('Save failed: User does not exist')

    // Stringify the data
    const stringifiedData = JSON.stringify(data)

    // Check for valid JSON
    if (!stringifiedData) return new Error('Save failed: Data not valid JSON')

    // Write the data to the file
    fs.writeFileSync(getUserProfileFile(userName), stringifiedData)
  }
}

function getUserFolderPath(username) {
  return folderPath + '/users/' + username
}

function getUserPasswordFile(username) {
  return getUserFolderPath(username) + '/password.txt'
}

function getUserProfileFile(username) {
  return getUserFolderPath(username) + '/profile.json'
}

function getFilePath(fileName) {
  return folderPath + '/files/' + fileName + '_file.txt'
}

module.exports = DataBase
