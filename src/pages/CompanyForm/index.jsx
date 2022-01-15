import { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import useUser from '../../hooks/useUser';
import { createCompany, getCompanyByID, updateCompany } from '../../services/company';

export default function CompanyForm() {
	const navigate = useNavigate();
	const params = useParams();
	const { token } = useUser();
	const [shortName, setShortName] = useState('');
	const [longName, setLongName] = useState('');
	const [rnc, setRnc] = useState('');
	const [telephone, setTelephone] = useState('');
	const [telephone2, setTelephone2] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');

	useEffect(() => {
		(async () => {
			const res = await getCompanyByID(params.id, token);

			setShortName(res.shortName);
			setLongName(res.longName);
			setRnc(res.rnc);
			setTelephone(res.telephone);
			setTelephone2(res.telephone2);
			setEmail(res.email);
			setAddress(res.address);
		})();
	}, []);

	const validateResult = (res) => {
		if (res === 'Unauthorized') {
			toast.error('No tiene permisos para realizar esta operación');
		} else {
			toast.success(params.id ? 'Actualizada con Éxito' : 'Creada con Éxito');
			navigate('/');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const company = {
			shortName,
			longName,
			rnc,
			telephone,
			telephone2,
			email,
			address,
		};

		validateResult(await createCompany(company, token));
	};

	const handleUpdateSubmit = async (e) => {
		e.preventDefault();

		const company = {
			shortName,
			longName,
			rnc,
			telephone,
			telephone2,
			email,
			address,
		};

		validateResult(await updateCompany(params.id, company, token));
	};

	return (
		<Container>
			<div className='center'>
				<h1>Compañía</h1>
				<Form onSubmit={params.id ? handleUpdateSubmit : handleSubmit}>
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
							<Form.Label>Nombre Compañía</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nombre'
								value={longName}
								onChange={(e) => setLongName(e.target.value)}
								required
							/>
						</Form.Group>
					</Row>
					<Form.Group className='mb-3' controlId='formGridAddress'>
						<Form.Label>Dirección</Form.Label>
						<Form.Control
							placeholder='Dirección'
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							required
						/>
					</Form.Group>
					<Row className='mb-3'>
						<Form.Group as={Col} controlId='formGridRNC'>
							<Form.Label>RNC</Form.Label>
							<NumberFormat
								className='form-control'
								format='#########'
								value={rnc}
								onChange={(e) => setRnc(e.target.value)}
								placeholder='RNC'
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
						<Form.Group as={Col} controlId='formGridTelephone'>
							<Form.Label>Teléfono 2</Form.Label>
							<NumberFormat
								className='form-control'
								format='(###)###-####'
								value={telephone2}
								onChange={(e) => setTelephone2(e.target.value)}
								placeholder='Teléfono 2'
							/>
						</Form.Group>
					</Row>

					<Button variant='primary' type='submit'>
						{params.id ? 'Actualizar' : 'Crear'}
					</Button>
				</Form>
			</div>
		</Container>
	);
}
