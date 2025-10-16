import { useAppSelector } from '@/store'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StoreIcon from '@mui/icons-material/Store'
import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Navbar() {
	const { isAuthenticated } = useAppSelector(state => state.auth)
	const cartItems = useAppSelector(state => state.cart.items)
	const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

	return (
		<AppBar position='sticky' elevation={1}>
			<Toolbar>
				<IconButton
					component={RouterLink}
					to='/catalog'
					sx={{ mr: 2, color: 'inherit' }}
				>
					<StoreIcon />
				</IconButton>
				<Typography
					variant='h6'
					component={RouterLink}
					to='/catalog'
					sx={{
						flexGrow: 1,
						textDecoration: 'none',
						color: 'inherit',
						fontWeight: 600,
					}}
				>
					Shop
				</Typography>
				{isAuthenticated ? (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						{/* Catalog */}
						<Button
							component={RouterLink}
							to='/catalog'
							color='inherit'
							startIcon={<StoreIcon />}
						>
							Catalog
						</Button>

						<IconButton
							color='inherit'
							component={RouterLink}
							to='/cart'
							sx={{ mr: 1 }}
						>
							<Badge badgeContent={cartItemsCount} color='error'>
								<ShoppingCartIcon />
							</Badge>
						</IconButton>

						<Button
							component={RouterLink}
							to='/profile'
							color='inherit'
							startIcon={<PersonIcon />}
						>
							Profile
						</Button>
					</Box>
				) : (
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button component={RouterLink} to='/login' color='inherit'>
							Login
						</Button>
						<Button
							component={RouterLink}
							to='/register'
							variant='outlined'
							color='inherit'
							sx={{
								borderColor: 'rgba(255,255,255,0.5)',
								'&:hover': {
									borderColor: 'white',
									bgcolor: 'rgba(255,255,255,0.1)',
								},
							}}
						>
							Sign Up
						</Button>
					</Box>
				)}
			</Toolbar>
		</AppBar>
	)
}
