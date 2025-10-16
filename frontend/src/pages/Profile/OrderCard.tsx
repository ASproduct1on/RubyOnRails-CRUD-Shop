import { Order } from '@/types'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { Box, Button, Chip, Paper, Typography } from '@mui/material'

interface OrderCardProps {
	order: Order
	onViewDetails: (orderId: number) => void
}

export default function OrderCard({ order, onViewDetails }: OrderCardProps) {
	const orderDate = new Date(order.created_at).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<Paper
			sx={{
				p: 3,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				'&:hover': {
					boxShadow: 3,
				},
				transition: 'box-shadow 0.3s',
			}}
		>
			<Box sx={{ flex: 1 }}>
				<Typography variant='body2' color='text.secondary' gutterBottom>
					Order #{order.id}
				</Typography>
				<Typography variant='body2' color='text.secondary' gutterBottom>
					Date: {orderDate}
				</Typography>
				<Typography variant='h6' fontWeight={600} sx={{ mt: 1 }}>
					${order.amount.toFixed(2)}
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Chip
					icon={<ShoppingBagIcon fontSize='small' />}
					label={`${order.items_count} ${
						order.items_count === 1 ? 'item' : 'items'
					}`}
					color='primary'
					variant='outlined'
				/>
				<Button variant='contained' onClick={() => onViewDetails(order.id)}>
					Details
				</Button>
			</Box>
		</Paper>
	)
}
