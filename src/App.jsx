import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import Navigation from './components/Navigation';

import Login from './pages/Login';
import ListCompanies from './pages/ListCompanies';
import CompanyForm from './pages/CompanyForm';
import ListClient from './pages/ListClient';
import ClientForm from './pages/ClientForm';
import ListRepresentative from './pages/ListRepresentative';
import RepresentativeForm from './pages/RepresentativeForm';
import ListAddress from './pages/ListAddress';
import AddressForm from './pages/AddressForm';
import NotFound from './pages/NotFound';

import useUser from './hooks/useUser';

function App() {
	const { token } = useUser();

	return (
		<div className='App'>
			<BrowserRouter>
				{token ? <Navigation /> : null}
				<div className='App-body'>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route
							path='/'
							element={
								<RequireAuth>
									<ListCompanies />
								</RequireAuth>
							}
						/>
						<Route
							path='/company'
							element={
								<RequireAuth>
									<CompanyForm />
								</RequireAuth>
							}
						/>
						<Route
							path='/company/:id'
							element={
								<RequireAuth>
									<CompanyForm />
								</RequireAuth>
							}
						/>
						<Route
							path='/clients/:idCompany'
							element={
								<RequireAuth>
									<ListClient />
								</RequireAuth>
							}
						/>
						<Route
							path='/client/:idCompany'
							element={
								<RequireAuth>
									<ClientForm />
								</RequireAuth>
							}
						/>
						<Route
							path='/client/:idCompany/:idClient'
							element={
								<RequireAuth>
									<ClientForm />
								</RequireAuth>
							}
						/>
						<Route
							path='/representatives/:idClient'
							element={
								<RequireAuth>
									<ListRepresentative />
								</RequireAuth>
							}
						/>
						<Route
							path='/representative/:idClient'
							element={
								<RequireAuth>
									<RepresentativeForm />
								</RequireAuth>
							}
						/>
						<Route
							path='/representative/:idClient/:idRepresentative'
							element={
								<RequireAuth>
									<RepresentativeForm />
								</RequireAuth>
							}
						/>
						<Route
							path='/addresses/:idClient'
							element={
								<RequireAuth>
									<ListAddress />
								</RequireAuth>
							}
						/>
						<Route
							path='/address/:idClient'
							element={
								<RequireAuth>
									<AddressForm />
								</RequireAuth>
							}
						/>
						<Route
							path='/address/:idClient/:idAddress'
							element={
								<RequireAuth>
									<AddressForm />
								</RequireAuth>
							}
						/>
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</BrowserRouter>
			<ToastContainer
				autoClose={2000}
				position='top-right'
				className='toast-container'
				toastClassName='dark-toast'
			/>
		</div>
	);
}

export default App;
