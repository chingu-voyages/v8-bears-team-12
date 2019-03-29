const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {SECRET} = process.env;

const User = require('./models/User');

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    console.log(jwt_payload);

    try {
        const {sub} = jwt_payload;
        const user = await Users.findOne({name: sub});
        done(null, user || false);
    } catch(err) {
        done(err, false);
    }
}));

function authHandlers(app) {
    app.post('/api/login', async (req, res) => {
        const {username, password} = req.body;
        console.log(req.body);
    
        try {
          if(!username || !password) throw new Error('username or password empty');
          const user = await User.findOne({name: username});
          if(!user) throw new Error(`Unable to find username: ${username}`);
            
          let same = await bcrypt.compare(password, user.password);
          if (!same) throw new Error(`Invalid password for ${username}`);
    
          const maxAge = 86400000;
          const expiresIn = '1d';
          const token = jwt.sign({sub: username}, SECRET, {expiresIn});
          res.cookie('jwt', token, {maxAge, httpOnly: true})
          res.send('Ok');
        } catch(err) {
          console.log(err.message);
          res.status(401).send('Unauthorized');
        }
      });

    app.get('/api/profile', passport.authenticate('jwt', { session: false }),
        function(req, res) {
            res.json({user: req.user});
        }
    );
}

module.exports = authHandlers;