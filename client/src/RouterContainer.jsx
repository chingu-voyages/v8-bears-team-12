import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Header from './Header';
import Home from './Home';
import Profile from './Profile';
import PalChat from './PalChat';
import PalList from './PalList';
import Register from './Register';
import RestaurantPicker from './RestaurantPicker';
import SetSearchArea from './SetSearchArea';
import NotFound from './NotFound';
import Forgot from './Forgot';

import { setProfileThunk, removeSnackbar } from './actionCreators';

function RouterContainer({
  loggedIn,
  open,
  errorMessage,
  dispatchRemoveSnackbar,
  dispatchSetProfileThunk,
}) {
  useEffect(() => {
    dispatchSetProfileThunk();
  }, []);

  return (
    <Router>
      <Header />

      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          {loggedIn ? <Route path="/profile" component={Profile} /> : null}
          {loggedIn ? null : <Route path="/register" component={Register} />}
          {loggedIn ? null : <Route path="/forgot" component={Forgot} />}
          {loggedIn ? (
            <Route path="/restaurantPicker" component={RestaurantPicker} />
          ) : null}
          {loggedIn ? (
            <Route path="/set-search-area" component={SetSearchArea} />
          ) : null}
          {loggedIn ? <Route path="/pal-list" component={PalList} /> : null}
          {loggedIn ? (
            <Route path="/pal-chat/:palId" component={PalChat} />
          ) : null}
          <Route path="" component={NotFound} />
        </Switch>
      </main>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={dispatchRemoveSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
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
          </IconButton>,
        ]}
      />
    </Router>
  );
}

RouterContainer.propTypes = {
  dispatchRemoveSnackbar: PropTypes.func,
  dispatchSetProfileThunk: PropTypes.func,
  loggedIn: PropTypes.bool,
  open: PropTypes.bool,
  errorMessage: PropTypes.string,
};

RouterContainer.defaultProps = {
  dispatchRemoveSnackbar: () => {},
  dispatchSetProfileThunk: () => {},
  loggedIn: false,
  open: false,
  errorMessage: '',
};

const mapStateToProps = ({ profile, snackbar }) => ({
  open: snackbar.open,
  errorMessage: snackbar.message,
  loggedIn: profile.loggedIn,
});

const mapDispatchToProps = {
  dispatchSetProfileThunk: setProfileThunk,
  dispatchRemoveSnackbar: removeSnackbar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouterContainer);
