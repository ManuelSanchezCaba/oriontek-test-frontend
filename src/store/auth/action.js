import { GET_LOGIN, GET_LOGOUT, POST_USER } from './types';

export const getLogin = (token) => {
	localStorage.setItem('token', token);
	return {
		type: GET_LOGIN,
		payload: token,
	};
};

export const getLogout = () => {
	localStorage.removeItem('token');
	return {
		type: GET_LOGOUT,
		payload: null,
	};
};

export const createUser = async (token) => {
	return {
		type: POST_USER,
		payload: token,
	};
};
