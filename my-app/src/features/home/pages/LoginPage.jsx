import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Button from '../../../components/Button'

export default function LoginPage() {
    const { login, register } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [mode, setMode] = useState('login')
    const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
    const [error, setError] = useState(null)
    const [busy, setBusy] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        if (mode === 'register' && form.password !== form.confirmPassword) {
            setError('Passwords do not match')
            return
        }
        setBusy(true)
        try {
            if (mode === 'login') {
                await login(form.username, form.password)
                navigate(location.state?.from || '/', { replace: true })
            } else {
                await register(form)
                navigate('/', { replace: true })
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-16 px-4">
            <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
                {['login', 'register'].map(option => (
                    <button key={option} type="button" className={`px-3 py-2 font-medium capitalize ${mode === option ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`} onClick={() => { setMode(option); setError(null) }}>
                        {option}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <input
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                    placeholder={mode === 'login' ? 'Username or email' : 'Username'}
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                    required
                />
                {mode === 'register' && <input type="email" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent" placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />}
                <input
                    type="password"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                />
                {mode === 'register' && <input type="password" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent" placeholder="Confirm password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required />}
                {error && <p role="alert" className="text-red-600 text-sm">{error}</p>}
                <Button className="w-full" type="submit" disabled={busy}>{busy ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}</Button>
            </form>
            {mode === 'login' && <p className="mt-4 text-xs text-center text-slate-500">Demo: admin/admin123 · user/user123</p>}
        </div>
    )
}
