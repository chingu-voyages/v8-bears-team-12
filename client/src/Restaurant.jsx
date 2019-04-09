import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestaurant, removeRestaurant } from './actionCreators';
// import { createRequireFromPath } from 'module';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '0.5fr 1fr 0.5fr 0.2fr',
    gridTemplateAreas: "'image name rating .' 'image location . .' 'image phone . .'",
    padding: '10px',
  },
  name: {
    gridArea: 'name',
  },
  rating: {
    gridArea: 'rating',
  },
  location: {
    gridArea: 'location',
  },
  phone: {
    gridArea: 'phone',
  },
};

function Restaurant({
  restaurant, picked, dispatchAddRestaurant, dispatchRemoveRestaurant,
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
    <div style={styles.container}>
      <img
        src={image_url}
        alt="restaurant"
        style={{ gridArea: 'image', width: '150px', height: '150px' }}
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.name}
      >
        {name}
      </a>
      <div
        style={styles.rating}
      >
        {rating}
      </div>
      <div
        style={styles.location}
      >
        {location}
      </div>
      <div
        style={styles.phone}
      >
        {phone}
      </div>
      <div>
        { !picked ? <button type="button" onClick={handleClick}>Add</button> : null }
        { picked ? <button type="button" onClick={() => dispatchRemoveRestaurant(restaurant._id)}>Remove</button> : null }
      </div>
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
