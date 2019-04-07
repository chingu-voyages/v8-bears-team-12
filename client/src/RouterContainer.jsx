import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Home from './Home';
import Profile from './Profile';
import Register from './Register';
import RestaurantPicker from './RestaurantPicker';

import { updateProfile } from './actionCreators';

function RouterContainer({ loggedIn, dispatchUpdateProfile }) {
  useEffect(() => {
    dispatchUpdateProfile();
  }, [loggedIn]);

  return (
    <Router>
      <Header />

      <main>
        <Route path="/" exact component={Home} />
        { loggedIn ? <Route path="/profile" component={Profile} /> : null }
        { loggedIn ? null : <Route path="/register" component={Register} /> }
        { loggedIn ? <Route path="/restaurantPicker" component={RestaurantPicker} /> : null }
      </main>
    </Router>
  );
}

RouterContainer.propTypes = {
  dispatchUpdateProfile: PropTypes.func,
  loggedIn: PropTypes.bool,
};

RouterContainer.defaultProps = {
  dispatchUpdateProfile: () => {},
  loggedIn: false,
};

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
});

const mapDispatchToProps = {
  dispatchUpdateProfile: updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);
