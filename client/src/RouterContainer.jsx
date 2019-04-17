import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Home from './Home';
import Profile from './Profile';
import Register from './Register';
import RestaurantPicker from './RestaurantPicker';
import NotFound from './NotFound';
import Forgot from './Forgot';

import { setProfileThunk } from './actionCreators';

function RouterContainer({ loggedIn, dispatchSetProfileThunk }) {
  useEffect(() => {
    dispatchSetProfileThunk();
  }, [loggedIn]);

  return (
    <Router>
      <Header />

      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          {loggedIn ? <Route path="/profile" component={Profile} /> : null}
          {loggedIn ? null : <Route path="/register" component={Register} />}
          {loggedIn ? null : <Route path="/forgot" component={Forgot} />}
          {loggedIn ? <Route path="/restaurantPicker" component={RestaurantPicker} /> : null}
          <Route path="" component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}

RouterContainer.propTypes = {
  dispatchSetProfileThunk: PropTypes.func,
  loggedIn: PropTypes.bool,
};

RouterContainer.defaultProps = {
  dispatchSetProfileThunk: () => {},
  loggedIn: false,
};

const mapStateToProps = ({ profile }) => ({
  loggedIn: profile.loggedIn,
});

const mapDispatchToProps = {
  dispatchSetProfileThunk: setProfileThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouterContainer);
