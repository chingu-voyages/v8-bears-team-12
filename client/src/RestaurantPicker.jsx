import React from 'react';


/*
Will include a search box allow up to five restaurants to be added to a list. 
It should also allow removal of restaurants from the list. 
This is where the Yelp API will be used.
*/

function RestaurantPicker(props) {
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search restaurants, ramen, hamburger, pizza..."
          required
        />
        <input
          type="text"
          placeholder="Near zipcode or city"
          required
        />
        <button
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default RestaurantPicker;