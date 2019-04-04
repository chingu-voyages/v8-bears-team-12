import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Header from './Header';
import Home from './Home';
import Profile from './Profile';
import Register from './Register';
import RestaurantPicker from './RestaurantPicker';

import { login, logout } from './actionCreators';

function RouterContainer({ loggedIn, dispatchLogin, dispatchLogout }) {
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get('/api/profile');
        const { data } = response;
        const { user } = data;
        const { name } = user;
        dispatchLogin(name);
      } catch (err) {
        dispatchLogout();
        console.log(err.message); // eslint-disable-line no-console
      }
    }
    fetchProfile();
  }, [loggedIn]);

  return (
    <Router>
      <Header />

      <main>
        <Route path="/" exact component={Home} />
        { loggedIn ? <Route path="/profile" component={Profile} /> : null }
        <Route path="/register" component={Register} />
        { loggedIn ? <Route path="/restaurantPicker" component={RestaurantPicker} /> : null }
      </main>
    </Router>
  );
}

RouterContainer.propTypes = {
  dispatchLogin: PropTypes.func,
  dispatchLogout: PropTypes.func,
  loggedIn: PropTypes.bool,
};

RouterContainer.defaultProps = {
  dispatchLogin: () => {},
  dispatchLogout: () => {},
  loggedIn: false,
};

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
});

const mapDispatchToProps = {
  dispatchLogin: login,
  dispatchLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);
