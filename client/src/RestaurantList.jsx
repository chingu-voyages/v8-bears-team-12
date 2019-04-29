import React from 'react';
import PropTypes from 'prop-types';
import Restaurant from './Restaurant';

function RestaurantList({ restaurantList }) {
  return (
    <div>
      <ul style={{ padding: '0' }}>
        {restaurantList.map((restaurant, i) => (
          <Restaurant restaurant={restaurant} key={i} />
        ))}
      </ul>
    </div>
  );
}

RestaurantList.propTypes = {
  restaurantList: PropTypes.arrayOf(PropTypes.object)
};

RestaurantList.defaultProps = {
  restaurantList: []
};

export default RestaurantList;
