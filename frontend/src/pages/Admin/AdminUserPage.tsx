import { usersAPI } from '@/api/users.api'
import { useAppDispatch } from '@/store'
import { setError } from '@/store/slices/itemsSlice'
import { type User, UserRole } from '@/types'
import { Delete, Edit } from '@mui/icons-material'
import {
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

export default function AdminUserPage() {
	const dispatch = useAppDispatch()
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoadingState] = useState(false)
	const [open, setOpen] = useState(false)
	const [editingUser, setEditingUser] = useState<User | null>(null)
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		role: UserRole.USER,
	})

	const fetchUsers = async () => {
		setLoadingState(true)
		try {
			const data = await usersAPI.getAll()
			setUsers(data)
		} catch {
			dispatch(setError('Failed to load users'))
		} finally {
			setLoadingState(false)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [dispatch])

	const handleOpen = (user?: User) => {
		if (user) {
			setEditingUser(user)
			setFormData({
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				role: UserRole.USER,
			})
		} else {
			setEditingUser(null)
			setFormData({
				first_name: '',
				last_name: '',
				email: '',
				role: UserRole.USER,
			})
		}
		setOpen(true)
	}

	const handleClose = () => setOpen(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSave = async () => {
		try {
			if (editingUser) {
				await usersAPI.update(editingUser.id, formData)
			}
			await fetchUsers()
			handleClose()
		} catch {
			dispatch(setError('Failed to save user'))
		}
	}

	const handleDelete = async (id: number) => {
		try {
			await usersAPI.delete(id)
			await fetchUsers()
		} catch {
			dispatch(setError('Failed to delete user'))
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
				<Typography variant='h6'>User Management</Typography>
			</Box>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Role</TableCell>
						<TableCell align='right'>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map(user => (
						<TableRow key={user.id}>
							<TableCell>{user.first_name}</TableCell>
							<TableCell>{user.last_name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell align='right'>
								<IconButton onClick={() => handleOpen(user)}>
									<Edit />
								</IconButton>
								<IconButton onClick={() => handleDelete(user.id)}>
									<Delete />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit User</DialogTitle>
				<DialogContent>
					<TextField
						label='First Name'
						name='first_name'
						fullWidth
						margin='dense'
						value={formData.first_name}
						onChange={handleChange}
					/>
					<TextField
						label='Last Name'
						name='last_name'
						fullWidth
						margin='dense'
						value={formData.last_name}
						onChange={handleChange}
					/>
					<TextField
						label='Email'
						name='email'
						fullWidth
						margin='dense'
						value={formData.email}
						onChange={handleChange}
					/>
					<TextField
						label='Role'
						name='role'
						fullWidth
						margin='dense'
						value={formData.role}
						onChange={handleChange}
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
