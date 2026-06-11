import { useState, useEffect, useRef } from 'react'

const DIFFICULTY_STYLE = {
    easy:   'text-correct',
    medium: 'text-yellow-500',
    hard:   'text-wrong',
}
const DIFFICULTY_LABEL = { easy: 'Facile', medium: 'Moyen', hard: 'Difficile' }
const TIMER_DURATION = 60

export default function Question({ question, questionIndex, total, onAnswer }) {
    const [chosen, setChosen]   = useState(null)
    const [seconds, setSeconds] = useState(TIMER_DURATION)
    const [expired, setExpired] = useState(false)
    const intervalRef = useRef(null)

    useEffect(() => {
        setChosen(null)
        setSeconds(TIMER_DURATION)
        setExpired(false)
    }, [questionIndex])

    useEffect(() => {
        if (chosen !== null || expired) return
        intervalRef.current = setInterval(() => {
            setSeconds((s) => {
                if (s <= 1) {
                    clearInterval(intervalRef.current)
                    setExpired(true)
                    onAnswer(null)
                    return 0
                }
                return s - 1
            })
        }, 1000)
        return () => clearInterval(intervalRef.current)
    }, [chosen, expired, questionIndex])

    if (!question) return null

    const hasAnswered = chosen !== null || expired
    const progress    = (questionIndex / total) * 100
    const pad         = (n) => String(n).padStart(2, '0')
    const isUrgent    = seconds <= 10

    const getState = (opt) => {
        if (!hasAnswered)             return 'idle'
        if (opt === question.correct) return 'correct'
        if (opt === chosen)           return 'wrong'
        return 'idle'
    }

    const handleClick = (opt) => {
        if (hasAnswered) return
        clearInterval(intervalRef.current)
        setChosen(opt)
        onAnswer(opt)
    }

    const optionClass = (opt) => {
        const state = getState(opt)
        const base  = 'flex items-center gap-3 border rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 w-full disabled:cursor-default'
        if (state === 'correct') return `${base} border-correct bg-correct/10 text-correct animate-pop`
        if (state === 'wrong')   return `${base} border-wrong bg-wrong/10 text-wrong`
        return `${base} border-border bg-white text-gray-700 hover:border-accent hover:bg-accent/5 hover:-translate-y-px cursor-pointer`
    }

    const letterClass = (opt) => {
        const state = getState(opt)
        const base  = 'font-mono text-xs w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 border transition-all font-bold'
        if (state === 'correct') return `${base} bg-correct border-correct text-white`
        if (state === 'wrong')   return `${base} bg-wrong border-wrong text-white`
        return `${base} bg-gray-100 border-border text-muted`
    }

    return (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm animate-fade-up">

            {/* Barre de progression */}
            <div className="h-1 bg-gray-100 w-full">
                <div className="h-full bg-accent transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>

            {/* Méta */}
            <div className="flex items-center justify-between px-6 pt-5 gap-3">
        <span className="font-mono text-xs text-muted tracking-wide truncate max-w-[55%]">
          {question.category}
        </span>
                <div className="flex items-center gap-2.5">
          <span className={`font-mono text-[10px] font-semibold tracking-widest uppercase ${DIFFICULTY_STYLE[question.difficulty]}`}>
            {DIFFICULTY_LABEL[question.difficulty]}
          </span>
                    {/* Timer */}
                    <div className={`flex items-center gap-1.5 border rounded-full px-3 py-1 font-mono text-[13px] font-semibold transition-colors duration-300
            ${isUrgent
                        ? 'border-wrong/40 bg-wrong/5 text-wrong animate-pulse'
                        : 'border-border bg-surface2 text-accent'}`}
                    >
                        <span className={`w-[7px] h-[7px] rounded-full bg-current ${isUrgent ? 'animate-blink' : ''}`} />
                        <span>00:{pad(seconds)}</span>
                    </div>
                </div>
            </div>

            {/* Question */}
            <h2 className="font-bold text-[17px] leading-snug px-6 py-5 text-gray-900">
                {question.question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-2 gap-2.5 px-5 pb-5">
                {question.options.map((opt, i) => {
                    const state = getState(opt)
                    return (
                        <button
                            key={i}
                            className={optionClass(opt)}
                            onClick={() => handleClick(opt)}
                            disabled={hasAnswered}
                        >
                            <span className={letterClass(opt)}>{String.fromCharCode(65 + i)}</span>
                            <span className="flex-1 leading-snug">{opt}</span>
                            {state === 'correct' && <span className="font-bold text-sm flex-shrink-0">✓</span>}
                            {state === 'wrong'   && <span className="font-bold text-sm flex-shrink-0">✗</span>}
                        </button>
                    )
                })}
            </div>

            {/* Banner temps écoulé */}
            {expired && (
                <div className="mx-5 mb-4 px-4 py-2.5 bg-wrong/10 border border-wrong/20 rounded-xl text-wrong text-xs font-semibold text-center animate-fade-up">
                    ⏱ Temps écoulé ! La bonne réponse est révélée.
                </div>
            )}

            {/* Footer : dots + bouton Next */}
            <div className="flex items-center justify-between px-5 pb-5">
                <div className="flex gap-1.5">
                    {Array.from({ length: total }).map((_, i) => (
                        <span
                            key={i}
                            className={`w-[7px] h-[7px] rounded-full transition-colors duration-300
                ${i < questionIndex  ? 'bg-accent'
                                : i === questionIndex ? 'bg-gray-800'
                                    : 'bg-gray-200'}`}
                        />
                    ))}
                </div>
                <button
                    className={`bg-accent text-white font-bold text-sm rounded-xl px-5 py-2.5
            transition-all duration-200
            ${hasAnswered
                        ? 'opacity-100 scale-100 hover:-translate-y-px hover:bg-indigo-700'
                        : 'opacity-0 scale-95 pointer-events-none'}`}
                >
                    Suivant →
                </button>
            </div>
        </div>
    )
}