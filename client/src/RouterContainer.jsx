import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';

import { blueGrey } from '@material-ui/core/colors';
import Header from './Header';
import Dashboard from './Dashboard';
import Profile from './Profile';
import PalChat from './PalChat';
import PalList from './PalList';
import Register from './Register';
import RestaurantPicker from './RestaurantPicker';
import MyRestaurants from './MyRestaurants';
import SetSearchArea from './SetSearchArea';
import NotFound from './NotFound';
import Forgot from './Forgot';
import Landing from './Landing';
import Login from './Login';

import { setProfileThunk, removeSnackbar } from './actionCreators';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey
  },
  status: {
    danger: 'orange'
  },
  typography: {
    useNextVariants: true
  }
});

function RouterContainer({
  loggedIn,
  open,
  errorMessage,
  dispatchRemoveSnackbar,
  dispatchSetProfileThunk
}) {
  useEffect(() => {
    dispatchSetProfileThunk();
  }, []);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Header />

        <main>
          <Switch>
            <Route path="/" exact component={Landing} />
            {loggedIn ? null : <Route path="/login" component={Login} />}
            {loggedIn ? null : <Route path="/register" component={Register} />}
            {loggedIn ? null : <Route path="/forgot" component={Forgot} />}
            {loggedIn ? <Route path="/home" component={Dashboard} /> : null}
            {loggedIn ? <Route path="/profile" component={Profile} /> : null}
            {loggedIn ? (
              <Route path="/restaurantPicker" component={RestaurantPicker} />
            ) : null}
            {loggedIn ? (
              <Route path="/my-restaurants" component={MyRestaurants} />
            ) : null}
            {loggedIn ? (
              <Route path="/set-search-area" component={SetSearchArea} />
            ) : null}
            {loggedIn ? <Route path="/pal-list" component={PalList} /> : null}
            {loggedIn ? (
              <Route path="/pal-chat/:palId/:palName" component={PalChat} />
            ) : null}
            <Route path="" component={NotFound} />
          </Switch>
        </main>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          autoHideDuration={3000}
          onClose={dispatchRemoveSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{errorMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={dispatchRemoveSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </MuiThemeProvider>
    </Router>
  );
}

RouterContainer.propTypes = {
  dispatchRemoveSnackbar: PropTypes.func,
  dispatchSetProfileThunk: PropTypes.func,
  loggedIn: PropTypes.bool,
  open: PropTypes.bool,
  errorMessage: PropTypes.string
};

RouterContainer.defaultProps = {
  dispatchRemoveSnackbar: () => {},
  dispatchSetProfileThunk: () => {},
  loggedIn: false,
  open: false,
  errorMessage: ''
};

const mapStateToProps = ({ profile, snackbar }) => ({
  open: snackbar.open,
  errorMessage: snackbar.message,
  loggedIn: profile.loggedIn
});

const mapDispatchToProps = {
  dispatchSetProfileThunk: setProfileThunk,
  dispatchRemoveSnackbar: removeSnackbar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterContainer);
