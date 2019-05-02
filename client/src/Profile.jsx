import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { saveProfile, setSnackbar } from './actionCreators';
import ProfileAvatar from './ProfileAvatar';

const styles = {
  textField: {
    width: '100%',
  },
};

function Profile({
  defaultFirstName,
  defaultLastName,
  defaultInterests,
  defaultDietRestrictions,
  dispatchSaveProfile,
  dispatchSetSnackBar,
}) {
  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [interests, setInterests] = useState(defaultInterests);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dietRestrictions, setDietRestrictions] = useState(
    defaultDietRestrictions,
  );
  const [errorMsg, setErrorMsg] = useState('');
  const dietOptions = [
    'None - I eat anything & everything!',
    'Vegan',
    'Vegetarian',
    'Gluten Free',
  ];

  function onChange(e) {
    setInterests(e.target.value.split(',') || []);

    if (interests.length > 5) {
      setErrorMsg('cannot exceed 5');
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatchSetSnackBar('passwords do not match');
      setPassword('');
      setConfirmPassword('');
    }

    if (dietRestrictions === '') {
      dispatchSetSnackBar('choose an option for diet restriction');
    }

    if (
      password === confirmPassword &&
      dietRestrictions !== '' &&
      interests.length <= 5
    ) {
      dispatchSaveProfile(
        firstName,
        lastName,
        password,
        interests,
        dietRestrictions,
      );
    }
  }

  return (
    <div className="simple-card">
      <ProfileAvatar />
      <form className="profile-form" onSubmit={e => onSubmit(e)}>
        <TextField
          style={styles.textField}
          label="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <br />
        <TextField
          style={styles.textField}
          label="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <br />
        <TextField
          style={styles.textField}
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <TextField
          style={styles.textField}
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <br />
        <TextField
          style={styles.textField}
          label="Interests"
          value={interests}
          placeholder="Up to 5 separated by commas"
          onChange={e => onChange(e)}
          error={interests.length > 5}
          helperText={errorMsg}
          required
        />
        <br />
        <TextField
          select
          style={styles.textField}
          value={dietRestrictions}
          onChange={e => setDietRestrictions(e.target.value)}
          helperText="Select your dietary option"
          required
        >
          {dietOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </div>
  );
}

Profile.propTypes = {
  defaultFirstName: PropTypes.string,
  defaultLastName: PropTypes.string,
  defaultInterests: PropTypes.arrayOf(PropTypes.string),
  defaultDietRestrictions: PropTypes.string,
  dispatchSaveProfile: PropTypes.func,
  dispatchSetSnackBar: PropTypes.func,
};

Profile.defaultProps = {
  defaultFirstName: '',
  defaultLastName: '',
  defaultInterests: [],
  defaultDietRestrictions: '',
  dispatchSaveProfile: () => {},
  dispatchSetSnackBar: () => {},
};

const mapStateToProps = ({ profile }) => ({
  defaultFirstName: profile.firstName,
  defaultLastName: profile.lastName,
  defaultInterests: profile.interests,
  defaultDietRestrictions: profile.dietRestrictions,
});

const mapDispatchToProps = {
  dispatchSaveProfile: saveProfile,
  dispatchSetSnackBar: setSnackbar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
