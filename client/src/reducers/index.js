import { combineReducers } from 'redux';
import actionTypes from '../actionTypes';

const { LOGIN, LOGOUT, SEARCH_RESTAURANTS } = actionTypes;

const reducer = (state = { loggedIn: false, loading: true }, action) => {
  switch (action.type) {
    case LOGIN:
      return { loggedIn: true, loading: false, username: action.username };
    case LOGOUT:
      return { loggedIn: false, loading: false, username: null };
    default:
      return state;
  }
};

const restaurantSearch = (state = { restaurantList: [] }, action) => {
  if (action.type === SEARCH_RESTAURANTS) {
    return { restaurantList: action.restaurants };
  }
  return state;
};

const rootReducer = combineReducers({
  reducer,
  restaurantSearch,
});

export default rootReducer;
