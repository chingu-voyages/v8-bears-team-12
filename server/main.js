// server.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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

const User = require('./models/User');
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
app.use(cookieParser());
app.use(express.json());

app.engine('html', es6Renderer);
app.set('views', 'server/views');
app.set('view engine', 'html');

app.get('/restaurant-search/:location/:term', async (req, res) => {
  const {term, location} = req.params;
  try {
    let response = await yelpSearch(term, location);
    res.status(200).json(response.data);
  } catch {
    res.status(500).send(err);
  }
});

app.post('/api/register', async (req, res) => {
  console.log({theBody: req.body});
  const {firstName, lastName, name, email, password, interests} = req.body.user;
  try {
    let user = new User({
      name,
      firstName,
      lastName,
      email,
      password,
      interests,
    });

    await user.save();
    res.send('ok');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
  
})

authHandlers(app);
app.get('*', (req, res) => {
  res.render('index', { locals: { DEBUG } });
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
