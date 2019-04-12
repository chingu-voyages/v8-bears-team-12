import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from './actionCreators';

function Register({ dispatchNewUser }) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // const [zipcode, setZipcode] = useState('');
  const [interests, setInterests] = useState([]);
  const [dietRestrictions, setDietRestrictions] = useState('');
  const [optionOther, setOptionOther] = useState(false);

  const otherOption = React.createRef();

  const options = [
    'None a.k.a. I eat anything and everything',
    'Vegan',
    'Vegetarian',
    'GlutenFree',
  ];

  function handleOptions(e) {
    if (e.target.value === 'Other...') {
      setOptionOther(true);
    } else {
      setDietRestrictions(e.target.value);
      setOptionOther(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (
      password === password2
      && (dietRestrictions !== '' && dietRestrictions !== 'Choose one...')
    ) {
      // create new user
      const newUser = {
        name: username,
        firstName,
        lastName,
        email,
        password,
        // zipcode,
        interests,
        dietRestrictions,
      };

      console.log({ newUser });

      dispatchNewUser(newUser);

      // reset all fields
      setUsername('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPassword2('');
      // setZipcode('');
      setInterests([]);
      setDietRestrictions('');
      setOptionOther(false);
      otherOption.current.value = '';
    }
    if (password !== password2) {
      alert("Passwords don't match!");
      setPassword('');
      setPassword2('');
    }

    if (dietRestrictions === '' || dietRestrictions === 'Choose one...') {
      alert('Please choose an option for diet...');
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Create your account</p>
      <form onSubmit={onSubmit}>
        <div />
        <div>
          <label>Username: </label>
          <input
            type="text"
            placeholder="UserName"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password1: </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password2: </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            required
          />
        </div>
        {/* <div>
          <label>Zipcode: </label>
          <input
            type="text"
            placeholder="Your zipcode"
            value={zipcode}
            onChange={e => setZipcode(e.target.value)}
            required
          />
        </div> */}
        <div>
          <label>Interests: </label>
          <input
            type="text"
            placeholder="Enter interests"
            value={interests}
            onChange={e => setInterests(e.target.value)}
            required
          />
          <br />
          <small>upto 5 separated by commas</small>
        </div>
        <div>
          <label>Diet Restrictions: </label>
          <select value={dietRestrictions} onChange={e => handleOptions(e)}>
            <option>Choose one...</option>
            {options.map((i, j) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
            <option>Other...</option>
          </select>
          <br />
          <input
            type="text"
            style={{
              display: optionOther ? 'block' : 'none',
            }}
            ref={otherOption}
            onChange={e => setDietRestrictions(e.target.value)}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

Register.propTypes = {
  dispatchNewUser: PropTypes.func,
};

Register.defaultProps = {
  dispatchNewUser: () => {},
};
const mapDispatchToProps = {
  dispatchNewUser: registerUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(Register);
