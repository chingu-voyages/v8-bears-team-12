import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import NavMenu from './NavMenu';

function Header({ loggedIn, name }) {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
          Pal-a-table
        </Typography>
        <Typography variant="h6" color="inherit" style={{ paddingRight: '8px '}}>
          {name}
        </Typography>
      </Toolbar>
      <NavMenu />
    </AppBar>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  name: state.name,
});

Header.propTypes = {
  loggedIn: PropTypes.bool,
  name: PropTypes.string,
};

Header.defaultProps = {
  loggedIn: false,
  name: '',
};

export default connect(mapStateToProps, null)(Header);
