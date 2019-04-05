import React, { useState } from 'react';
import axios from 'axios';
import RestaurantList from './RestaurantList';
import RestaurantsPicked from './RestaurantsPicked';

/*
Will include a search box allow up to five restaurants to be added to a list
It should also allow removal of restaurants from the list
*/

function RestaurantPicker() {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [restaurantList, setRestaurantList] = useState([]);

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/restaurant-search/${location}/${term}`);
      setRestaurantList(response.data);
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
    }
  }

  return (
    <div>
      <form onSubmit={(e) => { onSubmit(e); setTerm(''); setLocation(''); }}>
        <input
          type="text"
          value={term}
          placeholder="Search restaurants, ramen, hamburger, pizza..."
          onChange={e => setTerm(e.target.value)}
          required
        />
        <input
          type="text"
          value={location}
          placeholder="Near zipcode or city"
          onChange={e => setLocation(e.target.value)}
          required
        />
        <input
          type="submit"
          value="Submit"
        />
        <RestaurantList restaurantList={restaurantList} />
      </form>
      <RestaurantsPicked />
    </div>
  );
}

export default RestaurantPicker;
