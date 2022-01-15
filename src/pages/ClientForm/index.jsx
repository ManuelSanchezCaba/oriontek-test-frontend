import { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useUser from '../../hooks/useUser';
import { createClient, getClientByID, updateClient } from '../../services/client';

export default function ClientForm() {
	const params = useParams();
	const navigate = useNavigate();
	const { token } = useUser();
	const [shortName, setShortName] = useState('');
	const [longName, setLongName] = useState('');
	const [cedulaRNC, setCedulaRNC] = useState('');
	const [email, setEmail] = useState('');
	const [telephone, setTelephone] = useState('');
	const [cellphone, setCellphone] = useState('');
	const [isRNC, setIsRNC] = useState(true);

	useEffect(() => {
		(async () => {
			const res = await getClientByID(params.idClient, token);

			setIsRNC(res.isCompany);
			setShortName(res.shortName);
			setLongName(res.longName);
			setCedulaRNC(res.cedulaRNC);
			setEmail(res.email);
			setTelephone(res.telephone);
			setCellphone(res.cellphone);
		})();
	}, []);

	const handleOnChange = (e) => {
		setIsRNC(e.target.value === 'true');
	};

	const validateResult = (res) => {
		if (res === 'Unauthorized') {
			toast.error('No tiene permisos para realizar esta operación');
		} else {
			toast.success(params.idClient ? 'Actualizada con Éxito' : 'Creada con Éxito');
			navigate(`/clients/${params.idCompany}`);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const client = {
			isCompany: isRNC,
			shortName,
			longName,
			cedulaRNC,
			email,
			telephone,
			cellphone,
		};

		validateResult(await createClient(params.idCompany, client, token));
	};

	const handleUpdateSubmit = async (e) => {
		e.preventDefault();

		const client = {
			isCompany: isRNC,
			shortName,
			longName,
			cedulaRNC,
			email,
			telephone,
			cellphone,
		};

		validateResult(await updateClient(params.idClient, client, token));
	};

	return (
		<Container>
			<div className='center'>
				<h1>Cliente</h1>
				<Form onSubmit={params.idClient ? handleUpdateSubmit : handleSubmit}>
					<Row className='mb-3'>
						<Form.Group as={Col} controlId='formGridAlias'>
							<Form.Label>Alias</Form.Label>
							<Form.Control
								type='text'
								placeholder='Alias'
								value={shortName}
								onChange={(e) => setShortName(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId='formGridName'>
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nombre'
								value={longName}
								onChange={(e) => setLongName(e.target.value)}
								required
							/>
						</Form.Group>
					</Row>
					<Row className='mb-3'>
						<Form.Group as={Col} controlId='formGridRNC'>
							<Form.Label>Cédula/RNC</Form.Label>
							<InputGroup className='mb-3'>
								<div>
									<Form.Select onChange={handleOnChange}>
										<option value='true'>RNC</option>
										<option value='false'>Cédula</option>
									</Form.Select>
								</div>
								{isRNC ? (
									<NumberFormat
										className='form-control'
										format='#########'
										value={cedulaRNC}
										onChange={(e) => setCedulaRNC(e.target.value)}
										required
									/>
								) : (
									<NumberFormat
										className='form-control'
										format='###-#######-#'
										value={cedulaRNC}
										onChange={(e) => setCedulaRNC(e.target.value)}
										required
									/>
								)}
							</InputGroup>
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
						{params.idClient ? 'Actualizar' : 'Crear'}
					</Button>
				</Form>
			</div>
		</Container>
	);
}
