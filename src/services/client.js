import axios from 'axios';

import { URL } from '../config';

export const getAllClientByIDCompany = async (idCompany, token) => {
	try {
		return await axios
			.get(`${URL}/client/company/${idCompany}`, {
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

export const getClientByID = async (id, token) => {
	try {
		return await axios
			.get(`${URL}/client/${id}`, {
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

export const createClient = async (idCompany, client, token) => {
	try {
		return await axios
			.post(
				`${URL}/client/company`,
				{ idCompany, ...client },
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

export const updateClient = async (id, client, token) => {
	try {
		return await axios
			.put(`${URL}/client/${id}`, client, {
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
