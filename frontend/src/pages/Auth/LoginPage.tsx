import { useAppDispatch, useAppSelector } from '@/store'
import { clearError, login } from '@/store/slices/authSlice'
import { LoginFormData, loginSchema } from '@/utils/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
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

export default function LoginPage() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { loading, error, isAuthenticated } = useAppSelector(
		state => state.auth
	)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
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

	const onSubmit = async (data: LoginFormData) => {
		try {
			await dispatch(login(data)).unwrap()
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
							Welcome Back!
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							Sign in to continue to your account.
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
							sx={{ mb: 1 }}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LockIcon color='action' />
									</InputAdornment>
								),
							}}
						/>
						<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
							<Link href='#' underline='hover' variant='body2'>
								Forgot your password?
							</Link>
						</Box>
						<Button
							type='submit'
							variant='contained'
							size='large'
							fullWidth
							disabled={loading}
							sx={{ mb: 2 }}
						>
							{loading ? 'Signing in...' : 'Sign in'}
						</Button>
						<Typography
							variant='body2'
							textAlign='center'
							color='text.secondary'
						>
							Don't have an account?{' '}
							<Link component={RouterLink} to='/register' underline='hover'>
								Register now
							</Link>
						</Typography>
					</Box>
				</Paper>
			</Container>
		</Box>
	)
}
