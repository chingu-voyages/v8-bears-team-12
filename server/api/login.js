const bcrypt = require('bcrypt');

const User = require('../models/User');
const { addJwtCookie } = require('../utils');

module.exports = (app) => {
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    try {
      if (!username || !password) throw new Error('username or password empty');
      const user = await User.findOne({ name: username });
      if (!user) throw new Error(`Unable to find username: ${username}`);

      if (!user.active)
        throw new Error('Please verify email before logging in');

      let same = await bcrypt.compare(password, user.password);
      if (!same) throw new Error(`Invalid password for ${username}`);

      addJwtCookie(res, user._id);
      res.send('Ok');
    } catch (err) {
      console.log(err.message);
      res.send({ error: { message: err.message } });
    }
  });
};
