import io from 'socket.io-client';
import store from './store';

import { ADD_CHAT_MESSAGE, SET_NEW_MESSAGES } from './actionTypes';

let socket;

const addChatMessage = message => ({
  type: ADD_CHAT_MESSAGE,
  payload: { message },
});

const setNewMessages = messages => ({
  type: SET_NEW_MESSAGES,
  payload: { messages },
});

export default {
  getInstance: () => {
    if (!socket) {
      socket = io();
      socket.on('NEW_CHAT_MESSAGE', message => {
        store.dispatch(addChatMessage(message));
      });
      socket.on('SET_NEW_MESSAGES', messages => {
        store.dispatch(setNewMessages(messages));
      });
    }
    return socket;
  },
  disconnect: () => {
    if (socket) socket.disconnect();
    socket = null;
  },
};
