const User = require('../models/User');

module.exports = app => {
  app.post('/api/register', (req, res) => {
    console.log({ theBody: req.body });
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      interests,
      dietRestrictions,
    } = req.body.user;
  
    User.findOne({ email }).then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        let user = new User({
          name,
          firstName,
          lastName,
          email,
          password,
          interests,
          dietRestrictions,
        });
        user.save().then((user) => res.json(user));
      }
    });
  });
}