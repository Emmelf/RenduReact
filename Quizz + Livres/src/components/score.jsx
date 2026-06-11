function getRating(pct) {
    if (pct === 100) return { emoji: '🏆', label: 'Parfait !',        color: '#6366f1', tw: 'text-accent' }
    if (pct >= 80)   return { emoji: '🎯', label: 'Excellent !',      color: '#16a34a', tw: 'text-correct' }
    if (pct >= 60)   return { emoji: '👍', label: 'Bien joué !',      color: '#3b82f6', tw: 'text-blue-500' }
    if (pct >= 40)   return { emoji: '📚', label: 'Peut mieux faire', color: '#f59e0b', tw: 'text-yellow-500' }
    return            { emoji: '💡', label: 'À retravailler',         color: '#dc2626', tw: 'text-wrong' }
}

export default function Score({ answers, score, total, onRestart, onReplay }) {
    const pct    = Math.round((score / total) * 100)
    const rating = getRating(pct)
    const dash   = 2 * Math.PI * 52
    const filled = dash * (1 - pct / 100)

    return (
        <div className="bg-surface border border-border rounded-2xl p-10 flex flex-col gap-8 shadow-sm animate-scale-in">

            {/* Anneau + infos */}
            <div className="flex items-center gap-7">
                <div className="relative flex-shrink-0">
                    <svg viewBox="0 0 120 120" width="120" height="120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52"
                            fill="none"
                            stroke={rating.color}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={dash}
                            strokeDashoffset={filled}
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-mono font-semibold text-2xl ${rating.tw}`}>
              {pct}<small className="text-sm opacity-60">%</small>
            </span>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <span className="text-3xl leading-none">{rating.emoji}</span>
                    <h2 className="font-bold text-3xl text-gray-900">{rating.label}</h2>
                    <p className="text-muted text-sm">
                        <strong className={rating.tw}>{score}</strong> bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur{' '}
                        <strong className="text-gray-800">{total}</strong>
                    </p>
                </div>
            </div>

            {/* Récapitulatif */}
            <div>
                <h3 className="font-mono text-xs tracking-widest text-muted uppercase mb-3">Récapitulatif</h3>
                <ul className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
                    {answers.map((a, i) => (
                        <li
                            key={i}
                            className={`flex items-start gap-3 p-3 rounded-xl border text-sm
                ${a.isCorrect ? 'bg-correct/5 border-correct/20' : 'bg-wrong/5 border-wrong/20'}`}
                        >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white
                ${a.isCorrect ? 'bg-correct' : 'bg-wrong'}`}>
                {a.isCorrect ? '✓' : '✗'}
              </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-800 leading-snug mb-0.5">{a.question}</p>
                                {!a.isCorrect && (
                                    <p className="text-muted text-xs leading-snug">
                                        Ta réponse : <em className="text-wrong not-italic">{a.chosen}</em>
                                        {' — '}Bonne réponse : <strong className="text-correct font-semibold">{a.correct}</strong>
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={onReplay}
                    className="flex-1 bg-surface2 border border-border text-gray-700 font-semibold py-3.5 rounded-xl text-sm hover:-translate-y-0.5 hover:border-accent/50 transition-all"
                >
                    Rejouer même config
                </button>
                <button
                    onClick={onRestart}
                    className="flex-1 bg-accent text-white font-bold py-3.5 rounded-xl text-sm hover:-translate-y-0.5 hover:bg-indigo-700 transition-all"
                >
                    Nouveau quiz →
                </button>
            </div>
        </div>
    )
}