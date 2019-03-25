import React from 'react';

function Login() {
  function onSubmit(e) {
    e.preventDefault();

    // handle click

    // console.log(user);
  }
  return (
    <div className="login">
      <h1>Log In</h1>
      <form action="" onSubmit={onSubmit}>
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <input type="submit" />
      </form>

      {/* TODO:  Add Register info */}
    </div>
  );
}

export default Login;
