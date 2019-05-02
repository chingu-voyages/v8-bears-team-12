import { SET_RESTAURANTPICKER, CLEAR_RESTAURANTPICKER } from '../actionTypes';

const restaurantpicker = (
  state = { term: '', location: '', restaurants: [] },
  action
) => {
  const { term, location, restaurants } = action.payload || {};

  switch (action.type) {
    case SET_RESTAURANTPICKER:
      return {
        term,
        location,
        restaurants
      };
    case CLEAR_RESTAURANTPICKER:
      return {
        term: '',
        location: '',
        restaurants: []
      };
    default:
      return state;
  }
};

export default restaurantpicker;
