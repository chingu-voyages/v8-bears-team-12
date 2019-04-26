const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const { NODE_ENV, ATLAS_DBURI } = process.env;
const URI = NODE_ENV === "test" ? global.__MONGO_URI__ : ATLAS_DBURI;

function DbConnection() {
  return mongoose.connect(URI, { useNewUrlParser: true });
}

module.exports = DbConnection;
