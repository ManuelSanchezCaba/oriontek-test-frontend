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

	const columns = [
		{
			Header: 'Código',
			accessor: 'id', // accessor is the "key" in the data
		},
		{
			Header: 'País',
			accessor: 'country',
		},
		{
			Header: 'Ciudad',
			accessor: 'city',
		},
		{
			Header: 'Municipio',
			accessor: 'municipality',
		},
		{
			Header: 'Calle',
			accessor: 'street',
		},
		{
			Header: 'No.',
			accessor: 'streetNo',
		},
		{
			Header: 'Código Postal',
			accessor: 'postalCode',
		},
		{
			Header: 'Estado',
			accessor: 'status',
		},
		{
			Header: 'Acción',
			accessor: 'action',
		},
	];

	const data = addresses
		.map((address) => [
			{
				id: address.id,
				country: address.country,
				city: address.city,
				municipality: address.municipality,
				street: address.street,
				streetNo: address.streetNo,
				postalCode: address.postalCode,
				status: address.status.data[0] === 1 ? 'Activo' : 'Inactivo',
				action: (
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
				),
			},
		])
		.flat();

	return (
		<Container>
			<div className='center'>
				<h1>
					<i>Listado de Direcciones: Cliente </i>
					{client ? <strong>{`${client.longName}(${client.shortName})`}</strong> : <div></div>}
				</h1>
				<TableForm columns={columns} data={data} dataEmptyDscr='Ninguna compañía disponible'>
					<Button as={Link} to={`/address/${params.idClient}`} variant='outline-light'>
						Crear Dirección
					</Button>
				</TableForm>
			</div>
		</Container>
	);
}
