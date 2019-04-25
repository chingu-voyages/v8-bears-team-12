import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import profile from './profile';
import snackbar from './snackbar';
import chat from './chat';

const reducer = combineReducers({
  snackbar,
  profile,
  form: formReducer,
  chat,
});

export default reducer;
