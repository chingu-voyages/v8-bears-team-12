const passport = require('passport');
const { getCityChoices } = require('../utils');

module.exports = app => {
  app.get('/api/city-choices/:searchterm', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { searchterm } = req.params;
      const choices = getCityChoices(searchterm);
      res.json(choices);
  });
}