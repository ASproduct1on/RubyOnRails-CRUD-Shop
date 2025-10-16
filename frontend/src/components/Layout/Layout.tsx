import { Box } from '@mui/material'
import Navbar from './NavBar'

interface LayoutProps {
	children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Navbar />
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					bgcolor: 'background.default',
					pt: 3,
					pb: 6,
				}}
			>
				{children}
			</Box>
		</Box>
	)
}
