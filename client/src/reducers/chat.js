import {
  SET_CHAT_MESSAGES,
  ADD_CHAT_MESSAGE,
  CLEAR_CHAT_MESSAGES,
  SET_NEW_MESSAGES,
  MARK_MESSAGE_READ,
} from '../actionTypes';

const chat = (state = { messages: [], newMessages: [] }, action) => {
  switch (action.type) {
    case SET_CHAT_MESSAGES:
      return { ...state, messages: action.payload.messages };
    case ADD_CHAT_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    case CLEAR_CHAT_MESSAGES:
      return { ...state, messages: [] };
    case SET_NEW_MESSAGES:
      return { ...state, newMessages: action.payload.messages };
    case MARK_MESSAGE_READ:
      return {
        ...state,
        newMessages: state.newMessages.filter(e => false),
      };
    default:
      return state;
  }
};

export default chat;
