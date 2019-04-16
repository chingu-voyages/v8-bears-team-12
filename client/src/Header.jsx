import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavMenu from './NavMenu';

function Header({ loggedIn, name }) {
  return (
    <header>
      <div className="top-bar">
        <div />
        <h1>Meet and Eat</h1>
        {loggedIn ? (
          <h3>
Welcome,
            {name}
!
          </h3>
        ) : null}
      </div>
      <NavMenu />
    </header>
  );
}

const mapStateToProps = ({ profile }) => ({
  loggedIn: profile.loggedIn,
  name: profile.name,
});

Header.propTypes = {
  loggedIn: PropTypes.bool,
  name: PropTypes.string,
};

Header.defaultProps = {
  loggedIn: false,
  name: '',
};

export default connect(
  mapStateToProps,
  null,
)(Header);
