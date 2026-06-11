export default function Config({ config, setConfig, fetchQuestions, error, categories, difficulties }) {
    const update = (key) => (e) => setConfig((prev) => ({ ...prev, [key]: e.target.value }))

    return (
        <div className="bg-surface border border-border rounded-2xl p-10 shadow-sm animate-scale-in">

            <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">Open Trivia DB</p>

            <h1 className="font-bold text-4xl leading-tight mb-3 text-gray-900">
                Prêt à tester<br />
                <span className="text-accent">tes connaissances ?</span>
            </h1>
            <p className="text-muted text-sm mb-8">Configure ton quiz ci-dessous puis lance-toi.</p>

            {error && (
                <div className="flex items-center gap-2 bg-wrong/10 border border-wrong/20 rounded-xl px-4 py-3 text-wrong text-sm mb-6">
                    <span>⚠</span> {error}
                </div>
            )}

            <div className="flex flex-col gap-6 mb-9">

                {/* Nombre de questions */}
                <div className="flex flex-col gap-2.5">
                    <label className="font-mono text-xs tracking-widest text-muted uppercase">Nombre de questions</label>
                    <div className="flex items-center bg-surface2 border border-border rounded-xl w-fit overflow-hidden">
                        <button
                            className="w-11 h-11 text-lg text-gray-600 hover:bg-gray-200 transition-colors"
                            onClick={() => setConfig((p) => ({ ...p, amount: Math.max(5, p.amount - 5) }))}
                        >−</button>
                        <span className="font-mono font-semibold text-accent min-w-[48px] text-center">{config.amount}</span>
                        <button
                            className="w-11 h-11 text-lg text-gray-600 hover:bg-gray-200 transition-colors"
                            onClick={() => setConfig((p) => ({ ...p, amount: Math.min(50, p.amount + 5) }))}
                        >+</button>
                    </div>
                </div>

                {/* Catégorie */}
                <div className="flex flex-col gap-2.5">
                    <label className="font-mono text-xs tracking-widest text-muted uppercase">Catégorie</label>
                    <select
                        className="bg-white border border-border rounded-xl text-gray-700 text-sm px-4 py-3 w-full cursor-pointer focus:border-accent focus:outline-none transition-colors appearance-none"
                        value={config.category}
                        onChange={update('category')}
                        style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 16px center',
                        }}
                    >
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                    </select>
                </div>

                {/* Difficulté */}
                <div className="flex flex-col gap-2.5">
                    <label className="font-mono text-xs tracking-widest text-muted uppercase">Difficulté</label>
                    <div className="flex flex-wrap gap-2">
                        {difficulties.map((d) => (
                            <label
                                key={d.id}
                                className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm font-medium cursor-pointer transition-all
                  ${config.difficulty === d.id
                                    ? 'border-accent bg-accent/10 text-accent'
                                    : 'border-border bg-white text-gray-600 hover:border-accent/50'}`}
                            >
                                <input type="radio" name="difficulty" value={d.id}
                                       checked={config.difficulty === d.id} onChange={update('difficulty')} className="hidden" />
                                {d.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-2.5">
                    <label className="font-mono text-xs tracking-widest text-muted uppercase">Type de questions</label>
                    <div className="flex gap-2">
                        {[{ id: 'multiple', label: 'QCM' }, { id: 'boolean', label: 'Vrai / Faux' }].map((t) => (
                            <label
                                key={t.id}
                                className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm font-medium cursor-pointer transition-all
                  ${config.type === t.id
                                    ? 'border-accent bg-accent/10 text-accent'
                                    : 'border-border bg-white text-gray-600 hover:border-accent/50'}`}
                            >
                                <input type="radio" name="type" value={t.id}
                                       checked={config.type === t.id} onChange={update('type')} className="hidden" />
                                {t.label}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={fetchQuestions}
                className="w-full bg-accent text-white font-bold text-base tracking-wide py-4 rounded-xl flex items-center justify-center gap-3 hover:-translate-y-0.5 hover:bg-indigo-700 transition-all duration-150"
            >
                Lancer le quiz →
            </button>
        </div>
    )
}