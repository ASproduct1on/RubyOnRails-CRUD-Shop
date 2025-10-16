import PeopleIcon from '@mui/icons-material/People'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const drawerWidth = 240
const navbarHeight = 64

export default function AdminPanelPage() {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === '/admin') {
			navigate('/admin/users')
		}
	}, [location.pathname, navigate])

	return (
		<Box sx={{ display: 'flex' }}>
			<Drawer
				variant='permanent'
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: 'border-box',
						top: navbarHeight,
						height: `calc(100vh - ${navbarHeight}px)`,
						borderRight: '1px solid rgba(0, 0, 0, 0.08)',
						backgroundColor: '#fafafa',
					},
				}}
			>
				<Box sx={{ overflow: 'auto', pt: 2 }}>
					<Typography
						variant='overline'
						sx={{
							px: 2,
							pb: 1,
							color: 'text.secondary',
							fontWeight: 600,
							letterSpacing: '0.5px',
						}}
					>
						Management
					</Typography>
					<List sx={{ px: 1 }}>
						<ListItemButton
							onClick={() => navigate('/admin/products')}
							selected={location.pathname === '/admin/products'}
							sx={{
								borderRadius: '8px',
								mb: 0.5,
								'&.Mui-selected': {
									backgroundColor: 'primary.main',
									color: 'white',
									'&:hover': {
										backgroundColor: 'primary.dark',
									},
									'& .MuiListItemText-primary': {
										fontWeight: 600,
									},
									'& .MuiSvgIcon-root': {
										color: 'white',
									},
								},
								'&:hover': {
									backgroundColor: 'rgba(0, 0, 0, 0.04)',
								},
								transition: 'all 0.2s ease',
							}}
						>
							<ShoppingBagIcon
								sx={{
									mr: 2,
									fontSize: 20,
									color:
										location.pathname === '/admin/products'
											? 'white'
											: 'text.secondary',
								}}
							/>
							<ListItemText
								primary='Products'
								primaryTypographyProps={{
									fontSize: '0.95rem',
								}}
							/>
						</ListItemButton>
						<ListItemButton
							onClick={() => navigate('/admin/users')}
							selected={location.pathname === '/admin/users'}
							sx={{
								borderRadius: '8px',
								mb: 0.5,
								'&.Mui-selected': {
									backgroundColor: 'primary.main',
									color: 'white',
									'&:hover': {
										backgroundColor: 'primary.dark',
									},
									'& .MuiListItemText-primary': {
										fontWeight: 600,
									},
									'& .MuiSvgIcon-root': {
										color: 'white',
									},
								},
								'&:hover': {
									backgroundColor: 'rgba(0, 0, 0, 0.04)',
								},
								transition: 'all 0.2s ease',
							}}
						>
							<PeopleIcon
								sx={{
									mr: 2,
									fontSize: 20,
									color:
										location.pathname === '/admin/users'
											? 'white'
											: 'text.secondary',
								}}
							/>
							<ListItemText
								primary='Users'
								primaryTypographyProps={{
									fontSize: '0.95rem',
								}}
							/>
						</ListItemButton>
					</List>
					<Divider sx={{ my: 2 }} />
				</Box>
			</Drawer>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					bgcolor: 'background.default',
					p: 3,
					minHeight: '80vh',
				}}
			>
				<Typography variant='h5' fontWeight={600} mb={4}>
					Admin Panel
				</Typography>
				<Outlet />
			</Box>
		</Box>
	)
}
