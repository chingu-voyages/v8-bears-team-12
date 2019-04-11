import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function DiningMateSearch({ doSearch }) {
  const [cities, setCities] = useState([]);
  async function onChange(event) {
    if (event.target.value) {
      const res = await axios.get(`/api/city-choices/${event.target.value}`);
      setCities(res.data);
    } else {
      setCities([]);
    }
  }

  function handleClick(city) {
    console.log({city});
  }

  return (
    <div>
      <div>
      <input type="text" onChange={onChange} />
      <button type="button" onClick={() => doSearch(true)}>
        Current location
      </button>
      </div>
      <ul>
        { cities.map((city, i) => {
          return (
            <li key={i}><button onClick={() => handleClick(city)}>{city.name}, {city.adminCode}</button></li>
          );
        })}
      </ul>
    </div>
  );
}

DiningMateSearch.propTypes = {
  doSearch: PropTypes.func,
};

DiningMateSearch.defaultProps = {
  doSearch: () => {},
};

export default DiningMateSearch;
