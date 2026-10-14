import { useRef, useState } from 'react'
import { toBlob } from 'html-to-image'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { LIVE_COURSES } from '../progress'

type Props = {
  courseN: string
  courseTitle: string
  phrase: string
  nextLabel: string
  nextTo: string
  secondaryLabel?: string
  secondaryTo?: string
  onRestart: () => void
  sharePath: string
}

const REMEMBER = "Don't forget the work you put in. Follow your process."

export function ModuleComplete({
  courseN,
  phrase,
  nextLabel,
  nextTo,
  secondaryLabel = 'Back to desk',
  secondaryTo = '/desk',
  onRestart,
  sharePath,
}: Props) {
  const { user } = useAuth()
  const certRef = useRef<HTMLElement>(null)
  const [linkCopied, setLinkCopied] = useState(false)
  const [imageStatus, setImageStatus] = useState<'idle' | 'working' | 'copied' | 'fail'>('idle')

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Trader'
  const pathTitle = 'Full Interactive Playbook'
  const courseLine = LIVE_COURSES.map((c) => `${c.id} ${c.title}`).join(' · ')

  const shareUrl =
    typeof window !== 'undefined' ? `${window.location.origin}${sharePath}?step=complete` : sharePath

  const shareText = [
    `${displayName} completed the ${pathTitle} on TraderSveezy.`,
    '',
    courseLine,
    '',
    `"${phrase}"`,
    '',
    REMEMBER,
    '',
    shareUrl,
  ].join('\n')

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${pathTitle} complete — TraderSveezy`,
          text: shareText,
          url: shareUrl,
        })
        return
      }
    } catch {
      /* cancelled — fall through */
    }
    try {
      await navigator.clipboard.writeText(shareText)
      setLinkCopied(true)
      window.setTimeout(() => setLinkCopied(false), 2200)
    } catch {
      /* ignore */
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setLinkCopied(true)
      window.setTimeout(() => setLinkCopied(false), 2200)
    } catch {
      /* ignore */
    }
  }

  async function copyImage() {
    const el = certRef.current
    if (!el) return
    setImageStatus('working')
    try {
      const blob = await toBlob(el, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#0B0B0B',
      })
      if (!blob) throw new Error('empty')

      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        setImageStatus('copied')
        window.setTimeout(() => setImageStatus('idle'), 2200)
        return
      }

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'tradersveezy-playbook-complete.png'
      a.click()
      URL.revokeObjectURL(url)
      setImageStatus('copied')
      window.setTimeout(() => setImageStatus('idle'), 2200)
    } catch {
      setImageStatus('fail')
      window.setTimeout(() => setImageStatus('idle'), 2800)
    }
  }

  const dated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const imageLabel =
    imageStatus === 'working'
      ? 'Copying…'
      : imageStatus === 'copied'
        ? 'Copied'
        : imageStatus === 'fail'
          ? 'Try again'
          : 'Copy image'

  return (
    <section className="ms-panel ms-complete-wrap">
      <p className="eyebrow">Path complete</p>
      <h2 className="display ms-h2">
        Congrats,
        <br />
        <span className="gold">{displayName}.</span>
      </h2>
      <p className="lede">
        You cleared the full open playbook — structure through process. This certificate is yours to
        keep and share.
      </p>

      <article
        ref={certRef}
        className="ms-cert"
        aria-label="Interactive playbook completion certificate"
      >
        <div className="ms-cert-frame" aria-hidden>
          <span className="ms-cert-corner tl" />
          <span className="ms-cert-corner tr" />
          <span className="ms-cert-corner bl" />
          <span className="ms-cert-corner br" />
        </div>

        <div className="ms-cert-top">
          <img src="/assets/ts-mark-gold.svg" alt="" width={72} height={72} />
          <div>
            <span className="mono ms-cert-brand">TRADERSVEEZY</span>
            <span className="mono ms-cert-course">COURSES 01–{courseN}</span>
          </div>
        </div>

        <p className="mono ms-cert-stamp">Certificate of completion</p>
        <p className="mono ms-cert-awarded">Awarded to</p>
        <h3 className="display ms-cert-name">{displayName}</h3>
        <p className="mono ms-cert-for">For successfully completing</p>
        <p className="display ms-cert-title">{pathTitle}</p>

        <ul className="ms-cert-path">
          {LIVE_COURSES.map((c) => (
            <li key={c.id}>
              <span className="mono">{c.id}</span>
              <span>{c.title}</span>
            </li>
          ))}
        </ul>

        <div className="ms-cert-rule" aria-hidden />

        <p className="ms-cert-remember">{REMEMBER}</p>

        <blockquote className="ms-cert-quote">
          <p>{phrase}</p>
        </blockquote>

        <div className="ms-cert-foot">
          <span className="mono">{dated}</span>
          <span className="mono">Educational only · Not financial advice</span>
        </div>
      </article>

      <div className="ms-complete-share">
        <button type="button" className="btn btn-primary" onClick={copyImage} disabled={imageStatus === 'working'}>
          {imageLabel}
        </button>
        <button type="button" className="btn btn-ghost" onClick={share}>
          {linkCopied ? 'Copied' : 'Share'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={copyLink}>
          Copy link
        </button>
      </div>

      <div className="ms-done-actions">
        <Link to={nextTo} className="btn btn-primary">
          {nextLabel}
        </Link>
        <Link to={secondaryTo} className="btn btn-ghost">
          {secondaryLabel}
        </Link>
        <button type="button" className="btn btn-ghost" onClick={onRestart}>
          Restart module
        </button>
      </div>
    </section>
  )
}
