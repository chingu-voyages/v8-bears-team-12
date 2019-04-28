import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useReactRouter from 'use-react-router';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NotificationImportant from '@material-ui/icons/NotificationImportant';

import NavMenu from './NavMenu';

import { logoutThunk } from './actionCreators';

const styles = theme => ({
  loggedInBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    margin: `0px 8px`,
  },
});

function Header({ loggedIn, name, dispatchLogoutThunk, newMessages, classes }) {
  const { history } = useReactRouter();
  function onLogout() {
    dispatchLogoutThunk();
    history.push('/');
  }

  const unread = newMessages.length;

  return (
    <div className="app-bar header-font">
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
            Pal-a-table
          </Typography>

          {loggedIn && (
            <div className={classes.loggedInBox}>
              <Typography variant="h6" color="inherit">
                {name}
              </Typography>
              {unread ? (
                <div className={classes.margin}>
                  <Badge badgeContent={unread} color="secondary">
                    <NotificationImportant className={classes.icon} />
                  </Badge>
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
};

Header.defaultProps = {
  loggedIn: false,
  name: '',
  dispatchLogoutThunk: () => {},
  classes: {},
};

const mapDispatchToProps = {
  dispatchLogoutThunk: logoutThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Header));
