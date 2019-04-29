import axios from 'axios';
import Cookies from 'js-cookie';
import socket from '../socket-io';

import {
  SET_PROFILE,
  REMOVE_PROFILE,
  SET_SNACKBAR,
  REMOVE_SNACKBAR,
  SET_CHAT_MESSAGES,
  CLEAR_CHAT_MESSAGES,
  SET_DININGMATES,
  CLEAR_DININGMATES,
  SET_ROUTER_LOCATION,
  UNSET_ROUTER_LOCATION,
} from '../actionTypes';

export const setSnackbar = message => ({
  type: SET_SNACKBAR,
  message,
});

export const removeSnackbar = () => ({
  type: REMOVE_SNACKBAR,
  message: '',
});

export const logoutAction = async dispatch => {
  dispatch({ type: REMOVE_PROFILE });
  await socket.disconnect();
};

export const setProfileThunk = () => async dispatch => {
  if (!Cookies.get('has_jwt')) return logoutAction(dispatch);
  try {
    const response = await axios.get('/api/profile');
    const { data } = response;
    const { user } = data;

    dispatch({ type: SET_PROFILE, payload: user });
    socket.getInstance().emit('REQUEST_NEW_MESSAGES');
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
  await logoutAction(dispatch);
};

export const setSearchLocation = ({
  lat,
  lon,
  city,
  state,
  country,
  history,
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
  history.push('/home');
};

export const palAdd = palId => async dispatch => {
  const res = await axios.post(`/api/chat-add/${palId}`);
  const { error } = res.data;
  dispatch(setSnackbar(error ? error.message : 'Pal added'));
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

export const setDiningMates = () => async dispatch => {
  const res = await axios.get('/api/dining-mates');
  const { diningMates } = res.data;
  dispatch({ type: SET_DININGMATES, payload: { diningMates } });
};

export const clearDiningmates = () => dispatch => {
  dispatch({ type: CLEAR_DININGMATES });
};

export const getChatMessages = ({ palId }) => async dispatch => {
  const response = await axios.get(`/api/chat-messages/${palId}`);
  socket.getInstance().emit('REQUEST_NEW_MESSAGES');
  const { error } = response.data;
  if (error) {
    dispatch(setSnackbar(error.message));
  } else {
    const { messages } = response.data;
    dispatch({ type: SET_CHAT_MESSAGES, payload: { messages } });
  }
};

export const clearChatMessages = () => dispatch => {
  dispatch({ type: CLEAR_CHAT_MESSAGES });
};

export const removePal = palId => async dispatch => {
  try {
    await axios.delete(`/api/chat-remove/${palId}`);
    dispatch(setSnackbar('Pal removed'));
    setProfileThunk()(dispatch);
  } catch (err) {
    dispatch(setSnackbar(err.message));
  }
};

export const setRouterPath = location => dispatch => {
  dispatch({ type: SET_ROUTER_LOCATION, payload: { location } });
};

export const unsetRouterPath = () => dispatch => {
  dispatch({ type: UNSET_ROUTER_LOCATION });
};
