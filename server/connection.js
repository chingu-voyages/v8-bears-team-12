const {MongoClient} = require('mongodb');
const {NODE_ENV, ATLAS_DBURI, ATLAS_DBNAME} = process.env;

const UsersDAO = require('./dao/usersDAO');

const URI = NODE_ENV === 'test' ? global.__MONGO_URI__ : ATLAS_DBURI;
const DBNAME = NODE_ENV === 'test' ? global.__MONGO_DB_NAME__ : ATLAS_DBNAME;

let connection = MongoClient.connect(
  URI,
  {useNewUrlParser: true},
)
  .then(async client => {
    let resource = {};
    resource.client = client;
    resource.db = client.db(DBNAME);

    await resource.db.createIndex('users', {username: 1}, {unique: true});
    await resource.db.createIndex('users', {email: 1}, {unique: true});

    await UsersDAO.injectDB(resource);
    console.log('Database init success');

    return resource;
  })
  .catch(err => {
    console.error(err);
    //process.exit(1);
  });

module.exports = connection;
