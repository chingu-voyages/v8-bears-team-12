import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useReactRouter from 'use-react-router';

import { Button } from '@material-ui/core';
import NavMenu from './NavMenu';

import { logoutThunk } from './actionCreators';

function Header({ loggedIn, name, dispatchLogoutThunk }) {
  const { history } = useReactRouter();
  function onLogout() {
    dispatchLogoutThunk();
    history.push('/');
  }
  return (
    <div className="app-bar header-font">
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
            Pal-a-table
          </Typography>
          <Typography variant="h6" color="inherit">
            {loggedIn ? name : ''}
          </Typography>
          {loggedIn && (
            <Button variant="contained" onClick={onLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <NavMenu />
    </div>
  );
}

const mapStateToProps = ({ profile }) => ({
  loggedIn: profile.loggedIn,
  name: profile.name,
});

Header.propTypes = {
  loggedIn: PropTypes.bool,
  name: PropTypes.string,
  dispatchLogoutThunk: PropTypes.func,
};

Header.defaultProps = {
  loggedIn: false,
  name: '',
  dispatchLogoutThunk: () => {},
};

const mapDispatchToProps = {
  dispatchLogoutThunk: logoutThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
