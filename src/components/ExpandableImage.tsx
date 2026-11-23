import { useCallback, useEffect, useId, useState } from 'react'

type Props = {
  src: string
  alt: string
  caption?: string
  className?: string
}

export function ExpandableImage({ src, alt, caption, className = '' }: Props) {
  const [open, setOpen] = useState(false)
  const titleId = useId()

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  return (
    <>
      <figure className={`expandable-image ${className}`.trim()}>
        <button
          type="button"
          className="expandable-image-trigger"
          onClick={() => setOpen(true)}
          aria-label={`Expand chart: ${alt}`}
        >
          <img src={src} alt={alt} />
          <span className="expandable-image-hint mono" aria-hidden>
            Tap to expand
          </span>
        </button>
        {caption ? <figcaption className="mono">{caption}</figcaption> : null}
      </figure>

      {open ? (
        <div
          className="expandable-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={close}
        >
          <p id={titleId} className="visually-hidden">
            {alt}
          </p>
          <button type="button" className="expandable-image-close mono" onClick={close} aria-label="Close">
            Close · Esc
          </button>
          <img
            src={src}
            alt={alt}
            className="expandable-image-full"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  )
}
