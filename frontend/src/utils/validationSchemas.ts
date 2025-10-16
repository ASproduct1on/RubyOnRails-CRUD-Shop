import { z } from 'zod'

// Login Schema
export const loginSchema = z.object({
	email: z
		.string({ message: 'Email is required' })
		.min(1, 'Email is required')
		.email('Please enter a valid email'),
	password: z
		.string({ message: 'Password is required' })
		.min(1, 'Password is required')
		.min(6, 'Password must be at least 6 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Register Schema
export const registerSchema = z
	.object({
		email: z
			.string({ message: 'Email is required' })
			.min(1, 'Email is required')
			.email('Please enter a valid email'),
		password: z
			.string({ message: 'Password is required' })
			.min(1, 'Password is required')
			.min(6, 'Password must be at least 6 characters'),
		passwordConfirmation: z
			.string({ message: 'Password confirmation is required' })
			.min(1, 'Password confirmation is required'),
		firstName: z
			.string({ message: 'First name is required' })
			.min(1, 'First name is required')
			.min(2, 'First name must be at least 2 characters')
			.max(50, 'First name is too long'),
		lastName: z
			.string({ message: 'Last name is required' })
			.min(1, 'Last name is required')
			.min(2, 'Last name must be at least 2 characters')
			.max(50, 'Last name is too long'),
	})
	.refine(data => data.password === data.passwordConfirmation, {
		message: 'Passwords do not match',
		path: ['passwordConfirmation'],
	})

export type RegisterFormData = z.infer<typeof registerSchema>
