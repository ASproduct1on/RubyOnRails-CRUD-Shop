import { useAppDispatch, useAppSelector } from '@/store'
import { clearError, signup } from '@/store/slices/authSlice'
import { RegisterFormData, registerSchema } from '@/utils/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import {
	Alert,
	Box,
	Button,
	Container,
	InputAdornment,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { loading, error, isAuthenticated } = useAppSelector(
		state => state.auth
	)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	})

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/catalog')
		}
	}, [isAuthenticated, navigate])

	useEffect(() => {
		return () => {
			dispatch(clearError())
		}
	}, [dispatch])

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await dispatch(signup(data)).unwrap()
		} catch {}
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				bgcolor: 'background.default',
			}}
		>
			<Container maxWidth='sm'>
				<Paper
					elevation={3}
					sx={{
						p: 4,
						borderRadius: 2,
					}}
				>
					<Box sx={{ textAlign: 'center', mb: 4 }}>
						<Typography variant='h4' fontWeight={600} gutterBottom>
							Create Account
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							Sign up to get started with your account.
						</Typography>
					</Box>

					{error && (
						<Alert
							severity='error'
							sx={{ mb: 3 }}
							onClose={() => dispatch(clearError())}
						>
							{error}
						</Alert>
					)}

					<Box component='form' onSubmit={handleSubmit(onSubmit)}>
						<Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
							<TextField
								{...register('firstName')}
								label='First Name'
								error={!!errors.firstName}
								helperText={errors.firstName?.message}
								disabled={loading}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<PersonIcon color='action' />
										</InputAdornment>
									),
								}}
							/>
							<TextField
								{...register('lastName')}
								label='Last Name'
								error={!!errors.lastName}
								helperText={errors.lastName?.message}
								disabled={loading}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<PersonIcon color='action' />
										</InputAdornment>
									),
								}}
							/>
						</Box>

						<TextField
							{...register('email')}
							label='Email address'
							type='email'
							error={!!errors.email}
							helperText={errors.email?.message}
							disabled={loading}
							sx={{ mb: 2 }}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<EmailIcon color='action' />
									</InputAdornment>
								),
							}}
						/>

						<TextField
							{...register('password')}
							label='Password'
							type='password'
							error={!!errors.password}
							helperText={errors.password?.message}
							disabled={loading}
							sx={{ mb: 2 }}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LockIcon color='action' />
									</InputAdornment>
								),
							}}
						/>

						<TextField
							{...register('passwordConfirmation')}
							label='Confirm Password'
							type='password'
							error={!!errors.passwordConfirmation}
							helperText={errors.passwordConfirmation?.message}
							disabled={loading}
							sx={{ mb: 3 }}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LockIcon color='action' />
									</InputAdornment>
								),
							}}
						/>

						<Button
							type='submit'
							variant='contained'
							size='large'
							fullWidth
							disabled={loading}
							sx={{ mb: 2 }}
						>
							{loading ? 'Creating account...' : 'Sign up'}
						</Button>

						<Typography
							variant='body2'
							textAlign='center'
							color='text.secondary'
						>
							Already have an account?{' '}
							<Link component={RouterLink} to='/login' underline='hover'>
								Login
							</Link>
						</Typography>
					</Box>
				</Paper>
			</Container>
		</Box>
	)
}
