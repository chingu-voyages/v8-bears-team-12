import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import PalCard from './PalCard';
import PageHeader from './PageHeader';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
      <PageHeader>Pal List</PageHeader>

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
