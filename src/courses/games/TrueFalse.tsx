import { useState } from 'react'
import { track } from '../../lib/analytics'

export type TrueFalseQ = {
  id: string
  claim: string
  answer: boolean
  explain: string
}

type Props = {
  title?: string
  items: TrueFalseQ[]
  onComplete: () => void
}

export function TrueFalse({ title = 'True or false', items, onComplete }: Props) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<boolean | null>(null)
  const q = items[i]
  const locked = picked !== null
  const ok = picked === q.answer
  const isLast = i === items.length - 1

  function choose(v: boolean) {
    if (locked) return
    setPicked(v)
  }

  function advance() {
    if (!locked) return
    if (isLast) {
      track('game_completed', { game: 'true_false' })
      onComplete()
      return
    }
    setI((n) => n + 1)
    setPicked(null)
  }

  return (
    <div className="ms-game">
      <div className="ms-game-meta">
        <span className="eyebrow">{title}</span>
        <span className="mono ms-game-progress">
          {i + 1} / {items.length}
        </span>
      </div>

      <p className="ms-tf-claim">{q.claim}</p>

      <div className="ms-tf-row">
        <button
          type="button"
          className={`ms-tf-btn ${picked === true ? (ok ? 'ok' : 'no') : ''} ${
            locked && q.answer === true ? 'reveal' : ''
          }`}
          disabled={locked}
          onClick={() => choose(true)}
        >
          True
        </button>
        <button
          type="button"
          className={`ms-tf-btn ${picked === false ? (ok ? 'ok' : 'no') : ''} ${
            locked && q.answer === false ? 'reveal' : ''
          }`}
          disabled={locked}
          onClick={() => choose(false)}
        >
          False
        </button>
      </div>

      {locked ? (
        <div className={`ms-game-feedback ${ok ? 'ok' : 'no'}`}>
          <p className="mono">{ok ? 'Correct' : 'Nope'}</p>
          <p>{q.explain}</p>
          <button type="button" className="btn btn-primary" onClick={advance}>
            {isLast ? 'Continue' : 'Next'}
          </button>
        </div>
      ) : (
        <p className="ms-aside-hint">Tap True or False.</p>
      )}
    </div>
  )
}
