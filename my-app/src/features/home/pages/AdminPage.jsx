import { useState } from 'react'
import Card from '../../../components/Card'
import Button from '../../../components/Button'

export default function AdminPage() {
    const [users, setUsers] = useState([
        { username: 'admin', role: 'admin' },
        { username: 'user', role: 'user' },
    ])
    const [name, setName] = useState('')

    const add = (e) => {
        e.preventDefault()
        if (!name.trim()) return
        setUsers(u => [...u, { username: name.trim(), role: 'user' }])
        setName('')
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Admin dashboard</h1>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
                {[['Users', users.length], ['Sessions', 'n/a'], ['Uptime', '99.9%']].map(([label, value]) => (
                    <Card key={label}>
                        <p className="text-sm text-slate-500">{label}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </Card>
                ))}
            </div>

            <Card title="Users">
                <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                    {users.map(u => (
                        <li key={u.username} className="py-3 flex justify-between">
                            <span>{u.username}</span>
                            <span className="text-sm text-slate-500">{u.role}</span>
                        </li>
                    ))}
                </ul>
                <form onSubmit={add} className="mt-4 flex gap-2">
                    <input
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
                        placeholder="New username"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Button>Add</Button>
                </form>
            </Card>
        </div>
    )
}
