import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Card } from '@material-ui/core';
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
  list: {
    display: 'grid',
    width: '100%',
    justifyItems: 'center',

    gridTemplateColumns: '100%',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '50% 50%'
    }
  },
  card: {
    maxWidth: '560px',
    width: '100%',
    margin: 'auto',
    padding: '10px'
  }
});

function MyPals({ pals, classes, loggedIn, loading }) {
  if (!loggedIn || loading) return <div />;
  return (
    <div className={classes.root}>
      <PageHeader>
        <div>
          {`My Pals   `}
          <Fab
            component={Link}
            to="/pal-add"
            className={classes.fab}
            color="primary"
          >
            <AddIcon />
          </Fab>
        </div>
      </PageHeader>
      {!pals.length ? (
        <div>
          <Card className={classes.card}>
            {`You currently have no pals. Lets add some! Click on the add icon above!  `}
          </Card>
        </div>
      ) : (
        <div className={classes.list}>
          {pals.map(pal => (
            <PalCard key={pal._id} pal={pal} />
          ))}
        </div>
      )}
    </div>
  );
}

MyPals.propTypes = {
  pals: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.shape({})
};

MyPals.defaultProps = {
  pals: [],
  classes: {}
};

const mapStateToProps = ({ profile, app }) => ({
  loggedIn: profile.loggedIn,
  loading: app.loading,
  pals: profile.pals
});

export default connect(mapStateToProps)(withStyles(styles)(MyPals));
