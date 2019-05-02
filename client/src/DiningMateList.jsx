import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DiningMate from './DiningMate';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    padding: '8px'
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
  const diningMateElems = diningMates
    .filter(d => !pals.some(p => p._id === d._id))
    .map(e => <DiningMate key={e._id} pal={e} />);
  return <div className={classes.list}>{diningMateElems}</div>;
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
