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
  name: { type: String, required: true },
  address: { type: String, unique: true, required: true },
  location: {
    type: pointSchema,
    required: true,
  },
  users: [{ type: [Schema.Types.ObjectId] }],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
