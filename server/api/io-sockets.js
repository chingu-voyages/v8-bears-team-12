let sockets = [];

module.exports = {
  getSockets: userIds => {
    return sockets.filter(socket =>
      userIds.some(e => e.equals(socket.user._id)),
    );
  },
  addSocket: socket => {
    sockets.push(socket);
  },
  removeSocket: socket => {
    sockets = sockets.filter(e => !socket.user._id.equals(e.user._id));
  },
  getAllSockets: () => {
    return sockets;
  },
};
