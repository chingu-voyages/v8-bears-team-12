const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const { SECRET } = process.env;

function addJwtCookie(res, objId) {
    const maxAge = 86400000;
    const expiresIn = '1d';
    const token = jwt.sign({ sub: objId.toString() }, SECRET, { expiresIn });
    res.cookie('jwt', token, { maxAge, httpOnly: true });
}

module.exports = app => {
    app.post('/api/login', async (req, res) => {
        const { username, password } = req.body;
        console.log(req.body);
    
        try {
          if (!username || !password) throw new Error('username or password empty');
          const user = await User.findOne({ name: username });
          if (!user) throw new Error(`Unable to find username: ${username}`);
    
          let same = await bcrypt.compare(password, user.password);
          if (!same) throw new Error(`Invalid password for ${username}`);
    
          addJwtCookie(res, user._id)
          res.send('Ok');
        } catch (err) {
          console.log(err.message);
          res.status(401).send('Unauthorized');
        }
      });
}