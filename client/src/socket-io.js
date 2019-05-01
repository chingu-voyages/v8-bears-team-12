import io from 'socket.io-client';
import store from './store';

import {
  ADD_CHAT_MESSAGE,
  SET_NEW_MESSAGES,
  MARK_MESSAGE_READ,
} from './actionTypes';

let socket;

const addChatMessage = message => ({
  type: ADD_CHAT_MESSAGE,
  payload: { message },
});

const setNewMessages = messages => ({
  type: SET_NEW_MESSAGES,
  payload: { messages },
});

const markMessageRead = id => ({
  type: MARK_MESSAGE_READ,
  payload: { id },
});

export default {
  getInstance: () => {
    if (!socket) {
      socket = io();
      socket.on('NEW_CHAT_MESSAGE', message => {
        const { router, profile } = store.getState();
        const { location } = router;
        const markRead =
          location === `/pal-chat/${message.sender._id}/${message.sender.name}`;

        const updatedMessage = message;
        if (markRead) {
          updatedMessage.message.read = true;
          store.dispatch(markMessageRead(updatedMessage._id));
          socket.emit('MARK_AS_READ', { id: message._id });
        } else if (message.sender._id !== profile._id) {
          socket.emit('REQUEST_NEW_MESSAGES');
        }
        if (markRead || message.sender._id === profile._id)
          store.dispatch(addChatMessage(updatedMessage));
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
