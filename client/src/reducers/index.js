import actionTypes from '../actionTypes';

const { LOGIN, LOGOUT } = actionTypes;

const reducer = (state = { loggedIn: false, golden: 42 }, action) => {
  switch (action.type) {
    case LOGIN:
      return { loggedIn: true, username: action.username };
    case LOGOUT:
      return { loggedIn: false, username: null };
    default:
      return state;
  }
};

export default reducer;
