import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiningMateSearch from './DiningMateSearch';
import DiningMateList from './DiningMateList';
import { logout } from './actionCreators';

function Dashboard({ logoutDispatch, username }) {
  const diningMates = [];
  function usePosition(position) {
    console.log({ position }); // eslint-disable-line no-console
  }

  function doSearch(searchTerm) {
    if (searchTerm === true) {
      // do geolocation
      navigator.geolocation.getCurrentPosition(usePosition);
    }
  }

  async function doLogout() {
    await axios.get('/api/logout');
    logoutDispatch();
  }

  return (
    <div>
      <h3>
        Welcome,
        { ' ' }
        { username }
      </h3>
      <DiningMateSearch doSearch={doSearch} />
      <DiningMateList diningMates={diningMates} />
      <button type="button" onClick={doLogout}>Logout</button>
    </div>
  );
}

Dashboard.propTypes = {
  username: PropTypes.string,
  logoutDispatch: PropTypes.func,
};

Dashboard.defaultProps = {
  username: '',
  logoutDispatch: () => {},
};

const mapStateToProps = state => ({
  username: state.username,
});

const mapDispatchToProps = {
  logoutDispatch: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
