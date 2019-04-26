import io from 'socket.io-client';
import store from './store';
import { addChatMessage } from './actionCreators';

let socket;

export default {
  getInstance: () => {
    if (!socket) {
      socket = io();
      socket.on('NEW_CHAT_MESSAGE', message => {
        store.dispatch(addChatMessage(message));
      });
    }
    return socket;
  },
  disconnect: () => {
    if (socket) socket.disconnect();
    socket = null;
  },
};
