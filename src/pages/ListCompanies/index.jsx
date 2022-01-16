import { useEffect, useState } from 'react';
import { Container, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import TableForm from '../../components/TableForm';
import useUser from '../../hooks/useUser';
import { getAllCompany } from '../../services/company';

export default function ListCompanies() {
	const [companies, setCompanies] = useState([]);
	const { token } = useUser();

	useEffect(() => {
		(async () => {
			setCompanies(await getAllCompany(token));
		})();
	}, []);

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
			Header: 'RNC',
			accessor: 'rnc',
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

	const data = companies
		.map((company) => [
			{
				id: company.id,
				longName: company.longName,
				rnc: company.rnc,
				telephone: company.telephone,
				email: company.email,
				action: (
					<Dropdown drop='end'>
						<Dropdown.Toggle variant='outline-secondary' size='sm'>
							Acción
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item as={Link} to={`/company/${company.id}`}>
								Actualizar
							</Dropdown.Item>
							<Dropdown.Item as={Link} to={`/clients/${company.id}`}>
								Clientes
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
				<h1>Listado de Compañías</h1>
				<TableForm columns={columns} data={data} dataEmptyDscr='Ninguna compañía disponible'>
					<Button as={Link} to={`/company`} variant='outline-light'>
						Crear Compañía
					</Button>
				</TableForm>
			</div>
		</Container>
	);
}
