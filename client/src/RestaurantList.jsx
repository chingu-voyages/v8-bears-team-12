import React from 'react';
import PropTypes from 'prop-types';
import Restaurant from './Restaurant';

function RestaurantList({ restaurantList }) {
  return (
    <div className="restaurantsearch-restaurants">
      {restaurantList.map((restaurant, i) => (
        <Restaurant restaurant={restaurant} key={i} />
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
