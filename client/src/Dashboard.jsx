/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import DiningMateSearch from './DiningMateSearch';
import DiningMateList from './DiningMateList';
import { logoutThunk } from './actionCreators';

function Dashboard({
  dispatchLogoutThunk,
  name,
  searchCity,
  searchState,
  searchLocation,
}) {
  const [diningMates, setDiningMates] = useState([]);

  useEffect(() => {
    const fetchDiningMates = async () => {
      const res = await axios.get('/api/dining-mates');
      setDiningMates(res.data.diningMatches);
    };
    if (searchCity) {
      fetchDiningMates();
    }
  }, [searchCity]);

  return (
    <div>
      <h3>Welcome, {name}</h3>
      <DiningMateSearch />
      <ul>
        <li>city: {searchCity}</li>
        <li>state: {searchState}</li>
        <li>location: {JSON.stringify(searchLocation.coordinates)}</li>
      </ul>
      <DiningMateList diningMates={diningMates} />
      <button type="button" onClick={dispatchLogoutThunk}>
        Logout
      </button>
    </div>
  );
}

Dashboard.propTypes = {
  name: PropTypes.string,
  searchCity: PropTypes.string,
  searchState: PropTypes.string,
  searchLocation: PropTypes.shape({
    type: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }),
  dispatchLogoutThunk: PropTypes.func,
};

Dashboard.defaultProps = {
  name: '',
  searchCity: '',
  searchState: '',
  searchLocation: { type: '', coordinates: [] },
  dispatchLogoutThunk: () => {},
};

const mapStateToProps = state => ({
  name: state.profile.name,
  searchCity: state.profile.searchCity,
  searchState: state.profile.searchState,
  searchLocation: state.profile.searchLocation,
});

const mapDispatchToProps = {
  dispatchLogoutThunk: logoutThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
