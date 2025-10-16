import { Order } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrdersState {
	orders: Order[]
	selectedOrder: Order | null
	loading: boolean
	error: string | null
}

const initialState: OrdersState = {
	orders: [],
	selectedOrder: null,
	loading: false,
	error: null,
}

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setOrders: (state, action: PayloadAction<Order[]>) => {
			state.orders = action.payload
		},
		setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
			state.selectedOrder = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload
		},
	},
})

export const { setOrders, setSelectedOrder, setLoading, setError } =
	ordersSlice.actions
export default ordersSlice.reducer
