const { ObjectId } = require('mongodb');
const passport = require('passport');

const ioSockets = require('../api/io-sockets');
const Message = require('../models/Message');

module.exports = app => {
  app.post(
    '/api/chat-message/:palId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { palId } = req.params;
      const { text } = req.body;
      try {
        const palObjId = ObjectId(palId);
        const users = [req.user._id, palObjId];
        const message = new Message({
          message: {
            text,
            read: false,
          },
          users,
          sender: req.user._id,
        });
        const savedMessage = await message.save();
        const customMessage = await Message.populate(savedMessage, {
          path: 'sender',
          select: 'name -_id',
        });

        const currentMessage = {
          _id: customMessage._id,
          message: customMessage.message,
          sender: customMessage.sender,
          updatedAt: customMessage.updatedAt,
        };

        const sockets = ioSockets.getSockets(users);
        sockets.forEach(socket => {
          socket.emit('NEW_CHAT_MESSAGE', currentMessage);
        });

        console.log('got here');
        res.end();
      } catch ({ message }) {
        res.send({ error: { message } });
      }
    },
  );
};
