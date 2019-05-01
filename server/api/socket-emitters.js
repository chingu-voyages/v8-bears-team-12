const Message = require('../models/Message');
const { ObjectId } = require('mongodb');

async function emitNewMessages(socket) {
  socket.on('REQUEST_NEW_MESSAGES', async () => {
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
  });
}

async function markAsRead(socket) {
  socket.on('MARK_AS_READ', async message => {
    console.log('marking message');
    await Message.updateOne(
      { _id: ObjectId(message.id) },
      { $set: { 'message.read': true } },
    );
  });
}

module.exports = {
  markAsRead,
  emitNewMessages,
};
