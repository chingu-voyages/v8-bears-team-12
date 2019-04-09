import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiningMateSearch from './DiningMateSearch';
import DiningMateList from './DiningMateList';
import { logoutThunk } from './actionCreators';

function Dashboard({ dispatchLogoutThunk, name }) {
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

  return (
    <div>
      <h3>
        Welcome,
        { ' ' }
        { name }
      </h3>
      <DiningMateSearch doSearch={doSearch} />
      <DiningMateList diningMates={diningMates} />
      <button type="button" onClick={dispatchLogoutThunk}>Logout</button>
    </div>
  );
}

Dashboard.propTypes = {
  name: PropTypes.string,
  dispatchLogoutThunk: PropTypes.func,
};

Dashboard.defaultProps = {
  name: '',
  dispatchLogoutThunk: () => {},
};

const mapStateToProps = state => ({
  name: state.name,
});

const mapDispatchToProps = {
  dispatchLogoutThunk: logoutThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
