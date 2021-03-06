require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const es6Renderer = require('express-es6-template-engine');

const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const authHandlers = require('./authHandlers');

const { NODE_ENV } = process.env;
const DEBUG = NODE_ENV === 'development';

const app = express();
const http = require('http').Server(app);

if (DEBUG) {
  const compiler = webpack(webpackConfig);
  app.use(devMiddleware(compiler, {}));
  app.use(hotMiddleware(compiler));
}

app.use('/static', express.static('./client/src/media'));
if (!DEBUG) app.use(express.static('./client/build'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('html', es6Renderer);
app.set('views', 'server/views');
app.set('view engine', 'html');

authHandlers(app);
require('./api/io')(http);

const adminRouter = express.Router();

adminRouter.get('*', (req, res) => {
  res.render('admin', { locals: { DEBUG } });
});

app.use('/admin', adminRouter);

app.get('*', (req, res) => {
  res.render('index', { locals: { DEBUG } });
});

module.exports = http;
