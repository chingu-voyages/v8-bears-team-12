require("dotenv").config();
const User = require("../server/models/User");
const program = require("commander");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
program.parse(process.argv);

if (program.args.length !== 3) {
  console.error("3 arguments required: username, email, password");
  process.exit(1);
}
let [username, email, password] = program.args;

(async function() {
  let connection = await require("../server/db-connection")();
  const User = require("../server/models/User");

  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  let user = new User({ name: username, email, password: hashedPassword });
  try {
    let saveResult = await user.save();
    console.log({ saveResult });
  } catch (err) {
    console.error(err);
  }
  mongoose.connection.close();
  return;
})();
