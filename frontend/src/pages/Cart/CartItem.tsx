import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, IconButton, Typography } from '@mui/material'
import { useState } from 'react'

interface CartItem {
	item: {
		id: number
		name: string
		description: string
		price: number
		image_url?: string
	}
	quantity: number
}

interface CartItemProps {
	cartItem: CartItem
	onRemove: (itemId: number) => void
	onUpdateQuantity: (itemId: number, quantity: number) => void
}

export default function CartItem({
	cartItem,
	onRemove,
	onUpdateQuantity,
}: CartItemProps) {
	const [imageError, setImageError] = useState(false)
	const { item, quantity } = cartItem

	const imageSrc =
		imageError || !item.image_url
			? 'https://via.placeholder.com/80x80?text=No+Image'
			: item.image_url

	const subtotal = item.price * quantity

	const handleIncrement = () => {
		onUpdateQuantity(item.id, quantity + 1)
	}

	const handleDecrement = () => {
		onUpdateQuantity(item.id, quantity - 1)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				gap: 2,
				p: 2,
				border: '1px solid',
				borderColor: 'divider',
				borderRadius: 2,
				alignItems: 'center',
			}}
		>
			<Box
				component='img'
				src={imageSrc}
				alt={item.name}
				onError={() => setImageError(true)}
				sx={{
					width: 80,
					height: 80,
					objectFit: 'cover',
					borderRadius: 1,
					bgcolor: 'grey.100',
				}}
			/>

			<Box sx={{ flexGrow: 1 }}>
				<Typography variant='h6' fontWeight={600}>
					{item.name}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{item.description}
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<IconButton size='small' onClick={handleDecrement}>
					<RemoveIcon fontSize='small' />
				</IconButton>
				<Typography sx={{ minWidth: 30, textAlign: 'center' }}>
					{quantity}
				</Typography>
				<IconButton size='small' onClick={handleIncrement}>
					<AddIcon fontSize='small' />
				</IconButton>
			</Box>

			<Box sx={{ textAlign: 'right', minWidth: 120 }}>
				<Typography variant='body2' color='text.secondary'>
					{quantity} × ${item.price.toFixed(2)}
				</Typography>
				<Typography variant='h6' fontWeight={600}>
					${subtotal.toFixed(2)}
				</Typography>
			</Box>

			<IconButton color='error' onClick={() => onRemove(item.id)}>
				<DeleteIcon />
			</IconButton>
		</Box>
	)
}
