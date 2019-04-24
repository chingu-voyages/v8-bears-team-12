/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import DiningMateList from './DiningMateList';
import { logoutThunk } from './actionCreators';

function Dashboard({ dispatchLogoutThunk, searchCity, searchState }) {
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
    <div className="dashboard-tab">
      <div className="search-area-info">
        <h4>Search Area: </h4>
        <div>
          {searchCity},{searchState}
        </div>
        <Link to="/set-search-area">
          <Button>Change</Button>
        </Link>
      </div>
      <DiningMateList diningMates={diningMates} />
      <button type="button" onClick={dispatchLogoutThunk}>
        Logout
      </button>
    </div>
  );
}

Dashboard.propTypes = {
  searchCity: PropTypes.string,
  searchState: PropTypes.string,
  searchLocation: PropTypes.shape({
    type: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }),
  dispatchLogoutThunk: PropTypes.func,
};

Dashboard.defaultProps = {
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
