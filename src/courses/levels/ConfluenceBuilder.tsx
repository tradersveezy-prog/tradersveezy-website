import { useMemo, useState } from 'react'
import { track } from '../../lib/analytics'

const FACTORS = [
  { id: 'poc', label: 'POC in the zone', weight: 2 },
  { id: 'val', label: 'VAL / VAH edge', weight: 2 },
  { id: 'ema55', label: '55 EMA sitting here', weight: 2 },
  { id: 'ema200', label: '200 EMA sitting here', weight: 2 },
  { id: 'broken', label: 'Untested broken level', weight: 2 },
  { id: 'wick', label: 'Long wick rejection', weight: 1 },
  { id: 'wickHalf', label: 'Wick 0.5 midpoint in zone', weight: 1 },
  { id: 'flatBody', label: 'Wide flat-body pair', weight: 1 },
  { id: 'vwap', label: 'Session VWAP in zone', weight: 1 },
  { id: 'fvg', label: 'Fair value gap / imbalance', weight: 1 },
  { id: 'ob', label: 'Order block / demand print', weight: 1 },
  { id: 'fib', label: 'Fib shelf only (no other proof)', weight: 0 },
] as const

type Props = {
  onComplete: () => void
}

export function ConfluenceBuilder({ onComplete }: Props) {
  const [on, setOn] = useState<Record<string, boolean>>({})

  const score = useMemo(
    () => FACTORS.reduce((sum, f) => sum + (on[f.id] ? f.weight : 0), 0),
    [on],
  )
  const picked = Object.values(on).some(Boolean)
  const max = FACTORS.reduce((sum, f) => sum + f.weight, 0)
  const pct = Math.round((score / max) * 100)

  let verdict = 'Weak — a Fib alone is not a trade'
  let tone: 'weak' | 'ok' | 'strong' = 'weak'
  if (score >= 6) {
    verdict = 'Strong zone — several supporting factors'
    tone = 'strong'
  } else if (score >= 3) {
    verdict = 'Usable — wait for a clear reaction'
    tone = 'ok'
  }

  return (
    <div className="ms-confluence">
      <div className="ms-quiz-meta">
        <span className="eyebrow">CONFLUENCE BUILDER</span>
        <span className="ms-quiz-progress mono">{score} pts</span>
      </div>
      <h3 className="ms-quiz-prompt">
        A Fib marked the area. What else is there that makes the zone worth trading?
      </h3>
      <p className="lede" style={{ marginTop: 0, marginBottom: 20 }}>
        Tap what you see. Fibonaccis help you find the area. Other evidence decides whether you trade it.
      </p>
      <div className="ms-conf-chips">
        {FACTORS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`ms-conf-chip ${on[f.id] ? 'on' : ''} ${f.weight === 0 ? 'weak' : ''}`}
            onClick={() => setOn((s) => ({ ...s, [f.id]: !s[f.id] }))}
          >
            <span className="mono">{f.weight > 0 ? `+${f.weight}` : '0'}</span>
            {f.label}
          </button>
        ))}
      </div>
      <div className={`ms-conf-meter ${tone}`}>
        <div className="ms-conf-bar" style={{ width: `${picked ? Math.max(pct, 8) : 0}%` }} />
        <p className="mono">{picked ? verdict : 'Select factors to score the zone'}</p>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        style={{ marginTop: 24 }}
        disabled={!picked}
        onClick={() => {
          track('game_completed', { game: 'confluence_builder', score })
          onComplete()
        }}
      >
        {!picked
          ? 'Select at least one factor'
          : score === 0 && on.fib
            ? 'Continue · Fib alone is weak'
            : 'Continue'}
      </button>
      {on.fib && score === 0 ? (
        <p className="ms-aside-hint dim" style={{ marginTop: 14 }}>
          A Fib alone maps the area. Wait for more evidence before you size.
        </p>
      ) : null}
    </div>
  )
}
