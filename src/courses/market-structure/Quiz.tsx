import { useRef, useState } from 'react'
import { track } from '../../lib/analytics'
import type { QuizQ } from './data'

type Props = {
  questions: QuizQ[]
  onComplete: (score: number, total: number) => void
}

export function Quiz({ questions, onComplete }: Props) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const scoreRef = useRef(0)

  const q = questions[i]
  const revealed = picked !== null
  const correct = picked === q.correct
  const isLast = i === questions.length - 1

  function choose(id: string) {
    if (picked) return
    setPicked(id)
    if (id === q.correct) scoreRef.current += 1
  }

  function advance() {
    if (isLast) {
      const score = scoreRef.current
      const total = questions.length
      track('quiz_completed', {
        score,
        total,
        pct: Math.round((score / total) * 100),
        path: typeof window !== 'undefined' ? window.location.pathname : '',
      })
      onComplete(score, total)
      return
    }
    setI((n) => n + 1)
    setPicked(null)
  }

  return (
    <div className="ms-quiz">
      <div className="ms-quiz-meta">
        <span className="eyebrow">QUICK CHECK</span>
        <span className="ms-quiz-progress mono">
          {i + 1} / {questions.length}
        </span>
      </div>
      <h3 className="ms-quiz-prompt">{q.prompt}</h3>
      <div className="ms-quiz-opts" role="list">
        {q.options.map((o) => {
          let cls = 'ms-opt'
          if (revealed) {
            if (o.id === q.correct) cls += ' is-correct'
            else if (o.id === picked) cls += ' is-wrong'
            else cls += ' is-dim'
          }
          return (
            <button
              key={o.id}
              type="button"
              className={cls}
              onClick={() => choose(o.id)}
              disabled={revealed}
            >
              <span className="ms-opt-key mono">{o.id.toUpperCase()}</span>
              <span>{o.label}</span>
            </button>
          )
        })}
      </div>
      {revealed && (
        <div className={`ms-explain ${correct ? 'ok' : 'no'}`}>
          <p className="mono">{correct ? 'CORRECT' : 'NOT QUITE'}</p>
          <p>{q.explain}</p>
          <button type="button" className="btn btn-primary" onClick={advance}>
            {isLast
              ? `Continue · ${scoreRef.current}/${questions.length}`
              : 'Next question'}
          </button>
        </div>
      )}
    </div>
  )
}
