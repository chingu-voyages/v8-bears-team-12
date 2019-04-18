import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { loginThunk } from './actionCreators';

function Login({ dispatchLoginThunk }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState(false);
  async function onSubmit(e) {
    e.preventDefault();

    // handle click
    try {
      dispatchLoginThunk({ username, password });
      setSnackbar(true);
    } catch (err) {
      console.log(err.message); // eslint-disable-line no-console
    }
    // console.log(user);
  }

  function handleClose() {
    setSnackbar(false);
  }

  return (
    <div className="login">
      <h1>Log In</h1>
      <form action="" onSubmit={onSubmit}>
        <div>
          <TextField
            type="username"
            label="Username"
            onChange={e => setUsername(e.target.value)}
            variant="outlined"
            margin="dense"
            required
          />
        </div>
        <div>
          <TextField
            type="password"
            label="Password"
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            margin="dense"
            required
          />
        </div>
        <Button type="submit" variant="contained" fullWidth={true} color="primary">
          Sign In
        </Button>      
      </form>

      <div className="login-page-links">
        <div>
          New user?
          <Link to="/register"> Register here</Link>
        </div>
        <div>
          <Link to="/forgot"> Forgot Password?</Link>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Attempting Login...</span>}
        action={[    
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}

Login.propTypes = {
  dispatchLoginThunk: PropTypes.func,
};

Login.defaultProps = {
  dispatchLoginThunk: () => {},
};

const mapDispatchToProps = {
  dispatchLoginThunk: loginThunk,
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
