import { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useUser from '../../hooks/useUser';
import { createAddress, getAddressByID, updateAddress } from '../../services/address';

export default function AddressForm() {
	const params = useParams();
	const navigate = useNavigate();
	const { token } = useUser();
	const [country, setCountry] = useState('');
	const [city, setCity] = useState('');
	const [municipality, setMunicipality] = useState('');
	const [street, setStreet] = useState('');
	const [streetNo, setStreetNo] = useState('');
	const [postalCode, setPostalCode] = useState('');

	useEffect(() => {
		(async () => {
			const res = await getAddressByID(params.idAddress, token);

			if (res) {
				setCountry(res.country);
				setCity(res.city);
				setMunicipality(res.municipality);
				setStreet(res.street);
				setStreetNo(res.streetNo);
				setPostalCode(res.postalCode);
			}
		})();
	}, [params.idAddress]);

	const validateResult = (res) => {
		if (res === 'Unauthorized') {
			toast.error('No tiene permisos para realizar esta operación');
		} else {
			toast.success(params.idAddress ? 'Actualizada con Éxito' : 'Creada con Éxito');
			navigate(`/addresses/${params.idClient}`);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const address = {
			country,
			city,
			municipality,
			street,
			streetNo,
			postalCode,
		};

		validateResult(await createAddress(params.idClient, address, token));
	};

	const handleUpdateSubmit = async (e) => {
		e.preventDefault();

		const address = {
			country,
			city,
			municipality,
			street,
			streetNo,
			postalCode,
		};

		validateResult(await updateAddress(params.idAddress, address, token));
	};

	return (
		<Container>
			<div className='center'>
				<h1>Dirección</h1>
				<Form onSubmit={params.idAddress ? handleUpdateSubmit : handleSubmit}>
					<Row className='mb-3'>
						<Form.Group as={Col} controlId='formGridCountry'>
							<Form.Label>País</Form.Label>
							<Form.Control
								type='text'
								placeholder='País'
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId='formGridCity'>
							<Form.Label>Ciudad</Form.Label>
							<Form.Control
								type='text'
								placeholder='Ciudad'
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
							/>
						</Form.Group>
					</Row>
					<Row className='mb-3'>
						<Form.Group as={Col} controlId='formGridMunicipality'>
							<Form.Label>Municipio</Form.Label>
							<Form.Control
								type='text'
								placeholder='Municipio'
								value={municipality}
								onChange={(e) => setMunicipality(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId='formGridStreet'>
							<Form.Label>Calle</Form.Label>
							<Form.Control
								type='text'
								placeholder='Calle'
								value={street}
								onChange={(e) => setStreet(e.target.value)}
								required
							/>
						</Form.Group>
					</Row>
					<Row className='mb-3'>
						<Form.Group as={Col} controlId='formGridStreetNo'>
							<Form.Label>No.</Form.Label>
							<Form.Control
								type='number'
								placeholder='No. Calle'
								value={streetNo}
								onChange={(e) => setStreetNo(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId='formGridPostalCode'>
							<Form.Label>Código Postal</Form.Label>
							<NumberFormat
								className='form-control'
								format='#####'
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								placeholder='Código Postal'
								required
							/>
						</Form.Group>
					</Row>

					<Button variant='primary' type='submit'>
						{params.idAddress ? 'Actualizar' : 'Crear'}
					</Button>
				</Form>
			</div>
		</Container>
	);
}
