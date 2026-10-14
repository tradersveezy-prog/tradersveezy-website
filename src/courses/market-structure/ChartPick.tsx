import { useState, type ReactNode } from 'react'

export type ChartPickOption = {
  id: string
  /** Position on the diagram, percent */
  x: number
  y: number
  label: string
}

type Props = {
  prompt: string
  diagram: ReactNode
  options: ChartPickOption[]
  correctId: string
  explainOk: string
  explainNo: string
}

export function ChartPick({ prompt, diagram, options, correctId, explainOk, explainNo }: Props) {
  const [picked, setPicked] = useState<string | null>(null)
  const locked = picked !== null
  const ok = picked === correctId

  return (
    <div className="ms-pick">
      <p className="ms-pick-prompt">{prompt}</p>
      <div className="ms-chart-frame ms-chart-frame-diagram ms-pick-frame">
        {diagram}
        {options.map((o, idx) => {
          const state =
            !locked ? '' : o.id === correctId ? 'ok' : picked === o.id ? 'miss' : 'dim'
          return (
            <button
              key={o.id}
              type="button"
              className={`ms-pick-spot ${state}`}
              style={{ left: `${o.x}%`, top: `${o.y}%` }}
              disabled={locked}
              onClick={() => setPicked(o.id)}
              aria-label={o.label}
            >
              <span className="ms-pick-ring" />
              <span className="mono ms-pick-num">{idx + 1}</span>
              <span className="ms-pick-label">{o.label}</span>
            </button>
          )
        })}
      </div>
      {!locked ? (
        <p className="ms-aside-hint">Tap one of the gold markers.</p>
      ) : (
        <div className={`ms-pick-feedback ${ok ? 'ok' : 'no'}`}>
          <p className="mono">{ok ? 'Nice' : 'Not that one'}</p>
          <p>{ok ? explainOk : explainNo}</p>
        </div>
      )}
    </div>
  )
}
