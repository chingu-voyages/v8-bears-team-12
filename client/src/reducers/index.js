import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import profile from './profile';
import snackbar from './snackbar';

const reducer = combineReducers({
  snackbar,
  profile,
  form: formReducer,
});

export default reducer;
