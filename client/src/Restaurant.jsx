import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import PropTypes from 'prop-types';

function Restaurant({ restaurant, picked }) {
  const {
    name,
    image_url,
    url,
    rating,
    location,
    phone,
  } = restaurant;

  async function handleClick() {
    await axios.post('/api/restaurant-add', { restaurant });
  }

  return (
    <div>
      {name}
      {/* {rating}
      {location}
      {phone} */}
      { !picked ? <button type="button" onClick={handleClick}> Add </button> : null }
    </div>
  );
}

Restaurant.propTypes = {
  restaurant: PropTypes.objectOf(PropTypes.object()),
  picked: PropTypes.bool,
};

Restaurant.defaultProps = {
  restaurant: {},
  picked: false,
};

export default Restaurant;
