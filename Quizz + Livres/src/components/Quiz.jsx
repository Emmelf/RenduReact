import { useQuiz, CATEGORIES, DIFFICULTIES } from '../hooks/useQuiz.js'
import Question from './Question.jsx'
import Score    from './Score.jsx'
import Config   from './Config.jsx'
import Loader   from './Loader.jsx'

export default function Quiz() {
  const quiz = useQuiz()
  const { status } = quiz

  return (
    <div className="w-full max-w-2xl flex flex-col gap-8 animate-fadeUp">

      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="font-display font-black text-sm tracking-widest text-accent uppercase">
          <span className="text-muted font-normal">[</span>
          QUIZ
          <span className="text-muted font-normal">]</span>
        </div>

        {status === 'playing' && (
          <div className="flex items-center gap-1 bg-surface2 border border-border rounded-full px-4 py-1.5 font-mono text-sm">
            <span className="text-accent font-medium">{quiz.current + 1}</span>
            <span className="text-muted">/</span>
            <span className="text-muted">{quiz.questions.length}</span>
          </div>
        )}
      </header>

      {/* Contenu */}
      <main className="w-full">
        {status === 'config'   && <Config   {...quiz} categories={CATEGORIES} difficulties={DIFFICULTIES} />}
        {status === 'loading'  && <Loader />}
        {status === 'playing'  && (
          <Question
            question={quiz.questions[quiz.current]}
            questionIndex={quiz.current}
            total={quiz.questions.length}
            onAnswer={quiz.answer}
            answers={quiz.answers}
          />
        )}
        {status === 'finished' && (
          <Score
            answers={quiz.answers}
            score={quiz.score}
            total={quiz.questions.length}
            onRestart={quiz.restart}
            onReplay={quiz.fetchQuestions}
          />
        )}
      </main>
    </div>
  )
}
