const User = require('../models/User');
const { ObjectId } = require('mongodb');
const { addJwtCookie } = require('../utils');

module.exports = (app) => {
  app.get('/api/reset/:id/:token', async (req, res) => {
    const { id, token } = req.params;

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    try {
      const user = await User.findOne({
        _id: ObjectId(id),
        resetPasswordToken: token,
        resetPasswordExpires: { $gte: today },
      });
      if (!user) throw new Error('Access Denied');

      addJwtCookie(res, user._id);
      //res.json({ id, token });
      res.redirect('/');
    } catch (err) {
      res.status(401).send(err.message);
    }
  });
};
