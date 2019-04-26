const passport = require('passport');
const { ObjectId } = require('mongodb');
const Message = require('../models/Message');

module.exports = app => {
  app.get(
    '/api/chat-messages/:palId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { palId } = req.params;
      try {
        const palObjId = ObjectId(palId);
        const messages = await Message.find(
          {
            users: { $all: [palObjId, req.user._id] },
          },
          { users: false, updatedAt: false, __v: false },
        ).populate({
          path: 'sender',
          select: 'name -_id',
        });
        await Message.updateMany(
          { users: { $all: [palObjId, req.user._id] }, sender: palObjId },
          { $set: { 'message.read': true } },
        );
        res.json({ messages });
      } catch ({ message }) {
        res.send({ error: { message } });
      }
    },
  );
};
