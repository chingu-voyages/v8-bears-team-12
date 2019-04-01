import actionTypes from '../actionTypes';

const { LOGIN, LOGOUT } = actionTypes;

export const login = username => ({ type: LOGIN, username });
export const logout = () => ({ type: LOGOUT });
