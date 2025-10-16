import { Item } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
	item: Item
	quantity: number
}

interface CartState {
	items: CartItem[]
	total: number
}

const initialState: CartState = {
	items: [],
	total: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (
			state,
			action: PayloadAction<{ item: Item; quantity: number }>
		) => {
			const existingItem = state.items.find(
				cartItem => cartItem.item.id === action.payload.item.id
			)

			if (existingItem) {
				existingItem.quantity += action.payload.quantity
			} else {
				state.items.push(action.payload)
			}

			// Calculate total
			state.total = state.items.reduce(
				(sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
				0
			)
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(
				cartItem => cartItem.item.id !== action.payload
			)

			// Recalculate total
			state.total = state.items.reduce(
				(sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
				0
			)
		},
		updateQuantity: (
			state,
			action: PayloadAction<{ itemId: number; quantity: number }>
		) => {
			const cartItem = state.items.find(
				item => item.item.id === action.payload.itemId
			)

			if (cartItem) {
				cartItem.quantity = action.payload.quantity

				// Recalculate total
				state.total = state.items.reduce(
					(sum, item) => sum + item.item.price * item.quantity,
					0
				)
			}
		},
		clearCart: state => {
			state.items = []
			state.total = 0
		},
	},
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
	cartSlice.actions
export default cartSlice.reducer
