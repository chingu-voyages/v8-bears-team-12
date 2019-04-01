import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavMenu from './NavMenu';

function Header({ loggedIn, username }) {
  return (
    <header>
      <div className="top-bar">
        <div />
        <h1>Meet and Eat</h1>
        {loggedIn ? <h3>Welcome, {username}!</h3> : <div />}
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
