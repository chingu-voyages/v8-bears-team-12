import React from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

function Restaurant(props) {
  const { name, image_url, url, rating, location, phone} = props.restaurant;

  async function handleClick() {
    const response = await axios.post('/api/restaurant-add', { restaurant });
  }

  return (
    <div>
      {name}
      {/* {rating}
      {location}
      {phone} */}
      <button type="button" onClick={handleClick}> Add </button>
    </div>
  );
}

// Restaurant.propTypes = {
//   restaurant: PropTypes.object,
// }

// Restaurant.defaultProps = {
//   restaurant: {},
// };

export default Restaurant;
