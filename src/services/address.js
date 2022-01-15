import axios from 'axios';

import { URL } from '../config';

export const getAllAddressByIDClient = async (idClient, token) => {
	try {
		return await axios
			.get(`${URL}/address/client/${idClient}`, {
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

export const getAddressByID = async (id, token) => {
	try {
		return await axios
			.get(`${URL}/address/${id}`, {
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

export const createAddress = async (idClient, address, token) => {
	try {
		return await axios
			.post(
				`${URL}/address`,
				{ idClient, ...address, status: true },
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

export const updateAddress = async (id, address, token) => {
	try {
		return await axios
			.put(`${URL}/address/${id}`, address, {
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
