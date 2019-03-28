import React, { useState } from 'react';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  function onSubmit(e) {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    if (password !== password2) {
      alert("Passwords don't match!");
      setPassword('');
      setPassword2('');
    } else {
      console.log(newUser);

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPassword2('');
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Create your account</p>
      {/* TODO: Add code for uploading image */}
      <form onSubmit={onSubmit}>
        <div />
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            required
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Register;
