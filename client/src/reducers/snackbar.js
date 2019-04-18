import { SET_SNACKBAR, REMOVE_SNACKBAR } from '../actionTypes';

const snackbar = (state = { open: false, message: '' }, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        open: true,
        message: action.message,
      };
    case REMOVE_SNACKBAR:
      return {
        open: false,
        message: '',
      };
    default:
      return state;
  }
};

export default snackbar;
