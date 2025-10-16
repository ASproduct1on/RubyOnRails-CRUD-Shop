import { useAppSelector } from '@/store'
import { UserRole } from '@/types'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
	children: React.ReactNode
	requiredRole?: UserRole
}

export default function ProtectedRoute({
	children,
	requiredRole,
}: ProtectedRouteProps) {
	const { isAuthenticated, user } = useAppSelector(state => state.auth)

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />
	}

	if (requiredRole && user?.role !== requiredRole) {
		return <Navigate to='/' replace />
	}

	return <>{children}</>
}
