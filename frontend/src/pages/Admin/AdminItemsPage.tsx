import { itemsAPI } from '@/api/items.api'
import { useAppDispatch, useAppSelector } from '@/store'
import {
	addItem,
	removeItem,
	setError,
	setItems,
	setLoading,
	updateItem,
} from '@/store/slices/itemsSlice'
import type { Item } from '@/types'
import { Delete, Edit } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

export default function AdminItemsPage() {
	const dispatch = useAppDispatch()
	const { items, loading } = useAppSelector(state => state.items)

	const [open, setOpen] = useState(false)
	const [editingItem, setEditingItem] = useState<Item | null>(null)
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		price: '',
		image_url: '',
	})

	useEffect(() => {
		const fetchItems = async () => {
			dispatch(setLoading(true))
			try {
				const data = await itemsAPI.getAll()
				dispatch(setItems(data))
			} catch {
				dispatch(setError('Failed to load items'))
			} finally {
				dispatch(setLoading(false))
			}
		}
		fetchItems()
	}, [dispatch])

	const handleOpen = (item?: Item) => {
		if (item) {
			setEditingItem(item)
			setFormData({
				name: item.name,
				description: item.description,
				price: String(item.price),
				image_url: item.image_url || '',
			})
		} else {
			setEditingItem(null)
			setFormData({ name: '', description: '', price: '', image_url: '' })
		}
		setOpen(true)
	}

	const handleClose = () => setOpen(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSave = async () => {
		try {
			if (editingItem) {
				const updated = await itemsAPI.update(editingItem.id, {
					name: formData.name,
					description: formData.description,
					price: +formData.price,
					image_url: formData.image_url,
				})
				console.log(updated)
				dispatch(updateItem(updated))
			} else {
				const created = await itemsAPI.create({
					name: formData.name,
					description: formData.description,
					price: +formData.price,
					image_url: formData.image_url,
				})
				console.log(created)
				dispatch(addItem(created))
			}

			handleClose()
		} catch {
			dispatch(setError('Failed to save item'))
		}
	}

	const handleDelete = async (id: number) => {
		try {
			await itemsAPI.delete(id)
			dispatch(removeItem(id))
		} catch {
			dispatch(setError('Failed to delete item'))
		}
	}

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Paper sx={{ p: 3 }}>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				mb={2}
			>
				<Typography variant='h6'>Product Management</Typography>
				<Button variant='contained' onClick={() => handleOpen()}>
					Add Product
				</Button>
			</Box>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Image</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Price</TableCell>
						<TableCell align='right'>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map(item => (
						<TableRow key={item.id}>
							<TableCell>
								<Avatar
									src={item.image_url}
									alt={item.name}
									variant='rounded'
									sx={{ width: 56, height: 56 }}
								>
									{item.name?.charAt(0) || '?'}
								</Avatar>
							</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.description}</TableCell>
							<TableCell>${item.price}</TableCell>
							<TableCell align='right'>
								<IconButton onClick={() => handleOpen(item)}>
									<Edit />
								</IconButton>
								<IconButton onClick={() => handleDelete(item.id)}>
									<Delete />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Dialog
				open={open}
				onClose={handleClose}
				disableEnforceFocus
				disableRestoreFocus
				maxWidth='sm'
				fullWidth
			>
				<DialogTitle>
					{editingItem ? 'Edit Product' : 'Add Product'}
				</DialogTitle>
				<DialogContent>
					<TextField
						label='Name'
						name='name'
						fullWidth
						margin='dense'
						value={formData.name}
						onChange={handleChange}
					/>
					<TextField
						label='Description'
						name='description'
						fullWidth
						margin='dense'
						value={formData.description}
						onChange={handleChange}
					/>
					<TextField
						label='Price'
						name='price'
						type='number'
						fullWidth
						margin='dense'
						value={formData.price}
						onChange={handleChange}
					/>
					<TextField
						label='Image URL'
						name='image_url'
						fullWidth
						margin='dense'
						value={formData.image_url}
						onChange={handleChange}
						placeholder='https://example.com/image.jpg'
						helperText='Enter the URL of the product image'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button variant='contained' onClick={handleSave}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Paper>
	)
}
