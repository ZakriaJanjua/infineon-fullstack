import { Home } from './pages/home';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
} from 'react-router-dom';
import { Superhero } from './pages/superhero';
import { SignIn } from './pages/sign-in';
import { SignUp } from './pages/sign-up';
import Cookie from 'js-cookie';
import { ReactNode } from 'react';
import { Header } from './components/custom/Header';
import Team from './pages/team';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const token = Cookie.get('token');
	if (!token) {
		return <Navigate to='/sign-in' replace />;
	}
	return (
		<>
			<Header />
			{children}
		</>
	);
};

const ProtectedLayout = () => {
	return (
		<ProtectedRoute>
			<Outlet />
		</ProtectedRoute>
	);
};

const UnProtectedRoute = ({ children }: { children: ReactNode }) => {
	const token = Cookie.get('token');
	if (token) {
		return <Navigate to='/' replace />;
	}
	return children;
};

function App() {
	return (
		<div className='p-3'>
			<BrowserRouter>
				<Routes>
					<Route element={<ProtectedLayout />}>
						<Route path='/' element={<Home />} />
						<Route path='/superhero/:name' element={<Superhero />} />
						<Route path='/team' element={<Team />} />
					</Route>
					<Route
						path='/sign-up'
						element={
							<UnProtectedRoute>
								<SignUp />
							</UnProtectedRoute>
						}
					/>
					<Route
						path='/sign-in'
						element={
							<UnProtectedRoute>
								<SignIn />
							</UnProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
