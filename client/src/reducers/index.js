import { SET_PROFILE, LOGOUT } from '../actionTypes';

const reducer = (state = { loggedIn: false, loading: true }, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...action.payload,
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
