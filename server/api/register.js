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
    } = req.body.user;
  
    User.findOne({ email }).then((user) => {
      if (user) {
        return res.json({error: {message: 'Email already exists' }});
      } else {
        let user = new User({
          name,
          firstName,
          lastName,
          email,
          password,
          interests,
        });
        user.save().then((user) => res.json(user));
      }
    });
  });
}