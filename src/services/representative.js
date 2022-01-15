import axios from 'axios';

import { URL } from '../config';

export const getAllRepresentativeByIDClient = async (idClient, token) => {
	try {
		return await axios
			.get(`${URL}/representative/client/${idClient}`, {
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

export const getRepresentativeByID = async (id, token) => {
	try {
		return await axios
			.get(`${URL}/representative/${id}`, {
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

export const createRepresentative = async (idClient, representative, token) => {
	try {
		return await axios
			.post(
				`${URL}/representative`,
				{ idClient, ...representative },
				{
					headers: {
						'x-access-token': token,
					},
				}
			)
			.then((res) => res.data)
			.catch((err) => err.response.data.message);
	} catch (error) {
		console.log(error);
	}
};

export const updateRepresentative = async (id, representative, token) => {
	try {
		return await axios
			.put(`${URL}/representative/${id}`, representative, {
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
