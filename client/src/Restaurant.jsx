import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './restaurantStyle.css';

import { addRestaurant, removeRestaurant } from './actionCreators';

function Restaurant({
  restaurant,
  picked,
  dispatchAddRestaurant,
  dispatchRemoveRestaurant
}) {
  const { name, image_url, url, rating, location, phone } = restaurant;

  async function handleClick() {
    dispatchAddRestaurant(restaurant);
  }

  return (
    <div className="container">
      <img src={image_url} alt="restaurant" className="restaurant-image" />
      <a href={url} target="_blank" rel="noopener noreferrer" className="name">
        {name}
      </a>
      <div className="rating">{rating}</div>
      <div className="location">{location}</div>
      <div className="phone">{phone}</div>
      <div>
        {!picked ? (
          <button type="button" onClick={handleClick}>
            Add
          </button>
        ) : null}
        {picked ? (
          <button
            type="button"
            onClick={() => dispatchRemoveRestaurant(restaurant._id)}
          >
            X
          </button>
        ) : null}
      </div>
    </div>
  );
}

Restaurant.propTypes = {
  restaurant: PropTypes.object,
  picked: PropTypes.bool,
  dispatchAddRestaurant: PropTypes.func,
  dispatchRemoveRestaurant: PropTypes.func
};

Restaurant.defaultProps = {
  restaurant: {},
  picked: false,
  dispatchAddRestaurant: () => {},
  dispatchRemoveRestaurant: () => {}
};

const mapDispatchToProps = {
  dispatchAddRestaurant: addRestaurant,
  dispatchRemoveRestaurant: removeRestaurant
};

export default connect(
  null,
  mapDispatchToProps
)(Restaurant);
