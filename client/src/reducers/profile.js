import { SET_PROFILE, REMOVE_PROFILE } from '../actionTypes';

const profile = (state = {}, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        ...action.payload,
        user: {},
        loggedIn: true,
        loading: false,
      };
    case REMOVE_PROFILE:
      return {
        loggedIn: false,
        loading: false,
        username: null,
      };
    default:
      return state;
  }
};

export default profile;
