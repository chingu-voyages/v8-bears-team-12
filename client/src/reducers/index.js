import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import profile from './profile';

const reducer = combineReducers({
  profile,
  form: formReducer,
});

export default reducer;

// import { SET_PROFILE, LOGOUT } from '../actionTypes';

// const reducer = (state = { user: {}, loggedIn: false, loading: true }, action) => {
//   switch (action.type) {
//     case SET_PROFILE:
//       return {
//         ...state,
//         ...action.payload,
//         loggedIn: true,
//         loading: false,
//       };
//     case LOGOUT:
//       return { loggedIn: false, loading: false, username: null };
//     default:
//       return state;
//   }
// };

// export default reducer;
