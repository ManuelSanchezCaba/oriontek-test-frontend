import { Link } from 'react-router-dom';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import useUser from '../../hooks/useUser';

export default function Navigation({
	color = 'primary',
	variantNav = 'dark',
	variantButtonLogout = 'outline-light',
} = {}) {
	const { logout } = useUser();
	return (
		<header>
			<Navbar bg={color} variant={variantNav} expand='lg'>
				<Container fluid>
					<Navbar.Brand as={Link} to='/'>
						Prueba OrionTek
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='navbarScroll' />
					<Navbar.Collapse id='navbarScroll'>
						<Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
							<Nav.Link as={Link} to='/'>
								Compañías
							</Nav.Link>
						</Nav>
						<Form className='d-flex'>
							<Button onClick={() => logout()} variant={variantButtonLogout}>
								Logout
							</Button>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
