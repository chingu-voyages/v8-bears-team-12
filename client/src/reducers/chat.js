import {
  SET_CHAT_MESSAGES,
  ADD_CHAT_MESSAGE,
  CLEAR_CHAT_MESSAGES,
} from '../actionTypes';

const chat = (state = { messages: [] }, action) => {
  switch (action.type) {
    case SET_CHAT_MESSAGES:
      return { messages: action.payload.messages };
    case ADD_CHAT_MESSAGE:
      return { messages: [...state.messages, action.payload.message] };
    case CLEAR_CHAT_MESSAGES:
      return { messages: [] };
    default:
      return state;
  }
};

export default chat;
