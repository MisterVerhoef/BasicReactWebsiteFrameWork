import Card from '../../../components/Card'

const structure = `src/
├── components/       ← shared UI (Button, Card, PageLayout, Navbar)
├── context/          ← AuthContext, ThemeContext (global state)
├── router/           ← ProtectedRoute + route registration
├── hooks/            ← useLocalStorage, useApi (future)
└── features/
    └── <name>/
        ├── components/
        ├── pages/
        └── routes.jsx   ← self-registered routes`

const steps = [
    'Create a folder under features/<name>/ (components, pages, routes).',
    'Export your route objects from routes.jsx with any role requirements.',
    'Register the feature in the router — or let routes.jsx export directly into a nested <Routes>.',
    'Delete a feature folder and the shell keeps running; only its routes disappear.',
]

export default function ArchitecturePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Architecture</h1>
            <Card title="Folder layout">
                <pre className="text-xs bg-slate-100 dark:bg-slate-900 rounded-lg p-4 overflow-x-auto whitespace-pre">{structure}</pre>
            </Card>
            <Card title="Adding a feature — 3 steps">
                <ol className="list-decimal pl-5 space-y-2">
                    {steps.map((s, i) => <li key={i} className="text-sm">{s}</li>)}
                </ol>
            </Card>
            <Card title="Route / permission map">
                <table className="w-full text-sm">
                    <thead><tr className="text-left text-slate-500"><th className="py-2">Path</th><th>Access</th></tr></thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr><td className="py-2">/</td><td>Public</td></tr>
                    <tr><td className="py-2">/login</td><td>Public</td></tr>
                    <tr><td className="py-2">/architecture</td><td>Public</td></tr>
                    <tr><td className="py-2">/admin</td><td>Logged in + role "admin"</td></tr>
                    </tbody>
                </table>
            </Card>
        </div>
    )
}
