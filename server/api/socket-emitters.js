const Message = require('../models/Message');

async function emitNewMessages(socket) {
  const { user } = socket;
  const newMessages = await Message.find({
    users: user._id,
    sender: { $ne: user._id },
    'message.read': false,
  });
  socket.emit('SET_NEW_MESSAGES', newMessages);
}

module.exports = {
  emitNewMessages,
};
