import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [interests, setInterests] = useState([]);
  const [dietRestrictions, setDietRestrictions] = useState('');
  // const [preview, setPreview] = useState(null);
  // const [src, setSrc] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    console.log('clicked')
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
            onChange={e => setInterests(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Diet Restrictions:
          <input
            type="text"
            value={dietRestrictions}
            onChange={e => setDietRestrictions(e.target.value)}
            required
          />
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
