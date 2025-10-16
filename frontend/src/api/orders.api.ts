import { api } from '@/services/axios'
import { Order, OrderDetails } from '@/types'

interface CreateOrderItem {
	item_id: number
	quantity: number
}

export const ordersAPI = {
	// GET /orders (REQUIRES AUTH)
	getAll: async (): Promise<Order[]> => {
		const response = await api.get<Order[]>('/orders')
		return response.data
	},

	// GET /orders/:id (REQUIRES AUTH)
	getById: async (id: number): Promise<OrderDetails> => {
		const response = await api.get<OrderDetails>(`/orders/${id}`)
		return response.data
	},

	// POST /orders (REQUIRES AUTH)
	create: async (items: CreateOrderItem[]): Promise<Order> => {
		const response = await api.post<Order>('/orders', {
			items: items,
		})
		return response.data
	},
}
