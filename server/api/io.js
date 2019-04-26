const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const { getUserById } = require('../utils');
const ioSockets = require('./io-sockets');
const { SECRET } = process.env;

module.exports = http => {
  const io = require('socket.io')(http);

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie);
    const token = cookies['jwt'];
    try {
      const payload = await jwt.verify(token, SECRET);
      const user = await getUserById(payload.sub);
      socket.user = user;

      ioSockets.addSocket(socket);
      console.log(ioSockets.getAllSockets());
      next();
    } catch (err) {
      next(err);
    }
  });

  io.on('connection', async socket => {
    socket.on('disconnect', () => {
      ioSockets.removeSocket(socket);
      console.log('disconnect');
    });
  });
};
