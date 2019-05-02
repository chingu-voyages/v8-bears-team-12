import React from 'react';
import PropTypes from 'prop-types';
import { CardContent, Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: '150px',
    overflowY: 'scroll',
    '&>div': { margin: '0px 0px 8px' }
  },
  chip: { margin: theme.spacing.unit * 0.5, height: '24px' }
});

function PalCardContent({ pal, classes }) {
  return (
    <CardContent className={classes.root}>
      {pal.dietRestrictions ? (
        <div>
          Has specified the following diet restriction:{' '}
          <b>{pal.dietRestrictions}</b>
        </div>
      ) : (
        <div>Has not specified any diet restrictions</div>
      )}
      {pal.interests ? (
        <div>
          Interests:{' '}
          {pal.interests.map(e => (
            <Chip className={classes.chip} key={e} label={e} />
          ))}
        </div>
      ) : null}

      {pal.restaurantsList ? (
        <div>
          Picked:
          {pal.restaurantsList.map(e => (
            <Chip className={classes.chip} key={e._id} label={e.name} />
          ))}
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
