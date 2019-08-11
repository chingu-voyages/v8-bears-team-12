import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './Header';
import AddPal from './AddPal';
import Profile from './Profile';
import PalChat from './PalChat';
import MyPals from './MyPals';
import Register from './Register';
import RestaurantPicker from './RestaurantPicker';
import MyRestaurants from './MyRestaurants';
import SetSearchArea from './SetSearchArea';
import NotFound from './NotFound';
import Forgot from './Forgot';
import Landing from './Landing';
import Login from './Login';

import { setProfileThunk, removeSnackbar } from './actionCreators';

const styles = {
  root: {
    maxWidth: '1180px',
    width: '100%',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
};

function RouterContainer({
  loggedIn,
  open,
  errorMessage,
  dispatchRemoveSnackbar,
  dispatchSetProfileThunk,
  loading,
  classes
}) {
  useEffect(() => {
    dispatchSetProfileThunk();
  }, []);

  return (
    <Router>
      <div className={classes.root}>
      <Header />

      {loading ? (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      ) : (
        <main>
          <Switch>
            <Route path="/" exact component={Landing} />
            {loggedIn ? null : <Route path="/login" component={Login} />}
            {loggedIn ? null : <Route path="/register" component={Register} />}
            {loggedIn ? null : <Route path="/forgot" component={Forgot} />}
            <Route path="/home" component={MyPals} />
            {loggedIn ? <Route path="/pal-add" component={AddPal} /> : null}

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
            {loggedIn ? (
              <Route path="/pal-chat/:palId/:palName" component={PalChat} />
            ) : null}
            {!loading ? <Route path="" component={NotFound} /> : null}
          </Switch>
        </main>
      )}
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
    </div>
    </Router>
  );
}

RouterContainer.propTypes = {
  dispatchRemoveSnackbar: PropTypes.func,
  dispatchSetProfileThunk: PropTypes.func,
  loggedIn: PropTypes.bool,
  open: PropTypes.bool,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  classes: PropTypes.shape({})
};

RouterContainer.defaultProps = {
  dispatchRemoveSnackbar: () => {},
  dispatchSetProfileThunk: () => {},
  loggedIn: false,
  open: false,
  errorMessage: '',
  loading: false,
  classes: {}
};

const mapStateToProps = ({ profile, snackbar, app }) => ({
  open: snackbar.open,
  errorMessage: snackbar.message,
  loggedIn: profile.loggedIn,
  loading: app.loading
});

const mapDispatchToProps = {
  dispatchSetProfileThunk: setProfileThunk,
  dispatchRemoveSnackbar: removeSnackbar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RouterContainer));
