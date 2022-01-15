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
	}, []);

	const header = [
		'Código',
		'Nombre',
		'Teléfono',
		// 'Teléfono 2',
		// 'Celular',
		'Correo',
	];

	const body = representatives.map((representative, index) => (
		<tr key={index}>
			<td>{index + 1}</td>
			<td>{representative.id}</td>
			<td>{representative.name}</td>
			<td>{representative.telephone}</td>
			{/* <td>{representative.telephone2}</td> */}
			{/* <td>{representative.cellphone}</td> */}
			<td>{representative.email}</td>
			<td>
				<Dropdown drop='end'>
					<Dropdown.Toggle variant='outline-secondary' size='sm'>
						Acción
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item as={Link} to={`/representative/${params.idClient}/${representative.id}`}>
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
					<i>Listado de Representantes: Cliente </i>
					{client ? <strong> {`${client.longName}(${client.shortName})`}</strong> : <div></div>}
				</h1>
				<div>
					<Button
						as={Link}
						to={`/representative/${params.idClient}`}
						variant='outline-light'
						style={{ float: 'right', margin: '8px auto' }}
					>
						Crear Representante
					</Button>
				</div>
				<TableForm header={header} body={body} dataEmptyDscr='Ningún Representante disponible' />
			</div>
		</Container>
	);
}
