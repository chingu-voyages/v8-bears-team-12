import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function NavMenu({loggedIn}) {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      { loggedIn ? <li><Link to="/profile">Profile</Link></li> : null }
      { loggedIn ? null : <li><Link to="/register">Register</Link></li> }
      { loggedIn ? <li><Link to="/restaurantPicker">Pick Restaurants</Link></li> : null }
    </ul>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
});

export default connect(mapStateToProps)(NavMenu);
