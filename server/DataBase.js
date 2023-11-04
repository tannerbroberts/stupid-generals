const { MongoClient, ServerApiVersion } = require('mongodb');

const dataBaseURI = "mongodb+srv://root:0tanner1is2the3best4@nodecluster.cjoru.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(dataBaseURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let _db;
let _stupidGeneralsCollection;

const dataBaseName = 'tannerDatabase'
const collectionName = 'stupidGenerals'

async function dataBaseConnect() {

  try {
    // Don't do anything until the database is connected (through the use of async/await)
    await mongoClient.connect();
    _db = mongoClient.db(dataBaseName);
    _stupidGeneralsCollection = _db.collection(collectionName);
  } catch (err) {
    console.log(err.stack);
    await mongoClient.close();
  } finally {

  }
}

function getDb() {
  if (!_db) throw new Error('attemping to use database before connecting');
  return _db;
}

function getStupidGeneralsCollection() {
  if (!_stupidGeneralsCollection) throw new Error('attemping to use collection before instanciating');
  return _stupidGeneralsCollection;
}

module.exports = { dataBaseConnect, getDb, getStupidGeneralsCollection };