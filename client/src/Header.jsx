import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useReactRouter from 'use-react-router';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NotificationImportant from '@material-ui/icons/NotificationImportant';

import NavMenu from './NavMenu';

import { logoutThunk } from './actionCreators';

const styles = () => ({
  linkColor: {
    color: 'white',
    textDecoration: 'none',
  },
  loggedInBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    margin: `0px 8px`,
  },
  icon: {
    color: 'white',
    padding: '0',
  },
});

function Header({ loggedIn, name, dispatchLogoutThunk, newMessages, classes }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { history } = useReactRouter();
  function onLogout() {
    dispatchLogoutThunk();
    history.push('/');
  }

  const unread = newMessages.length;
  const unreadMap = newMessages.reduce((acc, curr) => {
    if (!(curr.sender.name in acc))
      acc[curr.sender.name] = {
        id: curr.sender._id,
        name: curr.sender.name,
        count: 0,
      };
    acc[curr.sender.name].count += 1;
    return acc;
  }, {});

  const unreadList = Object.values(unreadMap);

  function handleClick(e) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function handleGotoChat(id) {
    setAnchorEl(null);
    history.push(`/pal-chat/${id}`);
  }

  return (
    <div className={`${classes.root} app-bar header-font`}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
            <Link className={classes.linkColor} to="/">
              Pal-a-table
            </Link>
          </Typography>

          {loggedIn && (
            <div className={classes.loggedInBox}>
              <Typography variant="h6" color="inherit">
                {name}
              </Typography>
              {unread ? (
                <div className={classes.margin}>
                  <Badge badgeContent={unread} color="secondary">
                    <IconButton
                      aria-owns={anchorEl ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                      className={classes.icon}
                    >
                      <NotificationImportant />
                    </IconButton>
                  </Badge>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {unreadList.map(item => (
                      <MenuItem
                        onClick={() => handleGotoChat(item.id)}
                        key={item.id}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ) : null}
              <Button variant="contained" onClick={onLogout}>
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <NavMenu />
    </div>
  );
}

const mapStateToProps = ({ profile, chat }) => ({
  loggedIn: profile.loggedIn,
  name: profile.name,
  newMessages: chat.newMessages,
});

Header.propTypes = {
  loggedIn: PropTypes.bool,
  name: PropTypes.string,
  dispatchLogoutThunk: PropTypes.func,
  classes: PropTypes.shape({}),
  newMessages: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  loggedIn: false,
  name: '',
  dispatchLogoutThunk: () => {},
  classes: {},
  newMessages: [],
};

const mapDispatchToProps = {
  dispatchLogoutThunk: logoutThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Header));
