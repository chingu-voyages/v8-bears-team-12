import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setSearchLocation } from './actionCreators';

function DiningMateSearch({ dispatchSetSearchLocation }) {
  const [cities, setCities] = useState([]);

  function getCurrentPosition() {
    function usePosition(position) {
      const { coords: { latitude: lat, longitude: lon }} = position;
      dispatchSetSearchLocation({ lat, lon });
    }
    navigator.geolocation.getCurrentPosition(usePosition);
  }

  async function onChange(event) {
    if (event.target.value) {
      const res = await axios.get(`/api/city-choices/${event.target.value}`);
      setCities(res.data);
    } else {
      setCities([]);
    }
  }

  function handleClick(city) {
    dispatchSetSearchLocation(city);
  }

  return (
    <div>
      <div>
      <input type="text" onChange={onChange} />
      <button type="button" onClick={getCurrentPosition}>
        Current location
      </button>
      </div>
      <ul>
        { cities.map((city, i) => {
          return (
            <li key={i}><button onClick={() => handleClick(city)}>{city.city}, {city.state}</button></li>
          );
        })}
      </ul>
    </div>
  );
}

DiningMateSearch.propTypes = {
  doSearch: PropTypes.func,
  dispatchSetSearchLocation: PropTypes.func,
};

DiningMateSearch.defaultProps = {
  doSearch: () => {},
  dispatchSetSearchLocation: () => {},
};

const mapDispatchToProps = {
  dispatchSetSearchLocation: setSearchLocation,
}

export default connect(null, mapDispatchToProps)(DiningMateSearch);
