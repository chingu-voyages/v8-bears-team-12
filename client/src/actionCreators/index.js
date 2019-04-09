import axios from 'axios';
import { LOGIN, LOGOUT } from '../actionTypes';

export const login = (username, restaurantsList, payload = {}) => ({
  type: LOGIN,
  username,
  restaurantsList,
  payload,
});

export const logout = () => ({ type: LOGOUT });

export const updateProfile = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/profile');
    const { data } = response;
    const { user } = data;
    const { name, restaurantsList } = user;
    console.log({ user });
    dispatch(login(name, restaurantsList, user));
  } catch (err) {
    dispatch(logout());
    console.log(err.message); // eslint-disable-line no-console
  }
};

export const saveProfile = (
  firstName,
  lastName,
  password,
  zipcode,
  interests,
  dietRestrictions
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
    updateProfile()(dispatch);
  } catch (err) {
    console.error(err.message);
  }
};

export const addRestaurant = restaurant => async (dispatch) => {
  await axios.post('/api/restaurant-choice', { restaurant });
  updateProfile()(dispatch);
};

export const removeRestaurant = id => async (dispatch) => {
  await axios.delete('/api/restaurant-choice', { data: { id } });
  updateProfile()(dispatch);
};
