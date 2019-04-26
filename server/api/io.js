const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const { getUserById } = require('../utils');
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

      next();
    } catch (err) {
      next(err);
    }
  });

  io.on('connection', async socket => {
    const { user } = socket;

    socket.on('disconnect', socket => {
      console.log('disconnect');
    });
  });
};
