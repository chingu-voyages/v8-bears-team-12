const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;
const PointSchema = require('./PointSchema');

const userSchema = new Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  firstName: String,
  lastName: String,
  password: String,
  active: Boolean,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  zipcode: String,
  image: Buffer,
  imageType: String,
  searchCity: String,
  searchState: String,
  searchLocation: { type: PointSchema },
  interests: [String],
  dietRestrictions: String,
  restaurantsList: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }]
});

userSchema.pre('save', async function(next) {
  var user = this;
  var SALT_FACTOR = 10;

  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch(err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
