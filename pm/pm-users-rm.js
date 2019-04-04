require("dotenv").config();
const User = require("../server/models/User");
const program = require("commander");
const mongoose = require("mongoose");
program.parse(process.argv);

if (program.args.length !== 1) {
  console.error("1 argument required: username");
  process.exit(1);
}
let [username, email, password] = program.args;

(async function() {
  let connection = await require("../server/db-connection")();
  const User = require("../server/models/User");

  try {
    let result = await User.deleteOne({name: username});
    console.log({ result });
  } catch (err) {
    console.error(err);
  }
  mongoose.connection.close();
  return;
})();
