import { LOGIN, LOGOUT } from '../actionTypes';

const reducer = (state = { loggedIn: false, loading: true }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: true,
        loading: false,
        username: action.username,
        restaurantsList: action.restaurantsList,
      };
    case LOGOUT:
      return { loggedIn: false, loading: false, username: null };
    default:
      return state;
  }
};

export default reducer;
