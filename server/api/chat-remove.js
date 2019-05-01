const passport = require('passport');
const { ObjectId } = require('mongodb');
const User = require('../models/User');

module.exports = app => {
  app.delete(
    '/api/chat-remove/:palId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { palId } = req.params;
      try {
        const palObjId = ObjectId(palId);

        req.user.pals = req.user.pals.filter(pal => !pal._id.equals(palObjId));
        await req.user.save();
        res.end();
      } catch ({ message }) {
        res.send({ error: { message } });
      }
    },
  );
};
