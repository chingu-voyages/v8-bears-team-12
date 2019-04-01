import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';
import { set } from 'mongoose';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [interests, setInterests] = useState([]);
  const [dietRestrictions, setDietRestrictions] = useState('');
  const dietOptions = [
    'None - I eat anything & everything!',
    'Vegan',
    'Vegetarian',
    'Gluten Free',
    'Other',
  ];
  // const [preview, setPreview] = useState(null);
  // const [src, setSrc] = useState('');

  function onSubmit(e) {
    e.preventDefault();

    if (password === confirmPassword) {
      alert('changes are successfully saved');

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setZipcode('');
      setInterests('');
      setDietRestrictions('');
    }

    if (password !== confirmPassword) {
      alert('passwords do not match');
      setPassword('');
      setConfirmPassword('');
    }
  }

  return (
    <div>
      <div>
        <Avatar 
          width={390}
          height={295}
        />
      </div>
      <form onSubmit={e => onSubmit(e)}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Confirm password:
          <input
            type="text"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Zipcode:
          <input
            type="text"
            value={zipcode}
            onChange={e => setZipcode(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Interests:
          <input
            type="text"
            value={interests}
            placeholder="Up to 5 separated by commas"
            onChange={e => setInterests(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Diet Restrictions:
          <select
            value={dietRestrictions}
            onChange={e => setDietRestrictions(e.target.value)}
          >
            <option>
              Choose one
            </option>
            {dietOptions.map((option, i) => {
              return (
                <option
                  key={i}
                  value={option}
                >
                  {option}
                </option>
              );
            })}
          </select>
        </label>
        <br />
        <input
          type="submit"
          value="Save"
        />
      </form>
    </div>
  );
}

export default Profile;
