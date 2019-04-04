const mongoose = require('mongoose');

const { Schema } = mongoose;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const restaurantSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, unique: true, required: true },
  url: String,
  image_url: String,
  rating: Number,
  phone: String,
  coords: {
    type: pointSchema,
    required: false,
  },
  users: [{ type: [Schema.Types.ObjectId] }],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
