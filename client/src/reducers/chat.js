import { SET_CHAT_MESSAGES, ADD_CHAT_MESSAGE } from '../actionTypes';

const chat = (state = { messages: [] }, action) => {
  switch (action.type) {
    case SET_CHAT_MESSAGES:
      return { messages: action.payload.messages };
    case ADD_CHAT_MESSAGE:
      return { messages: [...state.messages, action.payload.message] };
  }
  return state;
};

export default chat;
