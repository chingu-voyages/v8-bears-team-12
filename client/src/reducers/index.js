import { LOGIN, LOGOUT } from '../actionTypes';

const reducer = (state = { loggedIn: false, loading: true }, action) => {
  switch (action.type) {
    case LOGIN:
      const { firstName, lastName, zipcode, interests, dietRestrictions } = action.payload;
      return {
        loggedIn: true,
        loading: false,
        username: action.username,
        firstName,
        lastName,
        zipcode,
        interests,
        dietRestrictions,
        restaurantsList: action.restaurantsList,
      };
    case LOGOUT:
      return { loggedIn: false, loading: false, username: null };
    default:
      return state;
  }
};

export default reducer;
