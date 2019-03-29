// server.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');

const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const dbConnection = require('./db-connection');
const authHandlers = require('./authHandlers');

const { NODE_ENV } = process.env;
const DEBUG = NODE_ENV === 'development';

const yelpSearch = require('./api/yelpSearch');

if (!NODE_ENV) {
  console.error('NODE_ENV not defined');
  process.exit(1);
}

const app = express();

if (DEBUG) {
  const compiler = webpack(webpackConfig);
  app.use(devMiddleware(compiler, {}));
  app.use(hotMiddleware(compiler));
}

if (!DEBUG) app.use(express.static('./client/build'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.engine('html', es6Renderer);
app.set('views', 'server/views');
app.set('view engine', 'html');

app.get('/restaurant-search/:location/:term', async (req, res) => {
  const {location, term} = req.params;
  let response = await yelpSearch(term, location);
  res.json(response.data);
})

authHandlers(app);

app.get('*', (request, response) => {
  response.render('index', { locals: { DEBUG } });
});

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
