import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import Button from '../../../components/Button'

export default function AccountPage() {
    const { user, updateProfile, changePassword } = useAuth()
    const [profile, setProfile] = useState({ username: user.username, email: user.email })
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    async function saveProfile(e) {
        e.preventDefault()
        setMessage(null); setError(null)
        try { await updateProfile(profile); setMessage('Profile updated successfully.') } catch (err) { setError(err.message) }
    }

    async function savePassword(e) {
        e.preventDefault()
        setMessage(null); setError(null)
        if (passwords.next !== passwords.confirm) { setError('Passwords do not match'); return }
        try {
            await changePassword(passwords.current, passwords.next)
            setPasswords({ current: '', next: '', confirm: '' })
            setMessage('Password changed successfully.')
        } catch (err) { setError(err.message) }
    }

    return (
        <div className="max-w-lg mx-auto mt-12 px-4 space-y-8">
            <h1 className="text-2xl font-bold">Account settings</h1>
            {error && <p role="alert" className="text-red-600 text-sm">{error}</p>}
            {message && <p role="status" className="text-green-600 text-sm">{message}</p>}
            <form onSubmit={saveProfile} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold">Profile</h2>
                <input className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent" value={profile.username} onChange={e => setProfile({ ...profile, username: e.target.value })} required />
                <input type="email" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} required />
                <Button type="submit">Save profile</Button>
            </form>
            <form onSubmit={savePassword} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold">Change password</h2>
                <input type="password" placeholder="Current password" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} required />
                <input type="password" placeholder="New password" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent" value={passwords.next} onChange={e => setPasswords({ ...passwords, next: e.target.value })} required />
                <input type="password" placeholder="Confirm new password" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} required />
                <Button type="submit">Change password</Button>
            </form>
        </div>
    )
}
