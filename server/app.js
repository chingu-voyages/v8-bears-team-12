require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const es6Renderer = require('express-es6-template-engine');

const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const authHandlers = require('./authHandlers');
const User = require('./models/User');

const { NODE_ENV } = process.env;
const DEBUG = NODE_ENV === 'development';

const app = express();

if (DEBUG) {
  const compiler = webpack(webpackConfig);
  app.use(devMiddleware(compiler, {}));
  app.use(hotMiddleware(compiler));
}

if (!DEBUG) app.use(express.static('./client/build'));

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.engine('html', es6Renderer);
app.set('views', 'server/views');
app.set('view engine', 'html');

app.post('/api/register', (req, res) => {
  console.log({ theBody: req.body });
  const {
    firstName,
    lastName,
    name,
    email,
    password,
    interests,
  } = req.body.user;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      let user = new User({
        name,
        firstName,
        lastName,
        email,
        password,
        interests,
      });
      user.save().then((user) => res.json(user));
    }
  });
});

authHandlers(app);
app.get('*', (req, res) => {
  res.render('index', { locals: { DEBUG } });
});

module.exports = app;
