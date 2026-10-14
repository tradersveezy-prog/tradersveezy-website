import type { ReactNode } from 'react'

type Props = {
  alt: string
  caption: string
  note?: string
  /** External asset (png/svg under public/). Prefer `diagram` for reliability. */
  src?: string
  /** Inline React chart — bundled, never 404s */
  diagram?: ReactNode
}

export function TeachFigure({ src, diagram, alt, caption, note }: Props) {
  return (
    <figure className="ms-figure">
      <div className="ms-figure-frame">
        {diagram ? (
          <div className="ms-figure-diagram" role="img" aria-label={alt}>
            {diagram}
          </div>
        ) : src ? (
          <img src={src} alt={alt} loading="lazy" />
        ) : null}
      </div>
      <figcaption>
        <span className="mono">{caption}</span>
        {note ? <span className="ms-figure-note">{note}</span> : null}
      </figcaption>
    </figure>
  )
}
