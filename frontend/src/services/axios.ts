import axios, { AxiosError } from 'axios'

export const api = axios.create({
	baseURL: '/api/v1',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.response.use(
	response => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			const currentPath = window.location.pathname
			if (currentPath !== '/login' && currentPath !== '/register') {
				window.location.href = '/login'
			}
		}

		return Promise.reject(error)
	}
)
