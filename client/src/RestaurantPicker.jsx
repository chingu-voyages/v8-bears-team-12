import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Restaurant from './Restaurant';
import PageHeader from './PageHeader';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
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

function RestaurantPicker({ classes }) {
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
      <PageHeader>Search for Restaurants</PageHeader>
      <div>
        <form
          style={{ minWidth: '100%' }}
          onSubmit={e => {
            onSubmit(e);
            setTerm('');
            setLocation('');
          }}
        >
          <TextField
            style={{
              maxWidth: '35%',
              borderBottom: '2px solid rgb(19, 73, 134)'
            }}
            className="textField"
            label="Cuisine Type "
            value={term}
            onChange={e => setTerm(e.target.value)}
            required
          />
          <TextField
            style={{
              maxWidth: '35%',
              borderBottom: '2px solid rgb(19, 73, 134)'
            }}
            className="textField"
            label="Zipcode or city "
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
          <Button
            style={{ marginTop: '9px' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Find
          </Button>
        </form>
      </div>

      <div className={classes.restaurants}>
        {restaurantList.map(restaurant => (
          <Restaurant restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(RestaurantPicker);
