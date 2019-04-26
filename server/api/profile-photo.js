const passport = require('passport');
const User = require('../models/User');

module.exports = app => {
  app.get('/api/profile-photo/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const {name} = req.params;
      const user = await User.findOne({name});
      if(!user || !user.imageType) throw new Error('Not Found');
      
      res.type(user.imageType);
      res.send(user.image);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
}