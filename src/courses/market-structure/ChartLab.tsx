import { useState } from 'react'
import type { CallChoice, ChartLab as Lab } from './data'

type Props = {
  lab: Lab
  onComplete: () => void
}

const CALL_LABEL: Record<CallChoice, string> = {
  trade: 'Trade',
  wait: 'Wait',
  skip: 'Skip',
}

export function ChartLab({ lab, onComplete }: Props) {
  const [open, setOpen] = useState<string | null>(null)
  const [seen, setSeen] = useState<Set<string>>(() => new Set())
  const [decision, setDecision] = useState<CallChoice | null>(null)
  const [locked, setLocked] = useState(false)

  const allSeen = seen.size >= lab.hotspots.length
  const matched = decision !== null && decision === lab.correctCall

  function tap(id: string) {
    setOpen((cur) => (cur === id ? null : id))
    setSeen((s) => new Set(s).add(id))
  }

  function lock(choice: CallChoice) {
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
        <div className="ms-chart-frame">
          <img src={lab.src} alt={`${lab.pair} ${lab.tf}`} />
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
              Tap the gold markers on the chart. {seen.size}/{lab.hotspots.length} explored.
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
            <div className="ms-decision-row">
              {(['trade', 'wait', 'skip'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`ms-call ${decision === c ? 'on' : ''}`}
                  disabled={!allSeen || (locked && decision !== c)}
                  onClick={() => lock(c)}
                >
                  {c}
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
                    ? `Correct · ${CALL_LABEL[lab.correctCall]}`
                    : `Not quite · you chose ${CALL_LABEL[decision]}; answer is ${CALL_LABEL[lab.correctCall]}`}
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
                {!matched && (
                  <p className="ms-nudge">
                    Skip means no trade. Wait means the setup is there — hold for the 15-minute
                    signal. Different choices.
                  </p>
                )}
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
