import { ordersAPI } from '@/api/orders.api'
import { useAppDispatch, useAppSelector } from '@/store'
import { logout } from '@/store/slices/authSlice'
import { setLoading, setOrders } from '@/store/slices/ordersSlice'
import { UserRole } from '@/types'
import BadgeIcon from '@mui/icons-material/Badge'
import EmailIcon from '@mui/icons-material/Email'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Divider,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderCard from './OrderCard'
import OrderDetailsModal from './OrderDetailsModal'

export default function ProfilePage() {
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)
	const { orders, loading } = useAppSelector(state => state.orders)
	const navigate = useNavigate()
	const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)
	const [modalOpen, setModalOpen] = useState(false)

	useEffect(() => {
		const loadOrders = async () => {
			dispatch(setLoading(true))
			try {
				const ordersData = await ordersAPI.getAll()
				dispatch(setOrders(ordersData))
			} catch (error) {
				console.error('Failed to load orders:', error)
			} finally {
				dispatch(setLoading(false))
			}
		}

		loadOrders()
	}, [dispatch])

	const handleAdminPanel = () => {
		navigate('/admin')
	}

	const handleViewDetails = (orderId: number) => {
		setSelectedOrderId(orderId)
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
		setSelectedOrderId(null)
	}

	const handleLogout = async () => {
		await dispatch(logout())
		navigate('/login')
	}

	if (!user) {
		return null
	}

	return (
		<Container maxWidth='lg'>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					mb: 4,
				}}
			>
				<Box>
					<Typography variant='h4' fontWeight={600} gutterBottom>
						Profile
					</Typography>
					<Typography variant='body1' color='text.secondary'>
						Manage your account information and view order history.
					</Typography>
				</Box>

				{user.role === UserRole.ADMIN && (
					<Button
						variant='contained'
						startIcon={<SettingsIcon />}
						onClick={handleAdminPanel}
						sx={{ mt: 1 }}
					>
						Admin Panel
					</Button>
				)}
			</Box>

			<Paper sx={{ p: 4, mb: 4 }}>
				<Typography variant='h6' fontWeight={600} gutterBottom sx={{ mb: 3 }}>
					Personal Information
				</Typography>

				<Stack spacing={3}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: 48,
								height: 48,
								borderRadius: '12px',
								bgcolor: 'primary.light',
								color: 'primary.main',
							}}
						>
							<PersonIcon />
						</Box>
						<Box sx={{ flex: 1 }}>
							<Typography
								variant='caption'
								color='text.secondary'
								sx={{ display: 'block', mb: 0.5 }}
							>
								First Name
							</Typography>
							<Typography variant='body1' fontWeight={500}>
								{user.first_name}
							</Typography>
						</Box>
					</Box>

					<Divider />

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: 48,
								height: 48,
								borderRadius: '12px',
								bgcolor: 'primary.light',
								color: 'primary.main',
							}}
						>
							<BadgeIcon />
						</Box>
						<Box sx={{ flex: 1 }}>
							<Typography
								variant='caption'
								color='text.secondary'
								sx={{ display: 'block', mb: 0.5 }}
							>
								Last Name
							</Typography>
							<Typography variant='body1' fontWeight={500}>
								{user.last_name}
							</Typography>
						</Box>
					</Box>

					<Divider />

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: 48,
								height: 48,
								borderRadius: '12px',
								bgcolor: 'primary.light',
								color: 'primary.main',
							}}
						>
							<EmailIcon />
						</Box>
						<Box sx={{ flex: 1 }}>
							<Typography
								variant='caption'
								color='text.secondary'
								sx={{ display: 'block', mb: 0.5 }}
							>
								Email Address
							</Typography>
							<Typography variant='body1' fontWeight={500}>
								{user.email}
							</Typography>
						</Box>
					</Box>
				</Stack>

				<Box
					sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
				>
					<Button
						variant='contained'
						size='large'
						fullWidth
						startIcon={<LogoutIcon />}
						onClick={handleLogout}
						sx={{
							bgcolor: '#d32f2f',
							color: 'white',
							py: 1.5,
							fontSize: '1rem',
							fontWeight: 600,
							'&:hover': {
								bgcolor: '#b71c1c',
							},
						}}
					>
						Logout
					</Button>
				</Box>
			</Paper>

			<Box>
				<Typography variant='h6' fontWeight={600} gutterBottom>
					Order History
				</Typography>

				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
						<CircularProgress />
					</Box>
				) : orders.length === 0 ? (
					<Paper sx={{ p: 4, textAlign: 'center' }}>
						<Typography color='text.secondary'>
							You don't have any orders yet
						</Typography>
					</Paper>
				) : (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						{orders.map(order => (
							<OrderCard
								key={order.id}
								order={order}
								onViewDetails={handleViewDetails}
							/>
						))}
					</Box>
				)}
			</Box>

			<OrderDetailsModal
				open={modalOpen}
				orderId={selectedOrderId}
				onClose={handleCloseModal}
			/>
		</Container>
	)
}
