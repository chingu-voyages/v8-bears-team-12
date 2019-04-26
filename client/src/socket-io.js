import io from 'socket.io-client';

let socket;

export default {
  getInstance: () => {
    if (!socket) socket = io();
    return socket;
  },
  disconnect: () => {
    console.log('disconnect attempt', { socket });
    if (socket) socket.disconnect();
    socket = null;
  },
};
