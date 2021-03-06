const passport = require('passport');
const User = require('../models/User');

module.exports = app => {
  app.get(
    '/api/profile',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
      res.json({ user: req.user });
    },
  );

  app.post(
    '/api/profile',
    passport.authenticate('jwt', { session: false }),
    async function(req, res) {
      const { name } = req.user;
      const {
        firstName,
        lastName,
        password,
        interests,
        dietRestrictions,
      } = req.body;
      const user = await User.findOne({ name });
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (password) user.password = password;
      if (interests) user.interests = interests;
      if (dietRestrictions) user.dietRestrictions = dietRestrictions;
      let result = await user.save();
      res.json(result);
    },
  );
};
