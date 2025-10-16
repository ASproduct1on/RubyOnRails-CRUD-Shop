import { useAppDispatch } from '@/store'
import { addToCart } from '@/store/slices/cartSlice'
import { Item } from '@/types'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ItemCardProps {
	item: Item
}

export default function ItemCard({ item }: ItemCardProps) {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const [imageError, setImageError] = useState(false)

	const handleAddToCart = (e: React.MouseEvent) => {
		e.stopPropagation()
		dispatch(addToCart({ item, quantity: 1 }))
		enqueueSnackbar(`${item.name} added to cart`, { variant: 'success' })
	}

	const handleCardClick = () => {
		navigate(`/item/${item.id}`)
	}

	const imageSrc =
		imageError || !item.image_url
			? 'https://via.placeholder.com/300x200?text=No+Image'
			: item.image_url

	return (
		<Card
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				cursor: 'pointer',
				transition: 'transform 0.2s, box-shadow 0.2s',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: 4,
				},
			}}
			onClick={handleCardClick}
		>
			<CardMedia
				component='img'
				height='200'
				image={imageSrc}
				alt={item.name}
				onError={() => setImageError(true)}
				sx={{
					objectFit: 'cover',
					bgcolor: 'grey.100',
				}}
			/>

			<CardContent sx={{ flexGrow: 1, pb: 1 }}>
				<Typography variant='h6' fontWeight={600} gutterBottom noWrap>
					{item.name}
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						minHeight: '2.5em',
					}}
				>
					{item.description}
				</Typography>
			</CardContent>

			<CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
				<Typography variant='h6' fontWeight={600} color='primary'>
					${item.price.toFixed(2)}
				</Typography>
				<IconButton
					color='primary'
					onClick={handleAddToCart}
					sx={{
						bgcolor: 'primary.main',
						color: 'white',
						'&:hover': {
							bgcolor: 'primary.dark',
						},
					}}
				>
					<AddShoppingCartIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}
