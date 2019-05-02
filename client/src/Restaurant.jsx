import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './restaurantStyle.css';

import { Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { addRestaurant, removeRestaurant } from './actionCreators';

const styles = theme => ({
  root: { margin: theme.spacing.unit * 0.5 },
  media: {
    height: '180px'
  }
});

function Restaurant({
  restaurant,
  picked,
  dispatchAddRestaurant,
  dispatchRemoveRestaurant,
  classes
}) {
  const { name, image_url, url, rating, location, phone } = restaurant;

  async function handleClick() {
    dispatchAddRestaurant(restaurant);
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={name} />
      <CardMedia className={classes.media} image={image_url} title={name} />
      <CardContent>
        <div className="">{rating}</div>
        <div className="">{location}</div>
        <div className="">{phone}</div>
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
      </CardContent>
    </Card>
  );
}

Restaurant.propTypes = {
  restaurant: PropTypes.shape({}),
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
)(withStyles(styles)(Restaurant));
