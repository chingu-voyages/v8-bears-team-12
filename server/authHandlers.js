const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const { ObjectId } = require('mongodb');

const { SECRET } = process.env;

const User = require('./models/User');

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET;

passport.use(
  new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
      const { sub } = jwt_payload;
      const user = await User.findOne({ _id: ObjectId(sub) }, { password: false })
        .populate({path: 'restaurantsList', select: '-users'});
      done(null, user || false);
    } catch (err) {
      done(err, false);
    }
  })
);

function authHandlers(app) {
  require('./api/login')(app);
  require('./api/profile')(app);
  require('./api/logout')(app);
  require('./api/restaurant-search')(app);
  require('./api/restaurant-choice')(app);
  require('./api/profile-photo-upload')(app);
  require('./api/profile-photo')(app);
  require('./api/city-choices')(app);
  require('./api/set-search-location')(app);
  require('./api/dining-mates')(app);
};

module.exports = authHandlers;
