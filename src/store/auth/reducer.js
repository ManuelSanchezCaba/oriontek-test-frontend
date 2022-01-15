import { GET_LOGIN, GET_LOGOUT, POST_USER } from './types';

let initialState = {
	token: localStorage.getItem('token') || null,
};

export default (state = initialState, action) => {
	const { payload, type } = action;

	switch (type) {
		case GET_LOGIN:
			return {
				...state,
				token: payload,
			};
		case GET_LOGOUT:
			return {
				...state,
				token: payload,
			};
		case POST_USER:
			return {
				...state,
				token: payload,
			};
		default:
			return state;
	}
};
