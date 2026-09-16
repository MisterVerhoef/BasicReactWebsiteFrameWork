export default function Card({ title, children }) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            {title && <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{title}</h3>}
            <div className={title ? 'mt-3' : ''}>{children}</div>
        </div>
    )
}
