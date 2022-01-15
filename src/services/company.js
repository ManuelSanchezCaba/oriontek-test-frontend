import axios from 'axios';

import { URL } from '../config';

export const getAllCompany = async (token) => {
	try {
		return await axios
			.get(`${URL}/company`, {
				headers: {
					'x-access-token': token,
				},
			})
			.then((res) => res.data)
			.catch((err) => err.response.data.message);
	} catch (error) {
		console.log(error);
	}
};

export const getCompanyByID = async (id, token) => {
	try {
		return await axios
			.get(`${URL}/company/${id}`, {
				headers: {
					'x-access-token': token,
				},
			})
			.then((res) => res.data)
			.catch((err) => err.response.data.message);
	} catch (error) {
		console.log(error);
	}
};

export const createCompany = async (company, token) => {
	try {
		return await axios
			.post(`${URL}/company`, company, {
				headers: {
					'x-access-token': token,
				},
			})
			.then((res) => res.data)
			.catch((err) => err.response.data.message);
	} catch (error) {
		console.log(error);
	}
};

export const updateCompany = async (id, company, token) => {
	try {
		return await axios
			.put(`${URL}/company/${id}`, company, {
				headers: {
					'x-access-token': token,
				},
			})
			.then((res) => res.data)
			.catch((err) => err.response.data.message);
	} catch (error) {
		console.log(error);
	}
};
