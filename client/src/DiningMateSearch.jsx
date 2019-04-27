import React, { useState } from 'react';
import { connect } from 'react-redux';
import useReactRouter from 'use-react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setSearchLocation } from './actionCreators';

function DiningMateSearch({ dispatchSetSearchLocation }) {
  const [cities, setCities] = useState([]);
  const { history } = useReactRouter();

  function getCurrentPosition() {
    function usePosition(position) {
      const {
        coords: { latitude: lat, longitude: lon },
      } = position;
      dispatchSetSearchLocation({ lat, lon, history });
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
    const locationInfo = Object.assign(city, { history });
    dispatchSetSearchLocation(locationInfo);
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
        {cities.map(city => {
          const key = `${city.city}, ${city.state}, 
          ${city.lat}:${city.lon}`;
          const current = `${city.city}, ${city.state}`;
          return (
            <li key={key}>
              <button type="button" onClick={() => handleClick(city)}>
                {current}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

DiningMateSearch.propTypes = {
  dispatchSetSearchLocation: PropTypes.func,
};

DiningMateSearch.defaultProps = {
  dispatchSetSearchLocation: () => {},
};

const mapDispatchToProps = {
  dispatchSetSearchLocation: setSearchLocation,
};

export default connect(
  null,
  mapDispatchToProps,
)(DiningMateSearch);
