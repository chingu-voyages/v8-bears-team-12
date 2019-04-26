const app = require('./app');
const dbConnection = require('./db-connection');

const { NODE_ENV } = process.env;
const DEBUG = NODE_ENV === 'development';

if (!NODE_ENV) {
  console.error('NODE_ENV not defined');
  process.exit(1);
}

(async function runServer() {
  await dbConnection();

  // listen for requests :)
  const listener = app.listen(process.env.PORT, () => {
    console.log(
      `NODE_ENV is ${NODE_ENV}. Your app is listening on port ${
        listener.address().port
      }`,
    );
  });
}());
