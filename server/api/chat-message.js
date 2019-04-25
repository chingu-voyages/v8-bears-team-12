const { ObjectId } = require('mongodb');
const passport = require('passport');

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
        let message = new Message({
          message: {
            text,
            read: false,
          },
          users: [req.user._id, palObjId],
          sender: [req.user._id],
        });
        await message.save();
        res.end();
      } catch ({ message }) {
        res.send({ error: { message } });
      }
    },
  );
};
