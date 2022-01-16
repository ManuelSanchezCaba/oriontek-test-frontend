import { useEffect, useState } from 'react';
import { Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import TableForm from '../../components/TableForm';
import useUser from '../../hooks/useUser';
import { getClientByID } from '../../services/client';
import { getAllRepresentativeByIDClient } from '../../services/representative';

export default function ListRepresentative() {
	const params = useParams();
	const [representatives, setRepresentatives] = useState([]);
	const [client, setClient] = useState(null);
	const { token } = useUser();

	useEffect(() => {
		(async () => {
			setRepresentatives(await getAllRepresentativeByIDClient(params.idClient, token));
			setClient(await getClientByID(params.idClient, token));
		})();
	}, [params.idClient]);

	const columns = [
		{
			Header: 'Código',
			accessor: 'id', // accessor is the "key" in the data
		},
		{
			Header: 'Nombre',
			accessor: 'name',
		},
		{
			Header: 'Teléfono',
			accessor: 'telephone',
		},
		{
			Header: 'Correo',
			accessor: 'email',
		},
		{
			Header: 'Acción',
			accessor: 'action',
		},
	];

	const data = representatives
		.map((representative) => [
			{
				id: representative.id,
				name: representative.name,
				telephone: representative.telephone,
				email: representative.email,
				action: (
					<Dropdown drop='end'>
						<Dropdown.Toggle variant='outline-secondary' size='sm'>
							Acción
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item
								as={Link}
								to={`/representative/${params.idClient}/${representative.id}`}
							>
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
					<i>Listado de Representantes: Cliente </i>
					{client ? <strong> {`${client.longName}(${client.shortName})`}</strong> : <div></div>}
				</h1>
				<TableForm columns={columns} data={data} dataEmptyDscr='Ninguna compañía disponible'>
					<Button as={Link} to={`/representative/${params.idClient}`} variant='outline-light'>
						Crear Representante
					</Button>
				</TableForm>
			</div>
		</Container>
	);
}
