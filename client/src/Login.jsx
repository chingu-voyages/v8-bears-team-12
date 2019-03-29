import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e) {
    e.preventDefault();

    // handle click

    // console.log(user);
  }
  return (
    <div className="login">
      <h1>Log In</h1>
      <form action="" onSubmit={onSubmit}>
        <div>
          <input
            type="username"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <input type="submit" />
      </form>
      <span>
        New user?
        <Link to="/register"> Register here</Link>
      </span>
    </div>
  );
}

export default Login;
