import { useState } from 'react'

export type TipHotspot = {
  id: string
  x: number
  y: number
  title: string
  body: string
}

type Props = {
  src: string
  alt: string
  caption: string
  note?: string
  tips: TipHotspot[]
  /** Extra mentor line after tips — “what I’d add” */
  addOn?: string
}

export function TipFigure({ src, alt, caption, note, tips, addOn }: Props) {
  const [open, setOpen] = useState<string | null>(null)
  const [seen, setSeen] = useState<Set<string>>(() => new Set())

  const tip = tips.find((t) => t.id === open)
  const allSeen = seen.size >= tips.length

  function tap(id: string) {
    setOpen((cur) => (cur === id ? null : id))
    setSeen((s) => new Set(s).add(id))
  }

  return (
    <figure className="ms-figure ms-tip-figure">
      <div className="ms-figure-frame ms-tip-frame">
        <img src={src} alt={alt} loading="lazy" />
        {tips.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            className={`ms-hotspot ${seen.has(t.id) ? 'seen' : ''} ${open === t.id ? 'active' : ''}`}
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
            onClick={() => tap(t.id)}
            aria-label={t.title}
          >
            <span className="ms-hotspot-ring" />
            <span className="ms-hotspot-num mono">{idx + 1}</span>
          </button>
        ))}
      </div>
      <figcaption>
        <span className="mono">{caption}</span>
        {note ? <span className="ms-figure-note">{note}</span> : null}
      </figcaption>

      <div className="ms-tip-panel">
        {!tip && (
          <p className="ms-aside-hint">
            Tap the gold markers. {seen.size}/{tips.length} explored.
          </p>
        )}
        {tip && (
          <div className="ms-aside-card">
            <span className="eyebrow">{tip.title}</span>
            <p>{tip.body}</p>
          </div>
        )}
        {allSeen && addOn ? (
          <div className="ms-tip-addon">
            <span className="mono">ADD THIS</span>
            <p>{addOn}</p>
          </div>
        ) : null}
      </div>
    </figure>
  )
}
