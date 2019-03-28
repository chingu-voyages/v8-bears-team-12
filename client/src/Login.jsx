import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
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
            type="email"
            placeholder="Email Address"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
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
