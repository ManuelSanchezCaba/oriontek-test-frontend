import { useEffect, useState } from 'react';
import { Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import TableForm from '../../components/TableForm';
import useUser from '../../hooks/useUser';
import { getAllAddressByIDClient } from '../../services/address';
import { getClientByID } from '../../services/client';

export default function ListAddress() {
	const params = useParams();
	const [addresses, setAddresses] = useState([]);
	const [client, setClient] = useState(null);
	const { token } = useUser();

	useEffect(() => {
		(async () => {
			setAddresses(await getAllAddressByIDClient(params.idClient, token));
			setClient(await getClientByID(params.idClient, token));
		})();
	}, [params.idClient]);

	const header = [
		'Código',
		'País',
		'Ciudad',
		'Municipio',
		'Calle',
		'No. Calle',
		'Código Postal',
		'Estado',
	];

	const body = addresses.map((address, index) => (
		<tr key={index}>
			<td>{index + 1}</td>
			<td>{address.id}</td>
			<td>{address.country}</td>
			<td>{address.city}</td>
			<td>{address.municipality}</td>
			<td>{address.street}</td>
			<td>{address.streetNo}</td>
			<td>{address.postalCode}</td>
			<td>{address.status.data[0] === 1 ? 'Activo' : 'Inactivo'}</td>
			<td>
				<Dropdown drop='end'>
					<Dropdown.Toggle variant='outline-secondary' size='sm'>
						Acción
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item as={Link} to={`/address/${params.idClient}/${address.id}`}>
							Actualizar
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</td>
		</tr>
	));

	return (
		<Container>
			<div className='center'>
				<h1>
					<i>Listado de Direcciones: Cliente </i>
					{client ? <strong>{`${client.longName}(${client.shortName})`}</strong> : <div></div>}
				</h1>
				<div>
					<Button
						as={Link}
						to={`/address/${params.idClient}`}
						variant='outline-light'
						style={{ float: 'right', margin: '8px auto' }}
					>
						Crear Dirección
					</Button>
				</div>
				<TableForm
					header={header}
					body={body}
					dataEmptyDscr='Ningúna Dirección disponible'
					colSpan='10'
				/>
			</div>
		</Container>
	);
}
