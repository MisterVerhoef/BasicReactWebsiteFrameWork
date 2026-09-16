export default function PageLayout({ navbar, children, footer }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
            {navbar}
            <main className="flex-1">{children}</main>
            {footer && <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">{footer}</footer>}
        </div>
    )
}
