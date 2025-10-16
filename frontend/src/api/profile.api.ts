import { api } from '@/services/axios'
import { User } from '@/types'

interface UpdateProfileData {
	first_name?: string
	last_name?: string
	email?: string
}

export const profileAPI = {
	// GET /profile (REQUIRES AUTH)
	get: async (): Promise<User> => {
		const response = await api.get<User>('/profile')
		return response.data
	},

	// PATCH /profile (REQUIRES AUTH)
	update: async (data: UpdateProfileData): Promise<User> => {
		const response = await api.patch<User>('/profile', {
			user: data,
		})
		return response.data
	},
}
