let sockets = [];

module.exports = {
  getSockets: userIds => {
    return sockets.filter(socket => {
      return userIds.some(e => socket.user && e.equals(socket.user._id));
    });
  },
  addSocket: socket => {
    sockets.push(socket);
  },
  removeSocket: socket => {
    if (socket) {
      console.log(`removing ${socket.id}`);
      sockets = sockets.filter(e => socket.id !== e.id);
    }
    sockets = sockets.filter(e => e);
  },
  getAllSockets: () => {
    return sockets;
  },
};
