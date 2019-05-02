import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Restaurant from './Restaurant';
import PageHeader from './PageHeader';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.unit
  },

  restaurants: {
    width: '100%',
    display: 'grid',
    justifyItems: 'center',
    gridTemplateColumns: '100%',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '50% 50%'
    }
  }
});

function RestaurantPicker({ classes, picked }) {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [restaurantList, setRestaurantList] = useState([]);

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.get(
        `/api/restaurant-search/${location}/${term}`
      );
      setRestaurantList(response.data);
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
    }
  }

  return (
    <div className={classes.root}>
      <PageHeader>Pick Restaurant</PageHeader>
      <form
        className={classes.form}
        onSubmit={e => {
          onSubmit(e);
          setTerm('');
          setLocation('');
        }}
      >
        <TextField
          label="Cuisine Type "
          value={term}
          onChange={e => setTerm(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="Zipcode or city "
          value={location}
          onChange={e => setLocation(e.target.value)}
          variant="outlined"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Find
        </Button>
      </form>

      <div className={classes.restaurants}>
        {restaurantList
          .filter(r => !picked.some(p => p.id === r.id))
          .map(restaurant => (
            <Restaurant restaurant={restaurant} key={restaurant.id} />
          ))}
      </div>
    </div>
  );
}

RestaurantPicker.propTypes = {
  classes: PropTypes.shape({}),
  picked: PropTypes.arrayOf(PropTypes.object)
};

RestaurantPicker.defaultProps = {
  classes: {},
  picked: []
};

const mapStateToProps = ({ profile }) => ({
  picked: profile.restaurantsList
});

export default connect(mapStateToProps)(withStyles(styles)(RestaurantPicker));
