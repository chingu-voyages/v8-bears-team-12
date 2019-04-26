const passport = require('passport');
const { getClosestCity } = require('../utils');

module.exports = app => {
  app.post('/api/set-search-location', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      let cityInfo = ['lat', 'lon', 'city', 'state', 'country']
        .reduce((acc,prop) => (acc[prop]=req.body[prop], acc), {});

      const { lat, lon, city } = cityInfo;
      if ( !lat || !lon ) return res.status(500).send('lat and lon required');

      if(!city) cityInfo = getClosestCity({lat, lon});

      req.user.searchCity = cityInfo.city;
      req.user.searchState = cityInfo.state;
      req.user.searchLocation = {type: 'Point', coordinates: [cityInfo.lon, cityInfo.lat]};
      await req.user.save();
      res.json({});
  });
}