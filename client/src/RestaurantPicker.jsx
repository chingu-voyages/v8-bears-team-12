import React, { useState } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { searchRestaurants } from './actionCreators';

/*
Will include a search box allow up to five restaurants to be added to a list 
It should also allow removal of restaurants from the list
This is where the Yelp API will be used
*/

function RestaurantPicker() {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    const response = await axios.get(`/restaurant-search/${location}/${term}`);

    try {
      console.log(response.data.businesses);
      // save response to a state that can be accessed in restaurantList component
      // searchRestaurantsDispatch(response.data.businesses);
    } catch (err) {
      console.log(err);
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
      </form>
    </div>
  );
}

// const mapStateToProps = state => ({
//   restaurantList: state.restaurantSearch.restaurantList,
// });

// const mapDispatchToProps = {
//   searchRestaurantsDispatch: searchRestaurants,
// };

export default RestaurantPicker;
