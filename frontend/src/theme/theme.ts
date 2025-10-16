import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
			light: '#42a5f5',
			dark: '#1565c0',
		},
		secondary: {
			main: '#9c27b0',
		},
		success: {
			main: '#4caf50',
			light: '#81c784',
		},
		warning: {
			main: '#ff9800',
			light: '#ffb74d',
		},
		error: {
			main: '#f44336',
			light: '#e57373',
		},
		background: {
			default: '#f5f5f5',
			paper: '#ffffff',
		},
		text: {
			primary: '#212121',
			secondary: '#757575',
		},
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
		].join(','),
		h4: {
			fontWeight: 600,
			fontSize: '2rem',
		},
		h6: {
			fontWeight: 600,
			fontSize: '1.25rem',
		},
		body2: {
			color: '#757575',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: 8,
					padding: '8px 24px',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'outlined',
				fullWidth: true,
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					fontWeight: 500,
				},
			},
		},
	},
})
