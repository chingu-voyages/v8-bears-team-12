const Message = require('../models/Message');

async function emitNewMessages(socket) {
  const { user } = socket;
  let newMessages = await Message.find(
    {
      users: user._id,
      sender: { $ne: user._id },
      'message.read': false,
    },
    { users: false },
  ).populate({
    path: 'sender',
    select: 'name _id',
  });
  newMessages = newMessages.filter(e => e.sender);
  socket.emit('SET_NEW_MESSAGES', newMessages);
}

module.exports = {
  emitNewMessages,
};
