import React, { useEffect } from 'react';
import NavMenu from './NavMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Header({ loggedIn, username }) {
  return (
    <header>
      <div className="top-bar">
        <div></div>
        <h1>Meet and Eat</h1>
        {loggedIn ? <h3>Welcome, {username}!</h3> : <div></div>}
      </div>
      <NavMenu />
    </header>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  username: state.username,
});

Header.propTypes = {
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
};

Header.defaultProps = {
  loggedIn: false,
  username: '',
};

export default connect(mapStateToProps, null)(Header);
