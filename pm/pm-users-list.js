require("dotenv").config();
const User = require("../server/models/User");
var program = require("commander");
var mongoose = require("mongoose");
program.parse(process.argv);

if (program.args.length !== 0) {
  console.error("Too many arguments");
  process.exit(1);
}

(async function() {
  let connection = await require("../server/db-connection")();

  let result = await User.find({});
  console.log(result);
  mongoose.connection.close();
  return;
})();
