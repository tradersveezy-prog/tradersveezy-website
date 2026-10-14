import { useMemo, useState } from 'react'

/** Mini crossword-lite: build a word from a letter bank. */
type Props = {
  title?: string
  clue: string
  answer: string
  decoys?: string[]
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

export function WordBank({
  title = 'Spell it',
  clue,
  answer,
  decoys = [],
  explain,
  onComplete,
}: Props) {
  const target = answer.toUpperCase().replace(/\s+/g, '')
  const bank = useMemo(() => {
    const letters = [...target, ...decoys.map((d) => d.toUpperCase())]
    return shuffle(letters.map((ch, i) => ({ id: `${ch}-${i}`, ch })))
  }, [target, decoys])

  const [stack, setStack] = useState<{ id: string; ch: string }[]>([])
  const [locked, setLocked] = useState(false)

  const used = useMemo(() => new Set(stack.map((s) => s.id)), [stack])
  const built = stack.map((s) => s.ch)
  const current = built.join('')
  const ok = locked && current === target

  function tap(id: string, ch: string) {
    if (locked || used.has(id)) return
    const next = [...stack, { id, ch }]
    setStack(next)
    if (next.length === target.length) setLocked(true)
  }

  function undo() {
    if (locked || stack.length === 0) return
    setStack((s) => s.slice(0, -1))
  }

  function reset() {
    setStack([])
    setLocked(false)
  }

  return (
    <div className="ms-game">
      <div className="ms-game-meta">
        <span className="eyebrow">{title}</span>
        <span className="mono ms-game-progress">
          {built.length} / {target.length}
        </span>
      </div>
      <p className="ms-game-prompt">{clue}</p>

      <div className="ms-word-slots" aria-label="Answer">
        {Array.from({ length: target.length }).map((_, i) => (
          <span key={i} className={`ms-word-slot ${locked ? (ok ? 'ok' : 'no') : built[i] ? 'on' : ''}`}>
            {built[i] ?? ''}
          </span>
        ))}
      </div>

      <div className="ms-word-bank">
        {bank.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`ms-word-tile ${used.has(b.id) ? 'used' : ''}`}
            disabled={locked || used.has(b.id)}
            onClick={() => tap(b.id, b.ch)}
          >
            {b.ch}
          </button>
        ))}
      </div>

      {!locked ? (
        <div className="ms-game-row">
          <button type="button" className="btn btn-ghost" onClick={undo} disabled={stack.length === 0}>
            Undo
          </button>
          <button type="button" className="btn btn-ghost" onClick={reset} disabled={stack.length === 0}>
            Clear
          </button>
        </div>
      ) : (
        <div className={`ms-game-feedback ${ok ? 'ok' : 'no'}`}>
          <p className="mono">{ok ? `Spelled ${target}` : 'Not that word'}</p>
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
      )}
    </div>
  )
}
