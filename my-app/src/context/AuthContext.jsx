import { createContext, useContext, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

// DEMO ONLY — replace with a real API call (fetch/jwt) in production
const MOCK_USERS = {
    admin: { password: 'admin123', name: 'Admin', role: 'admin' },
    user: { password: 'user123', name: 'User', role: 'user' },
}

export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage('auth_user', null)

    const auth = useMemo(() => ({
        user,
        isAdmin: user?.role === 'admin',
        async login(username, password) {
            const found = MOCK_USERS[username]
            if (!found || found.password !== password) throw new Error('Invalid credentials')
            const { password: _, ...safe } = found
            setUser({ username, ...safe })
            return safe
        },
        logout() {
            setUser(null)
        },
    }), [user, setUser])

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}
