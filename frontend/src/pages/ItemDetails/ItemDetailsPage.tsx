import { itemsAPI } from '@/api/items.api'
import { useAppDispatch } from '@/store'
import { addToCart } from '@/store/slices/cartSlice'
import { Item } from '@/types'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
	Box,
	Breadcrumbs,
	Button,
	CircularProgress,
	Container,
	Link,
	Paper,
	Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ItemDetailsPage() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { enqueueSnackbar } = useSnackbar()

	const [item, setItem] = useState<Item | null>(null)
	const [loading, setLoading] = useState(true)
	const [imageError, setImageError] = useState(false)

	useEffect(() => {
		const loadItem = async () => {
			if (!id) return

			setLoading(true)
			try {
				const data = await itemsAPI.getById(Number(id))
				setItem(data)
			} catch (error) {
				console.error('Failed to load item:', error)
				enqueueSnackbar('Failed to load product', { variant: 'error' })
			} finally {
				setLoading(false)
			}
		}

		loadItem()
	}, [id, enqueueSnackbar])

	const handleAddToCart = () => {
		if (!item) return
		dispatch(addToCart({ item, quantity: 1 }))
		enqueueSnackbar(`${item.name} added to cart`, { variant: 'success' })
	}

	const handleBackToCatalog = () => {
		navigate('/catalog')
	}

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
				<CircularProgress />
			</Box>
		)
	}

	if (!item) {
		return (
			<Container maxWidth='lg'>
				<Box sx={{ textAlign: 'center', py: 8 }}>
					<Typography variant='h5' gutterBottom>
						Product not found
					</Typography>
					<Button
						variant='contained'
						onClick={handleBackToCatalog}
						sx={{ mt: 2 }}
					>
						Back to Catalog
					</Button>
				</Box>
			</Container>
		)
	}

	const imageSrc =
		imageError || !item.image_url
			? 'https://via.placeholder.com/600x400?text=No+Image'
			: item.image_url

	return (
		<Container maxWidth='lg'>
			<Breadcrumbs sx={{ mb: 3 }}>
				<Link
					component='button'
					variant='body2'
					onClick={handleBackToCatalog}
					sx={{ cursor: 'pointer' }}
				>
					Products
				</Link>
				<Typography variant='body2' color='text.primary'>
					{item.name}
				</Typography>
			</Breadcrumbs>

			<Button
				startIcon={<ArrowBackIcon />}
				onClick={handleBackToCatalog}
				sx={{ mb: 3 }}
			>
				Back to Catalog
			</Button>

			<Paper sx={{ p: 4 }}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
						gap: 4,
					}}
				>
					<Box>
						<Box
							component='img'
							src={imageSrc}
							alt={item.name}
							onError={() => setImageError(true)}
							sx={{
								width: '100%',
								height: 'auto',
								maxHeight: 500,
								objectFit: 'cover',
								borderRadius: 2,
								bgcolor: 'grey.100',
							}}
						/>
					</Box>

					<Box>
						<Typography variant='h4' fontWeight={600} gutterBottom>
							{item.name}
						</Typography>

						<Typography
							variant='h5'
							color='primary'
							fontWeight={600}
							sx={{ mb: 3 }}
						>
							${item.price.toFixed(2)}
						</Typography>

						<Typography variant='body1' color='text.secondary' paragraph>
							{item.description}
						</Typography>

						<Box sx={{ mt: 2 }}>
							<Paper variant='outlined' sx={{ mt: 2, p: 3 }}>
								<Box sx={{ display: 'grid', gap: 2 }}>
									<Box
										sx={{ display: 'flex', justifyContent: 'space-between' }}
									>
										<Typography color='text.secondary'>Product ID</Typography>
										<Typography fontWeight={500}>{item.id}</Typography>
									</Box>
									<Box
										sx={{ display: 'flex', justifyContent: 'space-between' }}
									>
										<Typography color='text.secondary'>Name</Typography>
										<Typography fontWeight={500}>{item.name}</Typography>
									</Box>
									<Box
										sx={{ display: 'flex', justifyContent: 'space-between' }}
									>
										<Typography color='text.secondary'>Price</Typography>
										<Typography fontWeight={500}>
											${item.price.toFixed(2)}
										</Typography>
									</Box>
								</Box>
							</Paper>
						</Box>

						<Button
							variant='contained'
							size='large'
							startIcon={<ShoppingCartIcon />}
							onClick={handleAddToCart}
							fullWidth
							sx={{ mt: 4 }}
						>
							Add to Cart
						</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	)
}
