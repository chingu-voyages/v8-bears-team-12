const mongoose = require('mongoose');

const { Schema } = mongoose;
const PointSchema = require('./PointSchema');

const restaurantSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, unique: true, required: true },
  url: String,
  image_url: String,
  rating: Number,
  phone: String,
  coords: {
    type: PointSchema,
    required: false,
  },
  users: [{ type: [Schema.Types.ObjectId] }],
});

restaurantSchema.index({
  coords: '2dsphere',
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
