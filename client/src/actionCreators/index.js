import axios from 'axios';

import { SET_PROFILE, REMOVE_PROFILE } from '../actionTypes';

export const setProfileThunk = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/profile');
    const { data } = response;
    const { user } = data;

    dispatch({ type: SET_PROFILE, payload: user });
  } catch (err) {
    dispatch({ type: REMOVE_PROFILE });
    console.log(err.message); // eslint-disable-line no-console
  }
};

export const loginThunk = payload => async (dispatch) => {
  await axios.post('/api/login', payload);
  setProfileThunk()(dispatch);
};

// registering the user
export const registerUser = userData => (dispatch) => {
  axios.post('/api/register', { user: userData });
};

export const saveProfile = (
  firstName,
  lastName,
  password,
  zipcode,
  interests,
  dietRestrictions,
) => async (dispatch) => {
  try {
    const response = await axios.post('/api/profile', {
      firstName,
      lastName,
      password,
      zipcode,
      interests,
      dietRestrictions,
    });
    setProfileThunk()(dispatch);
  } catch (err) {
    console.error(err.message);
  }
};

export const uploadPhoto = file => async (dispatch) => {
  const formData = new FormData();
  formData.append('image', file);
  await axios.post('/api/profile-photo-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log({ file });
};

export const addRestaurant = restaurant => async (dispatch) => {
  await axios.post('/api/restaurant-choice', { restaurant });
  setProfileThunk()(dispatch);
};

export const removeRestaurant = id => async (dispatch) => {
  await axios.delete('/api/restaurant-choice', { data: { id } });
  setProfileThunk()(dispatch);
};

export const logoutThunk = () => async (dispatch) => {
  await axios.get('/api/logout');
  dispatch({ type: REMOVE_PROFILE });
};

export const setSearchLocation = ({
  lat, lon, city, state, country,
}) => async (dispatch) => {
  const data = {
    lat,
    lon,
    city,
    state,
    country,
  };
  await axios.post('/api/set-search-location', data);
  setProfileThunk()(dispatch);
};
