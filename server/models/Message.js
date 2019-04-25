const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    message: {
      text: { type: String, required: true },
      read: { type: Schema.Types.Boolean, required: true },
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Message', messageSchema);
