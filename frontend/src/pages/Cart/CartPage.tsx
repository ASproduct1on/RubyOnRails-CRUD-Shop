import { ordersAPI } from '@/api/orders.api'
import { useAppDispatch, useAppSelector } from '@/store'
import {
	clearCart,
	removeFromCart,
	updateQuantity,
} from '@/store/slices/cartSlice'
import {
	Box,
	Button,
	Container,
	Divider,
	Paper,
	Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartItem from './CartItem'

export default function CartPage() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const { items, total } = useAppSelector(state => state.cart)
	const [placing, setPlacing] = useState(false)

	const handleRemoveItem = (itemId: number) => {
		dispatch(removeFromCart(itemId))
		enqueueSnackbar('Item removed from cart', { variant: 'info' })
	}

	const handleUpdateQuantity = (itemId: number, quantity: number) => {
		if (quantity < 1) {
			handleRemoveItem(itemId)
			return
		}
		dispatch(updateQuantity({ itemId, quantity }))
	}

	const handlePlaceOrder = async () => {
		if (items.length === 0) return

		setPlacing(true)
		try {
			const orderItems = items.map(cartItem => ({
				item_id: cartItem.item.id,
				quantity: cartItem.quantity,
			}))

			await ordersAPI.create(orderItems)
			dispatch(clearCart())
			enqueueSnackbar('Order placed successfully!', { variant: 'success' })
			navigate('/profile')
		} catch (error: any) {
			enqueueSnackbar('Failed to place order', { variant: error })
		} finally {
			setPlacing(false)
		}
	}

	if (items.length === 0) {
		return (
			<Container maxWidth='md'>
				<Paper sx={{ p: 6, textAlign: 'center' }}>
					<Typography variant='h5' gutterBottom>
						Your cart is empty
					</Typography>
					<Typography color='text.secondary' paragraph>
						Add some products to get started
					</Typography>
					<Button variant='contained' onClick={() => navigate('/catalog')}>
						Browse Products
					</Button>
				</Paper>
			</Container>
		)
	}

	return (
		<Container maxWidth='md'>
			<Typography variant='h4' fontWeight={600} gutterBottom>
				Checkout
			</Typography>

			<Paper sx={{ p: 3, mt: 3 }}>
				<Typography variant='h6' fontWeight={600} gutterBottom>
					Order Items
				</Typography>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
					{items.map(cartItem => (
						<CartItem
							key={cartItem.item.id}
							cartItem={cartItem}
							onRemove={handleRemoveItem}
							onUpdateQuantity={handleUpdateQuantity}
						/>
					))}
				</Box>

				<Divider sx={{ my: 3 }} />

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography color='text.secondary'>Items:</Typography>
						<Typography fontWeight={500}>${total.toFixed(2)}</Typography>
					</Box>

					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography color='text.secondary'>Delivery:</Typography>
						<Typography fontWeight={500}>Free</Typography>
					</Box>

					<Divider sx={{ my: 1 }} />

					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant='h6' fontWeight={600}>
							Total:
						</Typography>
						<Typography variant='h6' fontWeight={600}>
							${total.toFixed(2)}
						</Typography>
					</Box>
				</Box>

				<Button
					variant='contained'
					size='large'
					fullWidth
					onClick={handlePlaceOrder}
					disabled={placing}
					sx={{ mt: 3 }}
				>
					{placing ? 'Placing order...' : 'Place Order'}
				</Button>
			</Paper>
		</Container>
	)
}
