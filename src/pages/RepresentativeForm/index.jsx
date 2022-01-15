import { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useUser from '../../hooks/useUser';
import {
	createRepresentative,
	getRepresentativeByID,
	updateRepresentative,
} from '../../services/representative';

export default function RepresentativeForm() {
	const params = useParams();
	const navigate = useNavigate();
	const { token } = useUser();
	const [name, setName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [telephone2, setTelephone2] = useState('');
	const [cellphone, setCellphone] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		(async () => {
			const res = await getRepresentativeByID(params.idRepresentative, token);

			setName(res.name);
			setTelephone(res.telephone);
			setTelephone2(res.telephone2);
			setCellphone(res.cellphone);
			setEmail(res.email);
		})();
	}, []);

	const validateResult = (res) => {
		if (res === 'Unauthorized') {
			toast.error('No tiene permisos para realizar esta operación');
		} else {
			toast.success(params.idRepresentative ? 'Actualizada con Éxito' : 'Creada con Éxito');
			navigate(`/representatives/${params.idClient}`);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const representative = {
			name,
			telephone,
			telephone2,
			cellphone,
			email,
		};

		validateResult(await createRepresentative(params.idClient, representative, token));
	};

	const handleUpdateSubmit = async (e) => {
		e.preventDefault();

		const representative = {
			name,
			telephone,
			telephone2,
			cellphone,
			email,
		};

		validateResult(await updateRepresentative(params.idRepresentative, representative, token));
	};

	return (
		<Container>
			<div className='center'>
				<h1>Representante</h1>
				<Form onSubmit={params.idRepresentative ? handleUpdateSubmit : handleSubmit}>
					<Row className='mb-3'>
						<Form.Group as={Col} controlId='formGridName'>
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nombre'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId='formGridEmail'>
							<Form.Label>Correo</Form.Label>
							<Form.Control
								type='email'
								placeholder='Correo'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>
					</Row>
					<Row className='mb-3'>
						<Form.Group as={Col} controlId='formGridTelephone'>
							<Form.Label>Teléfono</Form.Label>
							<NumberFormat
								className='form-control'
								format='(###)###-####'
								value={telephone}
								onChange={(e) => setTelephone(e.target.value)}
								placeholder='Teléfono 1'
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId='formGridTelephone2'>
							<Form.Label>Teléfono 2</Form.Label>
							<NumberFormat
								className='form-control'
								format='(###)###-####'
								value={telephone2}
								onChange={(e) => setTelephone2(e.target.value)}
								placeholder='Teléfono 2'
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId='formGridTelephone'>
							<Form.Label>Celular</Form.Label>
							<NumberFormat
								className='form-control'
								format='(###)###-####'
								value={cellphone}
								onChange={(e) => setCellphone(e.target.value)}
								placeholder='Teléfono 2'
							/>
						</Form.Group>
					</Row>

					<Button variant='primary' type='submit'>
						{params.idRepresentative ? 'Actualizar' : 'Crear'}
					</Button>
				</Form>
			</div>
		</Container>
	);
}
