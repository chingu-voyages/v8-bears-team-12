import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { addRestaurant, removeRestaurant } from './actionCreators';

const styles = theme => ({
  root: { margin: theme.spacing.unit * 0.5, maxWidth: '540px', width: '100%' },
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

  function handleClick() {
    if (!picked) dispatchAddRestaurant(restaurant);
    else dispatchRemoveRestaurant(restaurant._id);
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={name} />
      <CardMedia className={classes.media} image={image_url} title={name} />
      <CardContent>
        <div className="">{rating}</div>
        <div className="">{location}</div>
        <div className="">{phone}</div>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          {picked ? 'Remove' : 'Add'}
        </Button>
      </CardActions>
    </Card>
  );
}

Restaurant.propTypes = {
  classes: PropTypes.shape({}),
  restaurant: PropTypes.shape({}),
  picked: PropTypes.bool,
  dispatchAddRestaurant: PropTypes.func,
  dispatchRemoveRestaurant: PropTypes.func
};

Restaurant.defaultProps = {
  classes: {},
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
