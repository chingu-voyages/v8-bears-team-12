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

  return (
    <div>
      <div>
        <Avatar 
          width={390}
          height={295}
        />
      </div>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={zipcode}
            onChange={e => setZipcode(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Interests:
          <input
            type="text"
            name="interests"
            value={interests}
            onChange={e => setInterests(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Diet Restrictions:
          <input
            type="text"
            name="dietRestrictions"
            value={dietRestrictions}
            onChange={e => setDietRestrictions(e.target.value)}
          />
        </label>
        <br></br>
        <button type="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Profile;
