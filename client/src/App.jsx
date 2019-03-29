import { hot } from 'react-hot-loader/root';
import React from 'react';
import './style.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Profile from './Profile';
import Register from './Register';
import RestaurantPicker from './RestaurantPicker';

function App() {
  return (
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
  );
}

export default hot(App);
