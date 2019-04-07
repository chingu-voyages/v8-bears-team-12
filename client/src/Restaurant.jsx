import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addRestaurant, removeRestaurant } from './actionCreators';

function Restaurant({
 restaurant, picked, dispatchAddRestaurant, dispatchRemoveRestaurant 
}) {
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
      { picked ? <button type="button" onClick={() => dispatchRemoveRestaurant(restaurant._id)}>Remove</button> : null }
    </div>
  );
}

Restaurant.propTypes = {
  restaurant: PropTypes.object,
  picked: PropTypes.bool,
  dispatchAddRestaurant: PropTypes.func,
  dispatchRemoveRestaurant: PropTypes.func,
};

Restaurant.defaultProps = {
  restaurant: {},
  picked: false,
  dispatchAddRestaurant: () => {},
  dispatchRemoveRestaurant: () => {},
};

const mapDispatchToProps = {
  dispatchAddRestaurant: addRestaurant,
  dispatchRemoveRestaurant: removeRestaurant,
};

export default connect(null, mapDispatchToProps)(Restaurant);
