import { useState } from 'react'
import { GATE_ITEMS } from './data'

type GateItem = { id: string; label: string }

type Props = {
  onPass: () => void
  items?: readonly GateItem[]
  eyebrow?: string
  title?: string
}

export function StructureGate({
  onPass,
  items = GATE_ITEMS,
  eyebrow = 'STRUCTURE GATE',
  title = 'Pre-trade checklist',
}: Props) {
  const [checks, setChecks] = useState<Record<string, boolean>>({})

  const all = items.every((g) => checks[g.id])

  function toggle(id: string) {
    setChecks((c) => ({ ...c, [id]: !c[id] }))
  }

  return (
    <div className="ms-gate">
      <span className="eyebrow">{eyebrow}</span>
      <h3>{title}</h3>
      <p className="lede">
        Every box must be true before you enter. If one is not, stay flat.
      </p>
      <ul className="ms-gate-list">
        {items.map((g) => (
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
      <button type="button" className="btn btn-primary" disabled={!all} onClick={onPass}>
        {all ? 'Pass the gate' : 'Check every box'}
      </button>
    </div>
  )
}
