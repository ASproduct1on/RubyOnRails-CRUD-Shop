import axios, { AxiosError } from 'axios'

const API_BASE_URL = (import.meta as any).env?.PROD
	? ''
	: 'http://localhost:3000'

export const api = axios.create({
	baseURL: `${API_BASE_URL}/api/v1`,
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
