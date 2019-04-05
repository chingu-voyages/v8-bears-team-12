import actionTypes from '../actionTypes';

const { LOGIN, LOGOUT } = actionTypes;

export const login = (username, restaurantsList) => ({ type: LOGIN, username, restaurantsList });
export const logout = () => ({ type: LOGOUT });
