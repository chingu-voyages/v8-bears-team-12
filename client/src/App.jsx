import { hot } from 'react-hot-loader/root';
import React from 'react';
import './style.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import store from './store';
import Header from './Header';
import Home from './Home';
import Profile from './Profile';
import Register from './Register';
import RestaurantPicker from './RestaurantPicker';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Header />

          <main>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/restaurantPicker" component={RestaurantPicker} />
          </main>
        </>
      </Router>
    </Provider>
  );
}

export default hot(App);
