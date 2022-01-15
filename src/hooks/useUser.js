import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getLogin, getLogout } from '../store/auth/action';
import { getTokenUser } from '../services/getTokenUser';

export default function useUser() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.authReducer.token);

	const login = useCallback(async (username, password) => {
		const result = await getTokenUser(username, password);

		if (!result.token) {
			toast.error(`Contraseña Incorrecta`);
			return;
		}

		dispatch(getLogin(result.token));
		toast.success('Usuario Logueado');
	}, []);

	const logout = useCallback(() => {
		dispatch(getLogout());
	}, []);

	return { token, login, logout };
}
