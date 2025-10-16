import { api } from '@/services/axios'
import { User, UserRole } from '@/types'

interface UpdateUserData {
	first_name?: string
	last_name?: string
	email?: string
	role?: UserRole
}

export const usersAPI = {
	// GET /admin/users (ADMIN ONLY)
	getAll: async (): Promise<User[]> => {
		const response = await api.get<User[]>('/admin/users')
		return response.data
	},

	// GET /admin/users/:id (ADMIN ONLY)
	getById: async (id: number): Promise<User> => {
		const response = await api.get<User>(`/admin/users/${id}`)
		console.log(response.data)
		return response.data
	},

	// PATCH /admin/users/:id (ADMIN ONLY)
	update: async (id: number, data: UpdateUserData): Promise<User> => {
		const response = await api.patch<User>(`/admin/users/${id}`, {
			user: data,
		})
		return response.data
	},

	// DELETE /admin/users/:id (ADMIN ONLY)
	delete: async (id: number): Promise<void> => {
		await api.delete(`/admin/users/${id}`)
	},
}
