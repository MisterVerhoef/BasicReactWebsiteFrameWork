import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requiredRole }) {
    const { user, isAdmin } = useAuth()
    const location = useLocation()

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }
    if (requiredRole === 'admin' && !isAdmin) {
        return (
            <div className="max-w-md mx-auto mt-24 text-center px-4">
                <h1 className="text-3xl font-bold">Access denied</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Your role ({user.role}) does not allow access to this page.
                </p>
            </div>
        )
    }
    return children
}
