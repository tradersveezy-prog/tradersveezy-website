import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { usePlaybookAccess } from '../../auth/usePlaybookAccess'
import { liveProgress } from '../progress'

type Props = {
  courseN: string
  courseTitle: string
  phrase: string
  beats: string[]
  takeaway: string
  nextLabel: string
  nextTo: string
  secondaryLabel?: string
  secondaryTo?: string
  onRestart: () => void
}

export function ModuleSuccess({
  courseN,
  courseTitle,
  phrase,
  beats,
  takeaway,
  nextLabel,
  nextTo,
  secondaryLabel = 'Back to desk',
  secondaryTo = '/desk',
  onRestart,
}: Props) {
  const { user } = useAuth()
  const { access: hasPlaybook, localMode } = usePlaybookAccess()
  const name = user?.displayName || user?.email?.split('@')[0] || 'Trader'
  const { done, total } = liveProgress()
  const showWaitlistUpsell = courseN === '01' && !localMode && !hasPlaybook

  return (
    <section className="ms-panel ms-success-wrap">
      <p className="eyebrow">Gate cleared</p>
      <h2 className="display ms-h2">
        Course {courseN}
        <br />
        <span className="gold">locked in.</span>
      </h2>
      <p className="lede">
        Nice work, {name}. You cleared the checklist for {courseTitle}. Here&apos;s the arc of what you just ran.
      </p>

      <div className="ms-success-card">
        <div className="ms-success-head">
          <span className="mono ms-success-n">Course {courseN}</span>
          <h3 className="display ms-success-title">{courseTitle}</h3>
        </div>

        <ol className="ms-success-beats" aria-label="What you covered">
          {beats.map((beat, i) => (
            <li key={beat}>
              <span className="mono ms-success-beat-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="ms-success-beat-label">{beat}</span>
            </li>
          ))}
        </ol>

        <blockquote className="ms-success-quote">
          <p>{phrase}</p>
        </blockquote>

        <p className="ms-success-takeaway">{takeaway}</p>

        <p className="mono ms-success-progress">
          {done} of {total} open modules cleared
          {done < total ? ' · finish the set for your shareable cert' : ''}
        </p>
      </div>

      {showWaitlistUpsell ? (
        <div className="ms-success-card" style={{ marginTop: 24 }}>
          <p className="eyebrow">Waitlist special</p>
          <h3 className="display" style={{ fontSize: 28, marginTop: 12 }}>
            You named the chart.
            <br />
            <span className="gold">Next is the full stack.</span>
          </h3>
          <p style={{ color: 'var(--soft)', marginTop: 16, lineHeight: 1.5 }}>
            Levels, entries, risk, and process — Courses 02–05. Pay $250 now ($50 off). Course 01 stays yours. Full
            playbook opens soon; interactive modules unlock with payment.
          </p>
          <div className="ms-done-actions" style={{ marginTop: 24 }}>
            <Link to="/courses#waitlist" className="btn btn-primary">
              Waitlist · pay $250
            </Link>
            <Link to={secondaryTo} className="btn btn-ghost">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      ) : (
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
      )}

      {!showWaitlistUpsell ? null : (
        <button type="button" className="btn btn-ghost" style={{ marginTop: 16 }} onClick={onRestart}>
          Restart module
        </button>
      )}

      <p className="ms-foot mono">Educational only · Not financial advice</p>
    </section>
  )
}
