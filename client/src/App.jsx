import { hot } from 'react-hot-loader/root';
import React from 'react';
import './style.css';

import { Provider } from 'react-redux';

import RouterContainer from './RouterContainer';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <RouterContainer />
    </Provider>
  );
}

export default hot(App);
