/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiningMateSearch from './DiningMateSearch';

function SetSearchArea({ searchCity, searchState, searchLocation }) {
  return (
    <div className="simple-card">
      <h1>Set Search Area</h1>
      <DiningMateSearch />
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <span>city: </span>
          {searchCity}
        </li>
        <li>
          <span>state: </span>
          {searchState}
        </li>
        <li>
          <span>location: </span>
          {JSON.stringify(searchLocation.coordinates)}
        </li>
      </ul>
    </div>
  );
}

SetSearchArea.propTypes = {
  searchCity: PropTypes.string,
  searchState: PropTypes.string,
  searchLocation: PropTypes.shape({
    type: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }),
};

SetSearchArea.defaultProps = {
  searchCity: '',
  searchState: '',
  searchLocation: { type: '', coordinates: [] },
};

const mapStateToProps = (state) => ({
  searchCity: state.profile.searchCity,
  searchState: state.profile.searchState,
  searchLocation: state.profile.searchLocation,
});

export default connect(mapStateToProps)(SetSearchArea);
