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

	const columns = [
		{
			Header: 'Código',
			accessor: 'id', // accessor is the "key" in the data
		},
		{
			Header: 'Nombre',
			accessor: 'longName',
		},
		{
			Header: 'Cédula/RNC',
			accessor: 'cedulaRNC',
		},
		{
			Header: 'Correo',
			accessor: 'email',
		},
		{
			Header: 'Teléfono',
			accessor: 'telephone',
		},
		{
			Header: 'Acción',
			accessor: 'action',
		},
	];

	const data = clients
		.map((client) => [
			{
				id: client.id,
				longName: client.longName,
				cedulaRNC: client.cedulaRNC,
				email: client.email,
				telephone: client.telephone,
				action: (
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
				),
			},
		])
		.flat();

	return (
		<Container>
			<div className='center'>
				<h1>
					<i>Listado de Clientes: Compañía</i>{' '}
					{company ? <strong> {`${company.longName}(${company.shortName})`}</strong> : <div></div>}
				</h1>
				<TableForm columns={columns} data={data} dataEmptyDscr='Ninguna compañía disponible'>
					<Button as={Link} to={`/client/${params.idCompany}`} variant='outline-light'>
						Crear Cliente
					</Button>
				</TableForm>
			</div>
		</Container>
	);
}
