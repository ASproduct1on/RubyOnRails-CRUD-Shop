import { authAPI } from '@/api/auth.api'
import { profileAPI } from '@/api/profile.api'
import { User } from '@/types'
import { LoginFormData, RegisterFormData } from '@/utils/validationSchemas'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
	user: User | null
	isAuthenticated: boolean
	loading: boolean
	error: string | null
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	loading: false,
	error: null,
}

// Check if user is authenticated (on app load)
export const checkAuth = createAsyncThunk<User>(
	'auth/checkAuth',
	async (_, { rejectWithValue }) => {
		try {
			const user = await profileAPI.get()
			return user
		} catch {
			return rejectWithValue('Not authenticated')
		}
	}
)

// Login
export const login = createAsyncThunk<User, LoginFormData>(
	'auth/login',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await authAPI.login(credentials)
			return response.user
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Login failed')
		}
	}
)

// Signup
export const signup = createAsyncThunk<User, RegisterFormData>(
	'auth/signup',
	async (data, { rejectWithValue }) => {
		try {
			const response = await authAPI.signup(data)
			return response.user
		} catch (error: any) {
			const message =
				error.response?.data?.message || error.message || 'Login failed'
			return rejectWithValue(message)
		}
	}
)

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
	await authAPI.logout()
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearError: state => {
			state.error = null
		},
	},
	extraReducers: builder => {
		// Check Auth
		builder
			.addCase(checkAuth.pending, state => {
				state.loading = true
			})
			.addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false
				state.isAuthenticated = true
				state.user = action.payload
			})
			.addCase(checkAuth.rejected, state => {
				state.loading = false
				state.isAuthenticated = false
				state.user = null
			})

		// Login
		builder
			.addCase(login.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false
				state.isAuthenticated = true
				state.user = action.payload
				state.error = null
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.isAuthenticated = false
				state.user = null
				state.error = action.payload as string
			})

		// Signup
		builder
			.addCase(signup.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false
				state.isAuthenticated = true
				state.user = action.payload
				state.error = null
			})
			.addCase(signup.rejected, (state, action) => {
				state.loading = false
				state.isAuthenticated = false
				state.user = null
				state.error = action.payload as string
			})

		// Logout
		builder.addCase(logout.fulfilled, state => {
			state.user = null
			state.isAuthenticated = false
			state.error = null
		})
	},
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
