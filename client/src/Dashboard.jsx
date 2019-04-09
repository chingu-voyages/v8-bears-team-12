import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiningMateSearch from './DiningMateSearch';
import DiningMateList from './DiningMateList';
import { logout } from './actionCreators';

function Dashboard({ logoutDispatch, name }) {
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
        { name }
      </h3>
      <DiningMateSearch doSearch={doSearch} />
      <DiningMateList diningMates={diningMates} />
      <button type="button" onClick={doLogout}>Logout</button>
    </div>
  );
}

Dashboard.propTypes = {
  name: PropTypes.string,
  logoutDispatch: PropTypes.func,
};

Dashboard.defaultProps = {
  name: '',
  logoutDispatch: () => {},
};

const mapStateToProps = state => ({
  name: state.name,
});

const mapDispatchToProps = {
  logoutDispatch: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
