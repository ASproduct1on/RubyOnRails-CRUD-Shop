import { api } from '@/services/axios'
import { Item } from '@/types'

interface CreateItemData {
	name: string
	description: string
	price: number
	image_url?: string
}

interface UpdateItemData {
	name?: string
	description?: string
	price?: number
	image_url?: string
}

interface ItemResponse {
	message: string
	item: Item
}

export const itemsAPI = {
	// GET /items (NO AUTH)
	getAll: async (): Promise<Item[]> => {
		const response = await api.get<Item[]>('/items')
		return response.data
	},

	// GET /items/:id (NO AUTH)
	getById: async (id: number): Promise<Item> => {
		const response = await api.get<Item>(`/items/${id}`)
		return response.data
	},

	// POST /items (ADMIN ONLY)
	create: async (data: CreateItemData): Promise<Item> => {
		const response = await api.post<ItemResponse>('/items', {
			item: data,
		})
		return response.data.item
	},

	// PATCH /items/:id (ADMIN ONLY)
	update: async (id: number, data: UpdateItemData): Promise<Item> => {
		const response = await api.patch<ItemResponse>(`/items/${id}`, {
			item: data,
		})
		return response.data.item
	},

	// DELETE /items/:id (ADMIN ONLY)
	delete: async (id: number): Promise<void> => {
		await api.delete(`/items/${id}`)
	},
}
