import { useState } from 'react'

export type OrderItem = {
  id: string
  label: string
}

type Props = {
  title?: string
  prompt: string
  /** Correct order */
  items: OrderItem[]
  explain: string
  onComplete: () => void
}

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function OrderSteps({
  title = 'Put in order',
  prompt,
  items,
  explain,
  onComplete,
}: Props) {
  const [deck] = useState(() => shuffle(items))
  const [picked, setPicked] = useState<string[]>([])
  const [locked, setLocked] = useState(false)

  const remaining = deck.filter((d) => !picked.includes(d.id))
  const correctOrder = items.map((x) => x.id)
  const ok = locked && picked.every((id, i) => id === correctOrder[i])

  function tap(id: string) {
    if (locked) return
    const next = [...picked, id]
    setPicked(next)
    if (next.length === items.length) setLocked(true)
  }

  function reset() {
    setPicked([])
    setLocked(false)
  }

  return (
    <div className="ms-game">
      <div className="ms-game-meta">
        <span className="eyebrow">{title}</span>
        <span className="mono ms-game-progress">
          {picked.length} / {items.length}
        </span>
      </div>
      <p className="ms-game-prompt">{prompt}</p>

      <ol className="ms-order-built">
        {picked.map((id, idx) => {
          const item = items.find((x) => x.id === id)!
          const good = !locked || id === correctOrder[idx]
          return (
            <li key={`${id}-${idx}`} className={locked ? (good ? 'ok' : 'no') : ''}>
              <span className="mono">{String(idx + 1).padStart(2, '0')}</span>
              {item.label}
            </li>
          )
        })}
        {!locked && picked.length < items.length ? (
          <li className="ms-order-next">Tap the next step…</li>
        ) : null}
      </ol>

      <div className="ms-order-deck">
        {remaining.map((d) => (
          <button key={d.id} type="button" className="ms-order-chip" disabled={locked} onClick={() => tap(d.id)}>
            {d.label}
          </button>
        ))}
      </div>

      {locked ? (
        <div className={`ms-game-feedback ${ok ? 'ok' : 'no'}`}>
          <p className="mono">{ok ? 'In order' : 'Not quite'}</p>
          <p>{explain}</p>
          {ok ? (
            <button type="button" className="btn btn-primary" onClick={onComplete}>
              Continue
            </button>
          ) : (
            <button type="button" className="btn btn-ghost" onClick={reset}>
              Try again
            </button>
          )}
        </div>
      ) : null}
    </div>
  )
}
