// server.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const es6Renderer = require('express-es6-template-engine');

const {NODE_ENV} = process.env;
const DEBUG = NODE_ENV === 'development';

if (!NODE_ENV) {
  // exit with status 1 if NODE_ENV is not defined
  console.error('NODE_ENV not defined');
  process.exit(1);
}

const app = express();

if (DEBUG) {
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../webpack.config.js');
  const compiler = webpack(webpackConfig);
  app.use(devMiddleware(compiler, {}));
  app.use(require('webpack-hot-middleware')(compiler));
}

if (!DEBUG) app.use(express.static('./client/build'));

app.engine('html', es6Renderer);
app.set('views', 'server/views');
app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('index', {locals: {DEBUG}});
});

// listen for requests :)
(async function() {
  await require('./connection');

  const listener = app.listen(process.env.PORT, function() {
    console.log(
      `NODE_ENV is ${NODE_ENV}. Your app is listening on port ` +
        listener.address().port,
    );
  });
})();
