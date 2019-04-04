import actionTypes from '../actionTypes';

const { LOGIN, LOGOUT, SEARCH_RESTAURANTS } = actionTypes;

export const login = username => ({ type: LOGIN, username });
export const logout = () => ({ type: LOGOUT });
export const searchRestaurants = restaurants => ({ type: SEARCH_RESTAURANTS, restaurants });
