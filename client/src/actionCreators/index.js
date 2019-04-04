import actionTypes from '../actionTypes';

const { LOGIN, LOGOUT } = actionTypes;

export const login = (username, restaurantList) => ({ type: LOGIN, username, restaurantList });
export const logout = () => ({ type: LOGOUT });
