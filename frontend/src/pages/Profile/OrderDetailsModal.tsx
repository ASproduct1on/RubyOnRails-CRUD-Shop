import { ordersAPI } from '@/api/orders.api'
import { OrderDetails } from '@/types'
import CloseIcon from '@mui/icons-material/Close'
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState } from 'react'

interface OrderDetailsModalProps {
	open: boolean
	orderId: number | null
	onClose: () => void
}

export default function OrderDetailsModal({
	open,
	orderId,
	onClose,
}: OrderDetailsModalProps) {
	const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (open && orderId) {
			loadOrderDetails()
		}
	}, [open, orderId])

	const loadOrderDetails = async () => {
		if (!orderId) return

		setLoading(true)
		setError(null)

		try {
			const details = await ordersAPI.getById(orderId)
			setOrderDetails(details)
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to load order details')
		} finally {
			setLoading(false)
		}
	}

	const handleClose = () => {
		setOrderDetails(null)
		setError(null)
		onClose()
	}

	if (!orderId) return null

	const orderDate = orderDetails
		? new Date(orderDetails.created_at).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
		  })
		: ''

	return (
		<Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
			<DialogTitle>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography variant='h6' fontWeight={600}>
						Order #{orderId}
					</Typography>
					<IconButton onClick={handleClose} size='small'>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>

			<DialogContent dividers>
				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
						<CircularProgress />
					</Box>
				) : error ? (
					<Typography color='error'>{error}</Typography>
				) : orderDetails ? (
					<>
						{/* Order Info */}
						<Box sx={{ mb: 3 }}>
							<Typography variant='body2' color='text.secondary' gutterBottom>
								Order Date: {orderDate}
							</Typography>
							<Typography variant='h5' fontWeight={600} sx={{ mt: 1 }}>
								Total: ${orderDetails.amount.toFixed(2)}
							</Typography>
						</Box>

						<Divider sx={{ my: 2 }} />

						{/* Items Table */}
						<Typography variant='h6' fontWeight={600} gutterBottom>
							Items
						</Typography>
						<TableContainer component={Paper} variant='outlined'>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Product</TableCell>
										<TableCell align='right'>Price</TableCell>
										<TableCell align='right'>Quantity</TableCell>
										<TableCell align='right'>Subtotal</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{orderDetails.items.map(item => (
										<TableRow key={item.item_id}>
											<TableCell>
												<Typography fontWeight={500}>
													{item.item_name}
												</Typography>
											</TableCell>
											<TableCell align='right'>
												${item.item_price.toFixed(2)}
											</TableCell>
											<TableCell align='right'>{item.quantity}</TableCell>
											<TableCell align='right'>
												<Typography fontWeight={600}>
													${item.subtotal.toFixed(2)}
												</Typography>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</>
				) : null}
			</DialogContent>

			<DialogActions>
				<Button onClick={handleClose} variant='outlined'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}
