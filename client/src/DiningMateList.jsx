import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import DiningMate from './DiningMate';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },

  list: {
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyItems: 'center',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '50% 50%'
    }
  }
});

function DiningMateList({ diningMates, classes, pals }) {
  const matches = diningMates
    .filter(d => !pals.some(p => p._id === d._id))
    .map(e => <DiningMate key={e._id} pal={e} />);
  return matches.length ? (
    <div className={classes.list}>{matches}</div>
  ) : (
    <Typography className={classes.root} variant="h6">
      No pals to add for this search
    </Typography>
  );
}

DiningMateList.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.shape({}),
  diningMates: PropTypes.arrayOf(PropTypes.object)
};

DiningMateList.defaultProps = {
  pals: [],
  classes: {},
  diningMates: []
};

const mapStateToProps = ({ profile }) => ({
  pals: profile.pals
});

export default connect(mapStateToProps)(withStyles(styles)(DiningMateList));
