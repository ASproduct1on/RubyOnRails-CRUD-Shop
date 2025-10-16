export const UserRole = {
	USER: 'user',
	ADMIN: 'admin',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export interface User {
	id: number
	email: string
	first_name: string
	last_name: string
	role: UserRole
	createdAt: string
	updatedAt: string
}

export interface AuthResponse {
	user: User
	token: string
}

export interface Item {
	id: number
	name: string
	description: string
	price: number
	image_url: string
}

export interface Order {
	id: number
	amount: number
	created_at: string
	items_count: number
}

export interface OrderItem {
	item_id: number
	item_name: string
	item_price: number
	quantity: number
	subtotal: number
}

export interface OrderDetails {
	id: number
	amount: number
	created_at: string
	items: OrderItem[]
}

export interface OrderDescription {
	id: number
	orderId: number
	itemId: number
	quantity: number
	item?: Item
}

export interface ApiError {
	message: string
	errors?: Record<string, string[]>
}
