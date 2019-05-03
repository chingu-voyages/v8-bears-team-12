import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import PalCard from './PalCard';
import PageHeader from './PageHeader';

const styles = theme => ({
  root: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  list: {
    display: 'grid',
    width: '100%',
    justifyItems: 'center',

    gridTemplateColumns: '100%',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '50% 50%'
    }
  }
});

function PalList({ pals, classes }) {
  return (
    <div className={classes.root}>
      <PageHeader>My Pals</PageHeader>

      <div className={classes.list}>
        {pals.map(pal => (
          <PalCard key={pal._id} pal={pal} />
        ))}
      </div>

      {!pals.length && (
        <div>
          You currently have no pals. Add some from the{' '}
          <Link to="/home">Home</Link> Tab.
        </div>
      )}

      <Fab
        component={Link}
        to="/pal-add"
        className={classes.fab}
        color="primary"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

PalList.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.shape({})
};

PalList.defaultProps = {
  pals: [],
  classes: {}
};

const mapStateToProps = ({ profile }) => ({
  pals: profile.pals
});

export default connect(mapStateToProps)(withStyles(styles)(PalList));
