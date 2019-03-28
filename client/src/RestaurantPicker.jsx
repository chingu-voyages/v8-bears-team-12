import React, { useState } from 'react';

/*
Will include a search box allow up to five restaurants to be added to a list. 
It should also allow removal of restaurants from the list. 
This is where the Yelp API will be used.
*/

function RestaurantPicker(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  function onSubmit(e) {
    // should call the axios GET request here
    e.preventDefault();
  }
  return (
    <div>
      <form>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search restaurants, ramen, hamburger, pizza..."
          onChange={e => setSearchTerm(e.target.value)}
          required
        />
        <input
          type="text"
          value={location}
          placeholder="Near zipcode or city"
          onChange={e => setLocation(e.target.value)}
          required
        />
        <button
          type="submit"
          onSubmit={onSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default RestaurantPicker;