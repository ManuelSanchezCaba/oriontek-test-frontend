import { useEffect, useState } from 'react';
import { Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import TableForm from '../../components/TableForm';
import useUser from '../../hooks/useUser';
import { getAllClientByIDCompany } from '../../services/client';
import { getCompanyByID } from '../../services/company';

export default function ListClients() {
	const params = useParams();
	const [clients, setClients] = useState([]);
	const [company, setCompany] = useState(null);
	const { token } = useUser();

	useEffect(() => {
		(async () => {
			setClients(await getAllClientByIDCompany(params.idCompany, token));
			setCompany(await getCompanyByID(params.idCompany, token));
		})();
	}, [params.idCompany]);

	const header = [
		'Código',
		// 'Alias',
		'Nombre',
		'Cédula/RNC',
		'Correo',
		'Teléfono',
		// 'Celular'
	];

	const body = clients.map((client, index) => (
		<tr key={index}>
			<td>{index + 1}</td>
			<td>{client.id}</td>
			{/* <td>{client.shortName}</td> */}
			<td>{client.longName}</td>
			<td>{client.cedulaRNC}</td>
			<td>{client.email}</td>
			<td>{client.telephone}</td>
			{/* <td>{client.cellphone}</td> */}
			<td>
				<Dropdown drop='end'>
					<Dropdown.Toggle variant='outline-secondary' size='sm'>
						Acción
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item as={Link} to={`/client/${params.idCompany}/${client.id}`}>
							Actualizar
						</Dropdown.Item>
						<Dropdown.Item as={Link} to={`/representatives/${client.id}`}>
							Representantes
						</Dropdown.Item>
						<Dropdown.Item as={Link} to={`/addresses/${client.id}`}>
							Direcciones
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
					<i>Listado de Clientes: Compañía</i>{' '}
					{company ? <strong> {`${company.longName}(${company.shortName})`}</strong> : <div></div>}
				</h1>
				<div>
					<Button
						as={Link}
						to={`/client/${params.idCompany}`}
						variant='outline-light'
						style={{ float: 'right', margin: '8px auto' }}
					>
						Crear Cliente
					</Button>
				</div>
				<TableForm header={header} body={body} dataEmptyDscr='Ningún Cliente disponible' />
			</div>
		</Container>
	);
}
