/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiningMateSearch from './DiningMateSearch';
import DiningMateList from './DiningMateList';
import { setSearchThunk, logoutThunk } from './actionCreators';

function Dashboard({ dispatchLogoutThunk, dispatchSetSearchThunk, name, searchCity, searchState, searchLocation }) {
  const diningMates = [];
  function usePosition(position) {
    const { coords: { latitude: lat, longitude: lon }} = position;
    dispatchSetSearchThunk({ lat, lon });
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
      <ul>
        <li>city: {searchCity}</li>
        <li>state: {searchState}</li>
        <li>location: {searchLocation}</li>
      </ul>
      <button type="button" onClick={dispatchLogoutThunk}>Logout</button>
    </div>
  );
}

Dashboard.propTypes = {
  name: PropTypes.string,
  searchCity: PropTypes.string,
  searchState: PropTypes.string,
  searchLocation: PropTypes.string,
  dispatchLogoutThunk: PropTypes.func,
  dispatchSetSearchThunk: PropTypes.func,
};

Dashboard.defaultProps = {
  name: '',
  searchCity: '',
  searchState: '',
  searchLocation: '',
  dispatchLogoutThunk: () => {},
  dispatchSetSearchThunk: () => {},
};

const mapStateToProps = state => ({
  name: state.name,
  searchCity: state.searchCity,
  searchState: state.searchState,
  searchLocation: state.searchLocation,
});

const mapDispatchToProps = {
  dispatchLogoutThunk: logoutThunk,
  dispatchSetSearchThunk: setSearchThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
