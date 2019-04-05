import { createStore } from 'redux';
import reducer from '../reducers';

const store = createStore(
  reducer,
  /* eslint-disable no-underscore-dangle */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable */
);
export default store;
