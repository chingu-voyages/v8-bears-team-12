import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addRestaurant } from './actionCreators';

function Restaurant({ restaurant, picked, dispatchAddRestaurant }) {
  const {
    name,
    image_url,
    url,
    rating,
    location,
    phone,
  } = restaurant;

  async function handleClick() {
    dispatchAddRestaurant(restaurant);
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
  restaurant: PropTypes.object,
  picked: PropTypes.bool,
};

Restaurant.defaultProps = {
  restaurant: {},
  picked: false,
};

const mapDispatchToProps = {
  dispatchAddRestaurant: addRestaurant,
};

export default connect(null, mapDispatchToProps)(Restaurant);
