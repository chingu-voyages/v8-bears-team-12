import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DiningMate from './DiningMate';

const styles = theme => ({
  root: {
    width: '100%',
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
    width: '100%',
    gridTemplateColumns: '100%',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '50% 50%'
    }
  }
});

function DiningMateList({ diningMates, classes }) {
  const diningMateElems = diningMates.map(e => (
    <DiningMate key={e._id} pal={e} />
  ));
  return <div className={classes.list}>{diningMateElems}</div>;
}

DiningMateList.propTypes = {
  diningMates: PropTypes.arrayOf(PropTypes.object)
};

DiningMateList.defaultProps = {
  diningMates: []
};

export default withStyles(styles)(DiningMateList);
