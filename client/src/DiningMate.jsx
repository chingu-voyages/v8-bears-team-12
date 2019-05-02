import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Card, CardActions } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { palAdd } from './actionCreators';

import PalCardHeader from './PalCardHeader';
import PalCardContent from './PalCardContent';

const styles = () => ({
  root: { maxWidth: '560px', width: '100%', margin: '8px' },
  title: { fontSize: '1.4rem', fontWeight: 500 },
  avatar: { backgroundColor: '#365577' }
});

function DiningMate({ pal, dispatchPalAdd, classes }) {
  const { _id } = pal;
  function handleAddPal() {
    dispatchPalAdd(_id);
  }

  return (
    <Card className={classes.root}>
      <PalCardHeader pal={pal} />
      <PalCardContent pal={pal} />
      <CardActions>
        <Button type="button" onClick={handleAddPal}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
}

DiningMate.propTypes = {
  pal: PropTypes.shape({
    name: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    dietRestrictions: PropTypes.string,
    restaurantsList: PropTypes.arrayOf(PropTypes.object)
  }),
  dispatchPalAdd: PropTypes.func
};

DiningMate.defaultProps = {
  pal: {
    name: '',
    interests: [],
    dietRestrictions: '',
    restaurantsList: []
  },
  dispatchPalAdd: () => {}
};

const mapDispatchToProps = {
  dispatchPalAdd: palAdd
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(DiningMate));
