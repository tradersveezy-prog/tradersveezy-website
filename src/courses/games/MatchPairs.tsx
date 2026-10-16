import { useMemo, useState } from 'react'
import { track } from '../../lib/analytics'

export type MatchPair = {
  id: string
  left: string
  right: string
}

type Props = {
  title?: string
  prompt?: string
  pairs: MatchPair[]
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

export function MatchPairs({
  title = 'Match the pairs',
  prompt = 'Tap a left card, then the matching right card.',
  pairs,
  onComplete,
}: Props) {
  const lefts = useMemo(() => pairs.map((p) => ({ id: p.id, label: p.left })), [pairs])
  const [rights] = useState(() => shuffle(pairs.map((p) => ({ id: p.id, label: p.right }))))

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(() => new Set())
  const [missFlash, setMissFlash] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function pickLeft(id: string) {
    if (matched.has(id) || done) return
    setSelectedLeft(id)
    setMissFlash(null)
  }

  function pickRight(id: string) {
    if (!selectedLeft || matched.has(id) || done) return
    if (id === selectedLeft) {
      const next = new Set(matched).add(id)
      setMatched(next)
      setSelectedLeft(null)
      if (next.size === pairs.length) setDone(true)
      return
    }
    setMissFlash(id)
    window.setTimeout(() => {
      setMissFlash(null)
      setSelectedLeft(null)
    }, 550)
  }

  return (
    <div className="ms-game">
      <div className="ms-game-meta">
        <span className="eyebrow">{title}</span>
        <span className="mono ms-game-progress">
          {matched.size} / {pairs.length}
        </span>
      </div>
      <p className="ms-game-prompt">{prompt}</p>

      <div className="ms-match-grid">
        <div className="ms-match-col">
          {lefts.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`ms-match-card ${matched.has(l.id) ? 'matched' : ''} ${
                selectedLeft === l.id ? 'on' : ''
              }`}
              disabled={matched.has(l.id) || done}
              onClick={() => pickLeft(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="ms-match-col">
          {rights.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`ms-match-card right ${matched.has(r.id) ? 'matched' : ''} ${
                missFlash === r.id ? 'miss' : ''
              }`}
              disabled={matched.has(r.id) || done || !selectedLeft}
              onClick={() => pickRight(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {done ? (
        <div className="ms-game-feedback ok">
          <p className="mono">All matched</p>
          <p>You linked every pair. That sticks better than reading a list.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              track('game_completed', { game: 'match_pairs' })
              onComplete()
            }}
          >
            Continue
          </button>
        </div>
      ) : null}
    </div>
  )
}
