/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiningMateSearch from './DiningMateSearch';
import DiningMateList from './DiningMateList';
import { logoutThunk } from './actionCreators';

function Dashboard({ dispatchLogoutThunk, name, searchCity, searchState, searchLocation }) {
  const diningMates = [];

  return (
    <div>
      <h3>
        Welcome,
        { ' ' }
        { name }
      </h3>
      <DiningMateSearch />
      <DiningMateList diningMates={diningMates} />
      <ul>
        <li>city: {searchCity}</li>
        <li>state: {searchState}</li>
        <li>location: {JSON.stringify(searchLocation.coordinates)}</li>
      </ul>
      <button type="button" onClick={dispatchLogoutThunk}>Logout</button>
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
  name: state.name,
  searchCity: state.searchCity,
  searchState: state.searchState,
  searchLocation: state.searchLocation,
});

const mapDispatchToProps = {
  dispatchLogoutThunk: logoutThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
