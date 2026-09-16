import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Button from './Button'

export default function Navbar() {
    const { user, isAdmin, logout } = useAuth()
    const { dark, toggle } = useTheme()
    const navigate = useNavigate()

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-700">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="font-bold text-lg">MyFramework</Link>

                <div className="flex items-center gap-2">
                    <NavLink to="/" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Home</NavLink>
                    <NavLink to="/architecture" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Architecture</NavLink>
                    {isAdmin && (
                        <NavLink to="/admin" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Admin</NavLink>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={toggle} variant-ghost className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title="Toggle theme">
                        {dark ? '☀️' : '🌙'}
                    </button>
                    {user ? (
                        <>
              <span className="text-sm hidden sm:inline text-slate-600 dark:text-slate-300">
                {user.name} ({user.role})
              </span>
                            <Button variant="secondary" onClick={() => { logout(); navigate('/') }}>Logout</Button>
                        </>
                    ) : (
                        <Link to="/login"><Button>Login</Button></Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
