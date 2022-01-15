import { URL } from '../config';
import axios from 'axios';

export const getTokenUser = async (username, password) => {
	return await axios
		.post(`${URL}/signin`, { username, email: username, password })
		.then((res) => res.data);
};
