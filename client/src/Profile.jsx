import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-avatar-edit';

import { saveProfile, uploadPhoto } from './actionCreators';

function Profile({
  defaultFirstName,
  defaultLastName,
  defaultInterests,
  defaultDietRestrictions,
  dispatchSaveProfile,
  dispatchUploadPhoto,
}) {
  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [interests, setInterests] = useState(defaultInterests);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dietRestrictions, setDietRestrictions] = useState(
    defaultDietRestrictions,
  );
  const [dietOptionOther, setDietOptionOther] = useState(false);
  const [preview, setPreview] = useState(null);
  const [src] = useState('');
  const dietOptions = [
    'Choose one',
    'None - I eat anything & everything!',
    'Vegan',
    'Vegetarian',
    'Gluten Free',
    'Other',
  ];
  const specifyOtherDiet = React.createRef();

  function onCrop(currView) {
    setPreview(currView);
    console.log('this is src', src);
  }

  function onClose() {
    setPreview(null);
  }

  function onBeforeFileLoad(file) {
    if (file.target.files[0].size > 300000) {
      alert('File is too big!');
      file.target.value = '';
    }
  }

  function onFileLoad(file) {
    dispatchUploadPhoto(file);
  }

  function handleDietOption(e) {
    if (e.target.value === 'Other') {
      setDietOptionOther(true);
    }
    setDietRestrictions(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      setPassword('');
      setConfirmPassword('');
    }

    if (dietRestrictions === '' || dietRestrictions === 'Choose one') {
      alert('choose an option for diet restriction');
    }

    if (
      password === confirmPassword &&
      (dietRestrictions !== '' && dietRestrictions !== 'Choose one')
    ) {
      // alert('changes are successfully saved');

      const userChanges = {
        firstName,
        lastName,
        password,
        interests,
        dietRestrictions,
      };

      dispatchSaveProfile(
        firstName,
        lastName,
        password,
        interests,
        dietRestrictions
      );
      console.log('this is userChanges', userChanges);

      setPassword('');
      setConfirmPassword('');
      specifyOtherDiet.current.value = '';
    }
    setDietOptionOther(false);
  }

  return (
    <div>
      <div>

        <Avatar
          width={390}
          height={295}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={src}
          onFileLoad={onFileLoad}
        />
        <img src={preview} alt="Preview" />
      </div>
      <form onSubmit={e => onSubmit(e)}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Confirm password:
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
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
          <select value={dietRestrictions} onChange={e => handleDietOption(e)} required>
            {dietOptions.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <input
          type="text"
          style={{
            display: dietOptionOther ? 'block' : 'none',
          }}
          ref={specifyOtherDiet}
          onChange={e => handleDietOption(e)}
        />
        <br />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

const mapStateToProps = ({ profile }) => ({
  defaultFirstName: profile.firstName,
  defaultLastName: profile.lastName,
  defaultInterests: profile.interests,
  defaultDietRestrictions: profile.dietRestrictions,
});
const mapDispatchToProps = {
  dispatchSaveProfile: saveProfile,
  dispatchUploadPhoto: uploadPhoto,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
