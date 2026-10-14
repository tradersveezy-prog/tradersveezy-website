import { useMemo, useState } from 'react'

export type FillBlankQ = {
  id: string
  /** Use ___ for the blank */
  sentence: string
  choices: string[]
  correct: string
  explain: string
}

type Props = {
  title?: string
  items: FillBlankQ[]
  onComplete: () => void
}

export function FillBlank({ title = 'Fill the blank', items, onComplete }: Props) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const q = items[i]
  const locked = picked !== null
  const ok = picked === q.correct
  const isLast = i === items.length - 1

  const parts = useMemo(() => q.sentence.split('___'), [q.sentence])

  function choose(c: string) {
    if (locked) return
    setPicked(c)
  }

  function advance() {
    if (!locked) return
    if (isLast) {
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

      <p className="ms-fill-sentence">
        {parts[0]}
        <span className={`ms-fill-slot ${locked ? (ok ? 'ok' : 'no') : picked ? 'on' : ''}`}>
          {picked ?? '____'}
        </span>
        {parts[1]}
      </p>

      <div className="ms-fill-choices">
        {q.choices.map((c) => (
          <button
            key={c}
            type="button"
            className={`ms-fill-chip ${picked === c ? (ok ? 'ok' : 'no') : ''} ${
              locked && c === q.correct ? 'reveal' : ''
            }`}
            disabled={locked}
            onClick={() => choose(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {locked ? (
        <div className={`ms-game-feedback ${ok ? 'ok' : 'no'}`}>
          <p className="mono">{ok ? 'Nice' : 'Try to remember'}</p>
          <p>{q.explain}</p>
          <button type="button" className="btn btn-primary" onClick={advance}>
            {isLast ? 'Continue' : 'Next'}
          </button>
        </div>
      ) : (
        <p className="ms-aside-hint">Pick the word that fits.</p>
      )}
    </div>
  )
}
