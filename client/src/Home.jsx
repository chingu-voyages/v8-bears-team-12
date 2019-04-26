import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './Login';
import Dashboard from './Dashboard';

function Home({ loggedIn, loading }) {
  if (loading) return <div>loading</div>;
  return <>{loggedIn ? <Dashboard /> : <Login />}</>;
}

const mapStateToProps = ({ profile }) => ({
  loggedIn: profile.loggedIn,
  loading: profile.loading,
});

Home.propTypes = {
  loggedIn: PropTypes.bool,
  loading: PropTypes.bool,
};

Home.defaultProps = {
  loggedIn: false,
  loading: true,
};

export default connect(
  mapStateToProps,
  null,
)(Home);
