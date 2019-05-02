import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Restaurant from './Restaurant';
import PageHeader from './PageHeader';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  restaurants: {
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyItems: 'center',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '50% 50%'
    }
  }
});
function MyRestaurants({ restaurantsList, classes }) {
  return (
    <div className={classes.root}>
      <PageHeader>My Restaurants</PageHeader>
      <div className={classes.restaurants}>
        {restaurantsList.map(e => (
          <Restaurant key={e.id} picked restaurant={e} />
        ))}
      </div>
      <Fab
        component={Link}
        to="/restaurantPicker"
        className={classes.fab}
        color="primary"
        disabled={restaurantsList.length >= 5}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

const mapStateToProps = ({ profile }) => ({
  restaurantsList: profile.restaurantsList
});

MyRestaurants.propTypes = {
  classes: PropTypes.shape({}),
  restaurantsList: PropTypes.arrayOf(PropTypes.object)
};

MyRestaurants.defaultProps = {
  classes: {},
  restaurantsList: []
};

export default connect(mapStateToProps)(withStyles(styles)(MyRestaurants));
