import { SET_LOADING, CLEAR_LOADING } from '../actionTypes';

const app = (state = { loading: false }, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { loading: true };
    case CLEAR_LOADING:
      return { loading: false };
    default:
      return state;
  }
};

export default app;
