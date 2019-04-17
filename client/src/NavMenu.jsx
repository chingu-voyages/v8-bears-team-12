import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function NavMenu({ loggedIn }) {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {loggedIn ? (
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      ) : null}
      {loggedIn ? null : (
        <li>
          <Link to="/register">Register</Link>
        </li>
      )}
      {loggedIn ? (
        <li>
          <Link to="/restaurantPicker">Pick Restaurants</Link>
        </li>
      ) : null}
    </ul>
  );
}

NavMenu.propTypes = {
  loggedIn: PropTypes.bool,
};

NavMenu.defaultProps = {
  loggedIn: false,
};

const mapStateToProps = ({ profile }) => ({
  loggedIn: profile.loggedIn,
});

export default connect(mapStateToProps)(NavMenu);
