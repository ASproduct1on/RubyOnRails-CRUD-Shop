import { api } from '@/services/axios'
import { User } from '@/types'
import { LoginFormData, RegisterFormData } from '@/utils/validationSchemas'

interface LoginResponse {
	message: string
	user: User
}

interface SignupResponse {
	message: string
	user: User
}

export const authAPI = {
	// POST /auth/login (NO AUTH)
	login: async (credentials: LoginFormData): Promise<LoginResponse> => {
		const response = await api.post<LoginResponse>('/auth/login', {
			user: {
				email: credentials.email,
				password: credentials.password,
			},
		})
		return response.data
	},

	// POST /auth/signup (NO AUTH)
	signup: async (data: RegisterFormData): Promise<SignupResponse> => {
		const response = await api.post<SignupResponse>('/auth/signup', {
			user: {
				email: data.email,
				password: data.password,
				password_confirmation: data.passwordConfirmation,
				first_name: data.firstName,
				last_name: data.lastName,
			},
		})
		return response.data
	},

	// DELETE /auth/logout (REQUIRES AUTH)
	logout: async (): Promise<void> => {
		await api.delete('/auth/logout')
	},
}
