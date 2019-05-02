import React from 'react';
import PropTypes from 'prop-types';
import { CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    height: '150px',
    overflowY: 'scroll',
    '&>div': { margin: '0px 0px 12px' }
  }
});

function PalCardContent({ pal, classes }) {
  return (
    <CardContent className={classes.root}>
      {pal.dietRestrictions ? (
        <div>
          Has specified the following diet restriction:{' '}
          <b>{pal.dietRestrictions}</b>
        </div>
      ) : null}
      {pal.interests ? (
        <div>Interests include: {pal.interests.join(', ')}</div>
      ) : null}

      {pal.restaurantsList ? (
        <div>
          Chosen Restaurants: {pal.restaurantsList.map(e => e.name).join(', ')}.
        </div>
      ) : null}
    </CardContent>
  );
}

PalCardContent.propTypes = {
  pal: PropTypes.shape({}),
  classes: PropTypes.shape({})
};

PalCardContent.defaultProps = {
  pal: {},
  classes: {}
};

export default withStyles(styles)(PalCardContent);
