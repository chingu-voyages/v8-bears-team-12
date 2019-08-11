import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { loginThunk } from './actionCreators';
import { classes } from 'istanbul-lib-coverage';

const styles = {
  background: {
    backgroundImage: `url(/static/pineapple.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%'
  },
  links: {
      margin: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    
    '& > div': {
      margin: '8px'
    }
  }
};

const useStyles = makeStyles(styles);

function Login({ dispatchLoginThunk }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { history } = useReactRouter();
  const classes = useStyles();

  async function onSubmit(e) {
    e.preventDefault();

    // handle click
    try {
      dispatchLoginThunk({ username, password, history });
    } catch (err) {}
  }

  return (
    <div className={classes.background}>
      <div className="simple-card">
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
          <Button type="submit" variant="contained" fullWidth color="primary">
            Sign In
          </Button>
        </form>

        <div className={classes.links}>
          <div>
            New user?
            <Link to="/register"> Register here</Link>
          </div>
          <div>
            <Link to="/forgot"> Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  dispatchLoginThunk: PropTypes.func
};

Login.defaultProps = {
  dispatchLoginThunk: () => {}
};

const mapDispatchToProps = {
  dispatchLoginThunk: loginThunk
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
