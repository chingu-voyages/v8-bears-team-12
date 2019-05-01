import { SET_ROUTER_LOCATION, UNSET_ROUTER_LOCATION } from '../actionTypes';

const router = (state = { location: '' }, action) => {
  switch (action.type) {
    case SET_ROUTER_LOCATION:
      return { location: action.payload.location };
    case UNSET_ROUTER_LOCATION:
      return { location: '' };
    default:
      return state;
  }
};

export default router;
