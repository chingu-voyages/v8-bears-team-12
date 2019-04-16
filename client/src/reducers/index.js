import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import profile from './profile';

const reducer = combineReducers({
  profile,
  form: formReducer,
});

export default reducer;
