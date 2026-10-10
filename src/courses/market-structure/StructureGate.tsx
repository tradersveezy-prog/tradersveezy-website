import { useState } from 'react'
import { GATE_ITEMS } from './data'

type Props = {
  onPass: () => void
}

export function StructureGate({ onPass }: Props) {
  const [checks, setChecks] = useState<Record<string, boolean>>({})

  const all = GATE_ITEMS.every((g) => checks[g.id])

  function toggle(id: string) {
    setChecks((c) => ({ ...c, [id]: !c[id] }))
  }

  return (
    <div className="ms-gate">
      <span className="eyebrow">STRUCTURE GATE</span>
      <h3>Pre-trade checklist</h3>
      <p className="lede">
        Every box must be true — or you stand down. This is the filter before size.
      </p>
      <ul className="ms-gate-list">
        {GATE_ITEMS.map((g) => (
          <li key={g.id}>
            <button
              type="button"
              className={`ms-gate-item ${checks[g.id] ? 'on' : ''}`}
              onClick={() => toggle(g.id)}
              aria-pressed={!!checks[g.id]}
            >
              <span className="ms-gate-box" aria-hidden>
                {checks[g.id] ? '✓' : ''}
              </span>
              <span>{g.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-primary"
        disabled={!all}
        onClick={onPass}
      >
        {all ? 'Pass the gate' : 'Check every box'}
      </button>
    </div>
  )
}
