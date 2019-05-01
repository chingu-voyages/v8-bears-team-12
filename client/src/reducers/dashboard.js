import { SET_DININGMATES, CLEAR_DININGMATES } from '../actionTypes';

const dashboard = (state = { diningMates: [] }, action) => {
  switch (action.type) {
    case SET_DININGMATES:
      return { diningMates: action.payload.diningMates };
    case CLEAR_DININGMATES:
      return { diningMates: [] };
    default:
      return state;
  }
};

export default dashboard;
