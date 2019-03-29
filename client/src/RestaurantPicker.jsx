import React, { useState } from 'react';
import axios from 'axios';

/*
Will include a search box allow up to five restaurants to be added to a list 
It should also allow removal of restaurants from the list
This is where the Yelp API will be used
*/

function RestaurantPicker(props) {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');

  function onSubmit(e) {
    e.preventDefault();

    axios.get(`/restaurant-search/${location}/${term}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={(e) => { onSubmit(e); setTerm(''); setLocation(''); }}>
        <input
          type="text"
          value={term}
          placeholder="Search restaurants, ramen, hamburger, pizza..."
          onChange={e => setTerm(e.target.value)}
          // required
        />
        <input
          type="text"
          value={location}
          placeholder="Near zipcode or city"
          onChange={e => setLocation(e.target.value)}
          // required
        />
        <input
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}

export default RestaurantPicker;
