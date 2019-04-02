import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function NavMenu({loggedIn}) {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      { loggedIn ? (
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      ) : null}
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/restaurantPicker">Pick Restaurants</Link>
      </li>
    </ul>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
});

export default connect(mapStateToProps)(NavMenu);
