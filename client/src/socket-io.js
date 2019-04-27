import io from 'socket.io-client';
import store from './store';

import { ADD_CHAT_MESSAGE } from './actionTypes';

let socket;

const addChatMessage = message => ({
  type: ADD_CHAT_MESSAGE,
  payload: { message },
});

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
