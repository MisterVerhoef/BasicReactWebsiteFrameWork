import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Button from '../../../components/Button'

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        try {
            await login(username, password)
            navigate(location.state?.from || '/', { replace: true })
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-16 px-4">
            <h1 className="text-2xl font-bold mb-6">Log in</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <input
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <Button className="w-full" type="submit">Login</Button>
            </form>
            <p className="mt-4 text-xs text-center text-slate-500">
                Demo: admin/admin123 (admin) · user/user123 (user)
            </p>
        </div>
    )
}
