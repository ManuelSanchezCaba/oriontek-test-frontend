import { useEffect, useState } from 'react';
import { Container, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import TableForm from '../../components/TableForm';
import useUser from '../../hooks/useUser';
import { getAllCompany } from '../../services/company';

export default function ListCompanies() {
	const [companies, setCompanies] = useState([]);
	const { token } = useUser();

	const header = [
		'Código',
		// 'Alias',
		'Nombre',
		'RNC',
		'Teléfono',
		// 'Teléfono 2',
		'Correo',
		// 'Dirección',
	];

	const body = companies.map((company, index) => (
		<tr key={index}>
			<td>{index + 1}</td>
			<td>{company.id}</td>
			{/* <td>{company.shortName}</td> */}
			<td>{company.longName}</td>
			<td>{company.rnc}</td>
			<td>{company.telephone}</td>
			{/* <td>{company.telephone2}</td> */}
			<td>{company.email}</td>
			{/* <td>{company.address}</td> */}
			<td>
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
			</td>
		</tr>
	));

	useEffect(() => {
		(async () => {
			setCompanies(await getAllCompany(token));
		})();
	}, []);

	return (
		<Container>
			<div className='center'>
				<h1>Listado de Compañías</h1>
				<div>
					<Button
						as={Link}
						to={`/company`}
						variant='outline-light'
						style={{ float: 'right', margin: '8px auto' }}
					>
						Crear Compañía
					</Button>
				</div>
				<TableForm header={header} body={body} dataEmptyDscr='Ninguna compañía disponible' />
			</div>
		</Container>
	);
}
