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



}


module.exports = DataBase
