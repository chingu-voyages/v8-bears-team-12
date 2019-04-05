const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { SECRET } = process.env;

const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const yelpSearch = require('./api/yelpSearch');

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
      const user = await User.findOne({ name: sub }, { password: false });
      done(null, user || false);
    } catch (err) {
      done(err, false);
    }
  })
);

function authHandlers(app) {
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    try {
      if (!username || !password) throw new Error('username or password empty');
      const user = await User.findOne({ name: username });
      if (!user) throw new Error(`Unable to find username: ${username}`);

      let same = await bcrypt.compare(password, user.password);
      if (!same) throw new Error(`Invalid password for ${username}`);

      const maxAge = 86400000;
      const expiresIn = '1d';
      const token = jwt.sign({ sub: username }, SECRET, { expiresIn });
      res.cookie('jwt', token, { maxAge, httpOnly: true });
      res.send('Ok');
    } catch (err) {
      console.log(err.message);
      res.status(401).send('Unauthorized');
    }
  });

  app.get(
    '/api/profile',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
      res.json({ user: req.user });
    }
  );

  app.post(
    '/api/profile',
    passport.authenticate('jwt', { session: false }),
    async function(req, res) {
      const { name } = req.user;
      const { password, zipcode, interests, dietRestrictions } = req.body;
      const user = await User.findOne({ name });
      if (password) user.password = password;
      if (zipcode) user.zipcode = zipcode;
      if (interests) user.interests = interests;
      if (dietRestrictions) user.dietRestrictions = dietRestrictions;
      let result = await user.save();
      res.json(result);
    }
  );

  app.get('/api/logout', (req, res) => {
    res.clearCookie('jwt', { httpOnly: true });
    res.send('');
  });

  app.get('/api/restaurant-search/:location/:term', async (req, res) => {
    const { term, location } = req.params;

    if(process.env.TESTDATA) return res.json(require('./fixtures/example-restaurants'));

    try {
      let response = await yelpSearch(term, location);
      const { businesses } = response.data;
      let results = businesses.map(business => {
        const {
          id,
          name,
          image_url,
          url,
          rating,
          location,
          coordinates,
          phone,
        } = business;

        return {
          id,
          name,
          image_url,
          url,
          rating,
          location: location.display_address.join(' '),
          coords: [coordinates.longitude, coordinates.latitude],
          phone,
        };
      });
      res.status(200).json(results);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post(
    '/api/restaurant-add',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const {
        id,
        name,
        image_url,
        url,
        rating,
        location,
        coords,
        phone,
      } = req.body.restaurant;

      let restaurant = await Restaurant.findOne({ id });

      if (!restaurant) {
        restaurant = new Restaurant({
          id,
          name,
          image_url,
          url,
          rating,
          location,
          coords: {type: 'Point', coordinates: coords},
          phone,
        });
      }

      try {
        if (restaurant.users.indexOf(req.user._id) == -1) {
          restaurant.users.push(req.user._id);
          let result = await restaurant.save();
          return res.json(result);
        }
        res.status(201).json('Restaurant already exists in your list');
      } catch (err) {
        res.status(500).send(err.message);
      }
    }
  );
}

module.exports = authHandlers;
