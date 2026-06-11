import { useState, useCallback } from 'react'

export const CATEGORIES = [
  { id: '',   label: 'Toutes catégories' },
  { id: '9',  label: 'Culture générale' },
  { id: '17', label: 'Science & Nature' },
  { id: '18', label: 'Science: Informatique' },
  { id: '19', label: 'Science: Mathématiques' },
  { id: '21', label: 'Sports' },
  { id: '22', label: 'Géographie' },
  { id: '23', label: 'Histoire' },
  { id: '11', label: 'Films' },
  { id: '12', label: 'Musique' },
  { id: '15', label: 'Jeux vidéo' },
  { id: '20', label: 'Mythologie' },
]

export const DIFFICULTIES = [
  { id: '',       label: 'Toutes' },
  { id: 'easy',   label: 'Facile' },
  { id: 'medium', label: 'Moyen' },
  { id: 'hard',   label: 'Difficile' },
]

function decodeHtml(html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function useQuiz() {
  const [status, setStatus]       = useState('config')
  const [questions, setQuestions] = useState([])
  const [current, setCurrent]     = useState(0)
  const [answers, setAnswers]     = useState([])
  const [error, setError]         = useState(null)
  const [config, setConfig]       = useState({
    amount: 10,
    category: '',
    difficulty: '',
    type: 'multiple',
  })

  const fetchQuestions = useCallback(async () => {
    setStatus('loading')
    setError(null)

    const params = new URLSearchParams({ amount: config.amount })
    if (config.category)   params.set('category',   config.category)
    if (config.difficulty) params.set('difficulty', config.difficulty)
    if (config.type)       params.set('type',       config.type)

    try {
      const res  = await fetch(`https://opentdb.com/api.php?${params}`)
      const data = await res.json()

      if (data.response_code !== 0) {
        throw new Error(
          data.response_code === 1
            ? 'Pas assez de questions pour ces paramètres.'
            : `Erreur API (code ${data.response_code})`
        )
      }

      const parsed = data.results.map((q) => ({
        question:   decodeHtml(q.question),
        correct:    decodeHtml(q.correct_answer),
        options:    shuffle([q.correct_answer, ...q.incorrect_answers].map(decodeHtml)),
        category:   decodeHtml(q.category),
        difficulty: q.difficulty,
        type:       q.type,
      }))

      setQuestions(parsed)
      setAnswers([])
      setCurrent(0)
      setStatus('playing')
    } catch (e) {
      setError(e.message || 'Une erreur est survenue.')
      setStatus('config')
    }
  }, [config])

  const answer = useCallback((chosen) => {
    const q = questions[current]
    setAnswers((prev) => [
      ...prev,
      { question: q.question, chosen, correct: q.correct, isCorrect: chosen === q.correct },
    ])
    setTimeout(() => {
      if (current + 1 >= questions.length) setStatus('finished')
      else setCurrent((c) => c + 1)
    }, 900)
  }, [current, questions])

  const restart = useCallback(() => {
    setStatus('config')
    setQuestions([])
    setAnswers([])
    setCurrent(0)
  }, [])

  const score = answers.filter((a) => a.isCorrect).length

  return { status, questions, current, answers, error, config, score, setConfig, fetchQuestions, answer, restart }
}
