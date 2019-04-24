const passport = require('passport');
const { ObjectId } = require('mongodb');
const User = require('../models/User');

module.exports = app => {
  app.post(
    '/api/chat-add/:palId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { palId } = req.params;
      try {
        const palObjId = ObjectId(palId);
        if (palObjId.equals(req.user._id))
          throw new Error('Cannot talk to self');

        console.log({ palId });
        const pal = await User.findOne({ _id: palObjId });
        if (!pal) throw new Error('No such pal');
        if (!req.user.pals) req.user.pals = [];
        if (!req.user.pals.some(e => e.equals(palObjId)))
          req.user.pals.push(palObjId);
        console.log({ pals: req.user.pals });
        await req.user.save();
        res.end();
      } catch ({ message }) {
        res.send({ error: { message } });
      }
    },
  );
};
