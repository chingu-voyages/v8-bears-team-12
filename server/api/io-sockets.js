let sockets = {};

module.exports = {
  getSockets: userIds => {
    return userIds.flatMap(userId => sockets[userId]);
  },
  addSocket: socket => {
    const id = socket.user._id.toString();
    if (!sockets[id]) sockets[id] = [];
    sockets[id].push(socket);
  },
  removeSocket: socket => {
    const id = socket.user._id.toString();
    sockets[id] = sockets[id].filter(s => s.id !== socket.id);
  },
  getAllSockets: () => {
    return sockets;
  },
};
