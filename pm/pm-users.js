let program = require("commander");

program
  .command("list", "user listing")
  .command("add <username> <email> <password>", "add a user")
  .command("rm <username>", "remove a user")
  .parse(process.argv);

!program.commands.map(cmd => cmd._name).includes(program.args[0]) &&
  program.help();
