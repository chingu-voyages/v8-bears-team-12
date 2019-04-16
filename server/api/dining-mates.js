const passport = require('passport');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

module.exports = (app) => {
  app.get('/api/dining-mates', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        let restaurants = await Restaurant.find({
          coords: {
            $near: {
              $geometry: req.user.searchLocation,
              $maxDistance: 10000,
            },
          }
        }, {_id: true, users: true});
    
        restaurants.forEach(result => { result.users = result.users.filter(e => !e.equals(req.user._id)); })
        restaurants = restaurants.filter( e => e.users.length );

        let userIds = new Set();
        restaurants.forEach(restaurant => {
          restaurant.users.forEach(userId => {
            userIds.add(userId);
            console.log(userId);
          })
        })
        userIds = [...userIds];
        const restaurantIds = restaurants.map(restaurant => restaurant._id).toString();

        const diningMatches = await User.find({_id: {$in: userIds}},
          {name: true, interests: true, dietRestrictions: true, restaurantsList: true}
          )
          .populate({path: 'restaurantsList', select: '-users -__v'});
        diningMatches.forEach(match => {
          match.restaurantsList = match.restaurantsList.filter(
            e => restaurantIds.indexOf(e._id.toString()) !== -1);
        });
        res.json({restaurantIds, userIds, diningMatches});
      } catch (err) {
        res.status(500).send(err.message);
      }
  });
}