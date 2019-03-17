const mongoose = require('mongoose');

const { NODE_ENV, ATLAS_DBURI } = process.env;
const URI = NODE_ENV === 'test' ? global.__MONGO_URI__ : ATLAS_DBURI;

async function DbConnection() {
  const ret = await mongoose.connect(URI, { useNewUrlParser: true });

  console.log('mongoose connected!');

  return ret;
}

module.exports = DbConnection;
