const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const { getUserById } = require('./utils');
const { SECRET } = process.env;

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
      const user = await getUserById(sub);

      done(null, user || false);
    } catch (err) {
      done(err, false);
    }
  }),
);

function authHandlers(app) {
  require('./api/register')(app);
  require('./api/login')(app);
  require('./api/reset')(app);
  require('./api/profile')(app);
  require('./api/logout')(app);
  require('./api/forgot')(app);
  require('./api/restaurant-search')(app);
  require('./api/restaurant-choice')(app);
  require('./api/profile-photo-upload')(app);
  require('./api/profile-photo')(app);
  require('./api/city-choices')(app);
  require('./api/set-search-location')(app);
  require('./api/dining-mates')(app);

  require('./api/chat-add')(app);
  require('./api/chat-remove')(app);
  require('./api/chat-message')(app);
  require('./api/chat-messages')(app);

  require('./api/admin')(app);
}

module.exports = authHandlers;
