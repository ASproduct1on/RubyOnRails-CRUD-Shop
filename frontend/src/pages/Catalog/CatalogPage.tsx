import { itemsAPI } from '@/api/items.api'
import { useAppDispatch, useAppSelector } from '@/store'
import { setItems, setLoading, setSearchQuery } from '@/store/slices/itemsSlice'
import SearchIcon from '@mui/icons-material/Search'
import {
	Box,
	CircularProgress,
	Container,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect } from 'react'
import ItemCard from './ItemCard'

export default function CatalogPage() {
	const dispatch = useAppDispatch()
	const { items, loading, searchQuery } = useAppSelector(state => state.items)
	useEffect(() => {
		const loadItems = async () => {
			dispatch(setLoading(true))
			try {
				const data = await itemsAPI.getAll()
				dispatch(setItems(data))
			} catch (error) {
				console.error('Failed to load items:', error)
			} finally {
				dispatch(setLoading(false))
			}
		}

		loadItems()
	}, [dispatch])

	const filteredItems = items.filter(
		item =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.description.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<Container maxWidth='lg'>
			<Box sx={{ mb: 4 }}>
				<Typography variant='h4' fontWeight={600} gutterBottom>
					Product Catalog
				</Typography>
				<Typography variant='body1' color='text.secondary'>
					Browse our collection of products
				</Typography>
			</Box>

			<Box sx={{ mb: 4 }}>
				<TextField
					fullWidth
					placeholder='Search for products...'
					value={searchQuery}
					onChange={e => dispatch(setSearchQuery(e.target.value))}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						),
					}}
					sx={{
						maxWidth: 600,
						bgcolor: 'background.paper',
					}}
				/>
			</Box>

			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
					<CircularProgress />
				</Box>
			) : filteredItems.length === 0 ? (
				<Box sx={{ textAlign: 'center', py: 8 }}>
					<Typography variant='h6' color='text.secondary'>
						{searchQuery ? 'No products found' : 'No products available'}
					</Typography>
				</Box>
			) : (
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							sm: 'repeat(2, 1fr)',
							md: 'repeat(3, 1fr)',
							lg: 'repeat(4, 1fr)',
						},
						gap: 3,
					}}
				>
					{filteredItems.map(item => (
						<ItemCard key={item.id} item={item} />
					))}
				</Box>
			)}
		</Container>
	)
}
