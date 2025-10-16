import { Box, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminItemsPage from './pages/Admin/AdminItemsPage'
import AdminPanelPage from './pages/Admin/AdminPanelPage'
import AdminUserPage from './pages/Admin/AdminUserPage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import CartPage from './pages/Cart/CartPage'
import CatalogPage from './pages/Catalog/CatalogPage'
import ItemDetailsPage from './pages/ItemDetails/ItemDetailsPage'
import ProfilePage from './pages/Profile/ProfilePage'
import { useAppDispatch } from './store'
import { checkAuth } from './store/slices/authSlice'

function App() {
	const dispatch = useAppDispatch()
	const [initialCheckDone, setInitialCheckDone] = useState(false)

	useEffect(() => {
		dispatch(checkAuth()).finally(() => {
			setInitialCheckDone(true)
		})
	}, [])

	if (!initialCheckDone) {
		return (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '100vh',
				}}
			>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Layout>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />

				<Route
					path='/catalog'
					element={
						<ProtectedRoute>
							<CatalogPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/item/:id'
					element={
						<ProtectedRoute>
							<ItemDetailsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/cart'
					element={
						<ProtectedRoute>
							<CartPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/admin/*'
					element={
						<ProtectedRoute requiredRole='admin'>
							<AdminPanelPage />
						</ProtectedRoute>
					}
				>
					<Route path='users' element={<AdminUserPage />} />
					<Route path='products' element={<AdminItemsPage />} />
				</Route>

				<Route path='/' element={<Navigate to='/catalog' replace />} />
				<Route path='*' element={<Navigate to='/catalog' replace />} />
			</Routes>
		</Layout>
	)
}

export default App
