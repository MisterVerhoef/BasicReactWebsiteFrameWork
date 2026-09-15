import {Routes, Route, Navigate} from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import ProtectedRoute from './router/ProtectedRoute'
import HomePage from './features/home/pages/HomePage'
import LoginPage from './features/home/pages/LoginPage'
import AdminPage from './features/home/pages/AdminPage'
import ArchitecturePage from './features/home/pages/ArchitecturePage'
import PageLayout from './components/PageLayout'

export default function App() {
    //  context providers live in main.jsx
    useEffect(() => { document.title = 'My Framework' }, [])
    return (
        <PageLayout navbar={<Navbar />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/architecture" element={<ArchitecturePage />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </PageLayout>
    )
}
