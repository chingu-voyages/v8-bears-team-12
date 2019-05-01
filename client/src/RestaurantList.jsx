import React from 'react';
import PropTypes from 'prop-types';
import Restaurant from './Restaurant';

function RestaurantList({ restaurantList }) {
  return (
    <div className="restaurantsearch-restaurants">
      {restaurantList.map(restaurant => (
        <Restaurant restaurant={restaurant} key={restaurant.id} />
      ))}
    </div>
  );
}

RestaurantList.propTypes = {
  restaurantList: PropTypes.arrayOf(PropTypes.object),
};

RestaurantList.defaultProps = {
  restaurantList: [],
};

export default RestaurantList;
