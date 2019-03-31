import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import Login from './Login';
import Dashboard from './Dashboard';
import { login } from './actionCreators';
import store from './store';

async function fetchProfile() {
  try {
    await axios.get('/api/profile');
    store.dispatch(login());
  } catch (err) {
    console.log(err.message); // eslint-disable-line no-console
  }
}

function Home({ loggedIn }) {
  useEffect(() => {
    fetchProfile();
  });
  return <>{loggedIn ? <Dashboard /> : <Login />}</>;
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
});

const mapDispatchToProps = {
  login,
};

Home.propTypes = {
  loggedIn: PropTypes.bool,
};

Home.defaultProps = {
  loggedIn: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
