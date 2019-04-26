import axios from 'axios';
import socket from '../socket-io';

import {
  SET_PROFILE,
  REMOVE_PROFILE,
  SET_SNACKBAR,
  REMOVE_SNACKBAR,
  SET_CHAT_MESSAGES,
} from '../actionTypes';

export const setSnackbar = message => ({
  type: SET_SNACKBAR,
  message,
});

export const removeSnackbar = () => ({
  type: REMOVE_SNACKBAR,
  message: '',
});

export const logoutAction = dispatch => {
  dispatch({ type: REMOVE_PROFILE });
  socket.disconnect();
};

export const setProfileThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/profile');
    const { data } = response;
    const { user } = data;

    dispatch({ type: SET_PROFILE, payload: user });
    socket.getInstance();
  } catch (err) {
    logoutAction(dispatch);
  }
};

export const loginThunk = payload => async dispatch => {
  const response = await axios.post('/api/login', payload);
  const { error } = response.data;
  if (error) {
    dispatch(setSnackbar(error.message));
  } else {
    setProfileThunk()(dispatch);
  }
};

// registering the user
export const registerUser = userData => async dispatch => {
  const response = await axios.post('/api/register', { user: userData });
  const { error } = response.data;

  if (error) dispatch(setSnackbar(error.message));
};

export const saveProfile = (
  firstName,
  lastName,
  password,
  interests,
  dietRestrictions,
) => async dispatch => {
  try {
    const response = await axios.post('/api/profile', {
      firstName,
      lastName,
      password,
      interests,
      dietRestrictions,
    });
    dispatch(setSnackbar('profile saved successfully'));
    const { error } = response.data;
    if (error) dispatch(setSnackbar(error.message));
    setProfileThunk()(dispatch);
  } catch (error) {
    dispatch(setSnackbar(error.message));
  }
};

export const uploadPhoto = file => async dispatch => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axios.post('/api/profile-photo-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  const { error } = response.data;
  if (error) dispatch(setSnackbar(error.message));
};

export const addRestaurant = restaurant => async dispatch => {
  await axios.post('/api/restaurant-choice', { restaurant });
  setProfileThunk()(dispatch);
};

export const removeRestaurant = id => async dispatch => {
  await axios.delete('/api/restaurant-choice', { data: { id } });
  setProfileThunk()(dispatch);
};

export const logoutThunk = () => async dispatch => {
  await axios.get('/api/logout');
  logoutAction(dispatch);
};

export const setSearchLocation = ({
  lat,
  lon,
  city,
  state,
  country,
}) => async dispatch => {
  const data = {
    lat,
    lon,
    city,
    state,
    country,
  };
  await axios.post('/api/set-search-location', data);
  setProfileThunk()(dispatch);
  window.location = '/';
};

export const palAdd = palId => async dispatch => {
  await axios.post(`/api/chat-add/${palId}`);
  setProfileThunk()(dispatch);
};

export const sendChat = ({ palId, text }) => async dispatch => {
  const response = await axios.post(`/api/chat-message/${palId}`, { text });
  const { error } = response.data;
  if (error) {
    dispatch(setSnackbar(error.message));
  } else {
    setProfileThunk()(dispatch);
  }
};

export const getChatMessages = ({ palId }) => async dispatch => {
  const response = await axios.get(`/api/chat-messages/${palId}`);
  const { error } = response.data;
  if (error) {
    dispatch(setSnackbar(error.message));
  } else {
    const { messages } = response.data;
    dispatch({ type: SET_CHAT_MESSAGES, payload: { messages } });
  }
};
