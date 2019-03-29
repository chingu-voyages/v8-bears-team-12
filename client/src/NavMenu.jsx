import React from 'react';
import { Link } from 'react-router-dom';

function NavMenu() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/restaurantPicker">Pick Restaurants</Link>
      </li>
    </ul>
  );
}

export default NavMenu;
