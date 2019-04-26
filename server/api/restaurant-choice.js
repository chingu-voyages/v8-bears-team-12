const passport = require('passport');
const Restaurant = require('../models/Restaurant');
const { ObjectId } = require('mongodb');

module.exports = app => {
  app.post(
    '/api/restaurant-choice',
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
        let restaurantId = restaurant._id;
        if (restaurant.users.indexOf(req.user._id) == -1) {
          restaurant.users.push(req.user._id);
          let result = await restaurant.save();
          restaurantId = result._id;
        }
        if(req.user.restaurantsList.map(e => e._id.toString()).indexOf(restaurantId.toString()) === -1) {
          req.user.restaurantsList.push(restaurantId);
          await req.user.save();
          return res.send('Ok');
        }
        
        res.status(201).json('Restaurant already exists in your list');
      } catch (err) {
        res.status(500).send(err.message);
      }
    }
  );

  app.delete(
    '/api/restaurant-choice',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const {id} = req.body;
      try {
        const { restaurantsList } = req.user;
        const filtered = restaurantsList.filter(e => { return e._id.toString() !== id; });
        req.user.restaurantsList = filtered;
        await req.user.save();

        await Restaurant.updateOne({_id: ObjectId(id)}, { $pullAll: { users: [req.user._id]}});
        res.send('Ok');
      } catch(err) {
        res.status(500).send(err.message);
      }
    })
}