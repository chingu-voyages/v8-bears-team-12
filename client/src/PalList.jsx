import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import PalCard from './PalCard';

const styles = {
  title: {
    padding: '8px'
  }
};

function PalList({ pals, classes }) {
  return (
    <div className="pal-container">
      <Typography variant="h4" className={classes.title}>
        Pal List
      </Typography>
      {pals.map(pal => (
        <PalCard key={pal._id} pal={pal} />
      ))}

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
