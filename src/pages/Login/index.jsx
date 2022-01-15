import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './style.css';

import useUser from '../../hooks/useUser';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { token, login } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			navigate('/');
		}
	}, [token]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		login(username, password);
	};

	return (
		<div className='Login'>
			<img
				style={{
					display: 'block',
					margin: '10px auto',
					width: '50%',
					borderRadius: '2px',
					border: '1px solid black',
				}}
				src='data:image/jpeg;base64,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'
				alt='Girl in a jacket'
				width='100'
				height='100'
			></img>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicUsername'>
					<Form.Label>Nombre de usuario</Form.Label>
					<Form.Control
						type='username'
						placeholder='Usuario'
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Contraseña</Form.Label>
					<Form.Control
						type='password'
						placeholder='Contraseña'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<div className='d-grid gap-2'>
					<Button variant='primary' type='submit' size='lg'>
						Submit
					</Button>
				</div>
			</Form>
		</div>
	);
}
