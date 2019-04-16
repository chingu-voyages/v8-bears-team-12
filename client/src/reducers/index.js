import { combineReducers } from 'redux';
import profile from './profile';

const reducer = combineReducers({
  profile,
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
