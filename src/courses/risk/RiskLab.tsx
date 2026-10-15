import { useState, type ReactNode } from 'react'
import type { LabCallOption, RiskLabDef } from './data'

type Props = {
  lab: RiskLabDef
  diagram: ReactNode
  onComplete: () => void
}

const DEFAULT_CALLS: LabCallOption[] = [
  { id: 'trade', label: 'Trade' },
  { id: 'wait', label: 'Wait' },
  { id: 'skip', label: 'Skip' },
]

export function RiskLab({ lab, diagram, onComplete }: Props) {
  const calls = lab.calls?.length ? lab.calls : DEFAULT_CALLS
  const labelFor = (id: string) => calls.find((c) => c.id === id)?.label ?? id

  const [open, setOpen] = useState<string | null>(null)
  const [seen, setSeen] = useState<Set<string>>(() => new Set())
  const [decision, setDecision] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)

  const allSeen = seen.size >= lab.hotspots.length
  const matched = decision !== null && decision === lab.correctCall

  function tap(id: string) {
    setOpen((cur) => (cur === id ? null : id))
    setSeen((s) => new Set(s).add(id))
  }

  function lock(choice: string) {
    setDecision(choice)
    setLocked(true)
  }

  const hotspot = lab.hotspots.find((h) => h.id === open)

  return (
    <div className="ms-lab">
      <div className="ms-lab-head">
        <div>
          <span className="eyebrow">{lab.title}</span>
          <h3>
            {lab.pair} <span className="gold">· {lab.tf}</span>
          </h3>
          <p className="lede">{lab.blurb}</p>
        </div>
        <div className="ms-lab-pill mono">{lab.regime}</div>
      </div>

      <div className="ms-chart-stage">
        <div className="ms-chart-frame ms-chart-frame-diagram">
          {diagram}
          {lab.hotspots.map((h, idx) => (
            <button
              key={h.id}
              type="button"
              className={`ms-hotspot ${seen.has(h.id) ? 'seen' : ''} ${open === h.id ? 'active' : ''}`}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              onClick={() => tap(h.id)}
              aria-label={h.title}
            >
              <span className="ms-hotspot-ring" />
              <span className="ms-hotspot-num mono">{idx + 1}</span>
            </button>
          ))}
        </div>

        <aside className="ms-chart-aside">
          {!hotspot && (
            <p className="ms-aside-hint">
              Tap the gold markers. {seen.size}/{lab.hotspots.length} explored.
            </p>
          )}
          {hotspot && (
            <div className="ms-aside-card">
              <span className="eyebrow">{hotspot.title}</span>
              <p>{hotspot.body}</p>
            </div>
          )}

          <div className="ms-decision">
            <span className="eyebrow">YOUR CALL</span>
            <div className={`ms-decision-row${calls.some((c) => c.label.length > 8) ? ' is-wide' : ''}`}>
              {calls.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`ms-call ${decision === c.id ? 'on' : ''}`}
                  disabled={!allSeen || (locked && decision !== c.id)}
                  onClick={() => lock(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            {!allSeen && (
              <p className="ms-aside-hint dim">Explore every marker before you call it.</p>
            )}
            {locked && decision && (
              <div className={`ms-debrief ${matched ? 'ok' : 'no'}`}>
                <p className={`ms-verdict mono ${matched ? 'ok' : 'no'}`}>
                  {matched
                    ? `Correct · ${labelFor(lab.correctCall)}`
                    : `Not quite · you chose ${labelFor(decision)}; answer is ${labelFor(lab.correctCall)}`}
                </p>
                <p>
                  <strong className="mono">STORY</strong> {lab.decision.story}
                </p>
                <p>
                  <strong className="mono">WHY</strong> {lab.decision.why}
                </p>
                <p>
                  <strong className="mono">ACTION</strong> {lab.decision.action}
                </p>
                <button type="button" className="btn btn-primary" onClick={onComplete}>
                  Next
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
