import { useState } from 'react'

export type OddOneQ = {
  id: string
  prompt: string
  options: { id: string; label: string }[]
  oddId: string
  explain: string
}

type Props = {
  title?: string
  items: OddOneQ[]
  onComplete: () => void
}

export function OddOneOut({ title = 'Odd one out', items, onComplete }: Props) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const q = items[i]
  const locked = picked !== null
  const ok = picked === q.oddId
  const isLast = i === items.length - 1

  function choose(id: string) {
    if (locked) return
    setPicked(id)
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
      <p className="ms-game-prompt">{q.prompt}</p>

      <div className="ms-odd-list">
        {q.options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`ms-odd-card ${picked === o.id ? (ok ? 'ok' : 'no') : ''} ${
              locked && o.id === q.oddId ? 'reveal' : ''
            }`}
            disabled={locked}
            onClick={() => choose(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>

      {locked ? (
        <div className={`ms-game-feedback ${ok ? 'ok' : 'no'}`}>
          <p className="mono">{ok ? 'That’s the odd one' : 'Not that one'}</p>
          <p>{q.explain}</p>
          <button type="button" className="btn btn-primary" onClick={advance}>
            {isLast ? 'Continue' : 'Next'}
          </button>
        </div>
      ) : (
        <p className="ms-aside-hint">Tap the one that does not belong.</p>
      )}
    </div>
  )
}
