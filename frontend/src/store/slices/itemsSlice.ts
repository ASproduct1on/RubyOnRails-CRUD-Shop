import { Item } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ItemsState {
	items: Item[]
	selectedItem: Item | null
	loading: boolean
	error: string | null
	searchQuery: string
}

const initialState: ItemsState = {
	items: [],
	selectedItem: null,
	loading: false,
	error: null,
	searchQuery: '',
}

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<Item>) => {
			state.items.push(action.payload)
		},
		updateItem: (state, action: PayloadAction<Item>) => {
			const index = state.items.findIndex(item => item.id === action.payload.id)
			if (index !== -1) {
				state.items[index] = action.payload
			}
		},
		removeItem: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(item => item.id !== action.payload)
		},
		setItems: (state, action: PayloadAction<Item[]>) => {
			state.items = action.payload
		},
		setSelectedItem: (state, action: PayloadAction<Item | null>) => {
			state.selectedItem = action.payload
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload
		},
	},
})

export const {
	setItems,
	addItem,
	updateItem,
	removeItem,
	setSelectedItem,
	setSearchQuery,
	setLoading,
	setError,
} = itemsSlice.actions
export default itemsSlice.reducer
