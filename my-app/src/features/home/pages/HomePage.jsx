import { Link } from 'react-router-dom'
import Card from '../../../components/Card'

const modules = [
    { icon: '🏠', title: 'Homepage', desc: 'Public landing page with hero and feature grid.' },
    { icon: '🔐', title: 'Auth', desc: 'Context-based login, session persisted in localStorage.' },
    { icon: '🛡️', title: 'Protected routes', desc: 'Role-aware access control (user/admin).', auth: true },
    { icon: '🧩', title: 'Feature modules', desc: 'Drop-in feature folders, self-registered routes.' },
]

export default function HomePage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <section className="text-center py-12">
                <h1 className="text-5xl font-extrabold tracking-tight">A modular site framework</h1>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                    One base to start any site project from. Features are self-contained — add them, drop them, nothing else breaks.
                </p>
                <Link to="/architecture" className="inline-block mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    How the architecture works
                </Link>
            </section>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {modules.map(m => (
                    <Card key={m.title}>
                        <div className="text-3xl mb-2">{m.icon}</div>
                        <h3 className="font-semibold">{m.title}</h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{m.desc}</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}
