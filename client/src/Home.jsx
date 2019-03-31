import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import Login from './Login';
import Dashboard from './Dashboard';
import { login, logout } from './actionCreators';
import store from './store';

async function fetchProfile() {
  try {
    const response = await axios.get('/api/profile');
    const { data } = response;
    const { user } = data;
    const { name } = user;
    store.dispatch(login(name));
  } catch (err) {
    store.dispatch(logout());
    console.log(err.message); // eslint-disable-line no-console
  }
}

function Home({ loggedIn, loading }) {
  useEffect(() => {
    fetchProfile();
  }, []);
  if (loading) return <div>loading</div>;
  return <>{loggedIn ? <Dashboard /> : <Login />}</>;
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  loading: state.loading,
});

Home.propTypes = {
  loggedIn: PropTypes.bool,
  loading: PropTypes.bool,
};

Home.defaultProps = {
  loggedIn: false,
  loading: true,
};

export default connect(mapStateToProps, null)(Home);
