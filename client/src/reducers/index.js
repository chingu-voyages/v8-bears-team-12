import { SET_PROFILE, LOGOUT, GET_ERRORS } from '../actionTypes';

const reducer = (state = { user: {}, loggedIn: false, loading: true }, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case SET_PROFILE:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        loading: false,
      };
    case LOGOUT:
      return { loggedIn: false, loading: false, username: null };
    default:
      return state;
  }
};

export default reducer;
