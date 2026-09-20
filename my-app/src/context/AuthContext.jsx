import { createContext, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

const DEFAULT_USERS = [
    { username: 'admin', email: 'admin@example.com', password: 'admin123', name: 'Admin', role: 'admin' },
    { username: 'user', email: 'user@example.com', password: 'user123', name: 'User', role: 'user' },
]

function publicUser({ password: _, ...account }) {
    return account
}

function normalize(value) {
    return value.trim().toLowerCase()
}

export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage('auth_user', null)
    const [users, setUsers] = useLocalStorage('auth_users', DEFAULT_USERS)

    const auth = useMemo(() => ({
        user,
        isAdmin: user?.role === 'admin',
        async login(usernameOrEmail, password) {
            const identifier = normalize(usernameOrEmail)
            const found = users.find(account =>
                normalize(account.username) === identifier || normalize(account.email) === identifier
            )
            if (!found || found.password !== password) throw new Error('Invalid credentials')
            const safe = publicUser(found)
            setUser(safe)
            return safe
        },
        async register({ username, email, password }) {
            const cleanUsername = username.trim()
            const cleanEmail = normalize(email)
            if (cleanUsername.length < 3) throw new Error('Username must be at least 3 characters')
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) throw new Error('Enter a valid email address')
            if (password.length < 8) throw new Error('Password must be at least 8 characters')
            if (users.some(account => normalize(account.username) === normalize(cleanUsername))) {
                throw new Error('That username is already taken')
            }
            if (users.some(account => normalize(account.email) === cleanEmail)) {
                throw new Error('That email address is already registered')
            }
            const account = {
                username: cleanUsername,
                email: cleanEmail,
                password,
                name: cleanUsername,
                role: 'user',
            }
            setUsers([...users, account])
            const safe = publicUser(account)
            setUser(safe)
            return safe
        },
        async updateProfile({ username, email }) {
            if (!user) throw new Error('You must be logged in')
            const cleanUsername = username.trim()
            const cleanEmail = normalize(email)
            if (cleanUsername.length < 3) throw new Error('Username must be at least 3 characters')
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) throw new Error('Enter a valid email address')
            if (users.some(account => account.username !== user.username &&
                normalize(account.username) === normalize(cleanUsername))) {
                throw new Error('That username is already taken')
            }
            if (users.some(account => account.username !== user.username &&
                normalize(account.email) === cleanEmail)) {
                throw new Error('That email address is already registered')
            }
            const updated = users.map(account => account.username === user.username
                ? { ...account, username: cleanUsername, email: cleanEmail, name: cleanUsername }
                : account)
            setUsers(updated)
            const safe = publicUser(updated.find(account => account.username === cleanUsername))
            setUser(safe)
            return safe
        },
        async changePassword(currentPassword, newPassword) {
            if (!user) throw new Error('You must be logged in')
            const account = users.find(item => item.username === user.username)
            if (!account || account.password !== currentPassword) throw new Error('Current password is incorrect')
            if (newPassword.length < 8) throw new Error('New password must be at least 8 characters')
            setUsers(users.map(item => item.username === user.username
                ? { ...item, password: newPassword }
                : item))
        },
        logout() {
            setUser(null)
        },
    }), [user, users, setUser, setUsers])

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}
