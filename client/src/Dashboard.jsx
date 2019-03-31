import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiningMateSearch from './DiningMateSearch';
import DiningMateList from './DiningMateList';
import { logout } from './actionCreators';

function Dashboard({ logout }) {
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
    logout();
  }

  return (
    <div>
      <DiningMateSearch doSearch={doSearch} />
      <DiningMateList diningMates={diningMates} />
      <button type="button" onClick={doLogout}>Logout</button>
    </div>
  );
}

Dashboard.propTypes = {
  logout: PropTypes.func,
};

Dashboard.defaultProps = {
  logout: () => {},
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Dashboard);
