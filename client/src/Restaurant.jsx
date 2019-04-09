import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestaurant, removeRestaurant } from './actionCreators';
// import { createRequireFromPath } from 'module';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    // gridAutoRows: 'minmax(2px, auto)',
    gridTemplateAreas: "'image name rating' 'image location .' 'image phone .'",
    backgroundColor: '#2196F3',
    padding: '7px',
  },
  image: {
    gridArea: 'image',
    fontSize: '15px',
    textAlign: 'center',
  },
  name: {
    gridArea: 'name',
    fontSize: '30px',
    textAlign: 'center',
  },
  rating: {
    gridArea: 'rating',
    fontSize: '30px',
    textAlign: 'center',
  },
  location: {
    gridArea: 'location',
    fontSize: '30px',
    textAlign: 'center',
  },
  phone: {
    gridArea: 'phone',
    fontSize: '30px',
    textAlign: 'center',
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
        style={{ width: '150px', height: '150px' }}
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
