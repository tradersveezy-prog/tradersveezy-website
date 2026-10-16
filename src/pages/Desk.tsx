import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { usePlaybookAccess } from '../auth/usePlaybookAccess'
import { COURSES, LINKS } from '../data'
import { track } from '../lib/analytics'
import { fetchCoachingSessions } from '../lib/coaching'
import './desk.css'

const NOTES = [
  {
    slug: 'why-structure-first',
    title: 'Why structure first',
    tag: 'Process',
  },
  {
    slug: 'size-scales-with-confidence',
    title: 'Size scales with confidence',
    tag: 'Risk',
  },
]

export function Desk() {
  const { user, cloud, signOut } = useAuth()
  const { access: hasPlaybook } = usePlaybookAccess()
  const [params] = useSearchParams()
  const paidReturn = params.get('paid') === '1'
  const [coachingSessions, setCoachingSessions] = useState(0)
  const handle = user?.displayName || user?.email?.split('@')[0] || 'trader'

  useEffect(() => {
    if (paidReturn) track('checkout_paid', { product: 'playbook_or_coaching', surface: 'desk' })
  }, [paidReturn])

  useEffect(() => {
    let cancelled = false
    void fetchCoachingSessions(user?.id ?? null).then((n) => {
      if (!cancelled) setCoachingSessions(n)
    })
    return () => {
      cancelled = true
    }
  }, [user?.id, paidReturn])

  return (
    <main className="desk-page">
      <div className="shell desk-shell">
        <header className="desk-top">
          <div>
            <p className="eyebrow">Member desk</p>
            <h1 className="display desk-title">
              Your
              <br />
              <span className="gold">desk.</span>
            </h1>
            <p className="desk-hello">
              {handle}
              {!cloud ? ' · local account' : ''}
              {hasPlaybook ? ' · playbook unlocked' : ''}
              {coachingSessions > 0 ? ` · ${coachingSessions} coaching credit${coachingSessions === 1 ? '' : 's'}` : ''}
            </p>
            {paidReturn ? (
              <p style={{ marginTop: 16, color: 'var(--soft)', maxWidth: '32em', lineHeight: 1.45 }}>
                Payment received — access unlocks when NOWPayments confirms (usually a few minutes).
                Refresh this page, or sign in with the same email you paid with.
              </p>
            ) : null}
          </div>
          <div className="desk-top-actions">
            <Link to="/account?stay=1" className="btn btn-ghost" style={{ fontSize: 12, padding: '12px 18px' }}>
              Account
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ fontSize: 12, padding: '12px 18px' }}
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="desk-section" aria-labelledby="desk-continue">
          <div className="desk-section-head">
            <h2 id="desk-continue">Continue</h2>
            <span className="eyebrow" style={{ margin: 0 }}>
              Live sample
            </span>
          </div>
          <div className="desk-continue">
            <div>
              <span className="eyebrow">Course 05</span>
              <h3>Process &amp; review</h3>
              <p>
                Make it stick — checklist before you trade, a simple log, review after losses, and
                files for Google Sheets.
              </p>
            </div>
            <div className="desk-continue-cta">
              <Link to="/courses/process-review" className="btn btn-primary">
                Open module
              </Link>
              <Link to="/courses#waitlist" className="btn btn-ghost" style={{ fontSize: 12, padding: '14px 18px' }}>
                {hasPlaybook ? 'Playbook' : 'Waitlist · $250'}
              </Link>
            </div>
          </div>
        </section>

        <section className="desk-section" aria-labelledby="desk-playbook">
          <div className="desk-section-head">
            <h2 id="desk-playbook">Playbook</h2>
            <Link to="/courses" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              All courses →
            </Link>
          </div>
          <ul className="desk-course-list">
            {COURSES.map((c) => {
              const href =
                c.n === '01'
                  ? '/courses/market-structure'
                  : c.n === '02'
                    ? '/courses/levels-that-matter'
                    : c.n === '03'
                      ? '/courses/entries-triggers'
                      : c.n === '04'
                        ? '/courses/risk-position-sizing'
                        : c.n === '05'
                          ? '/courses/process-review'
                          : null
              const open = Boolean(href)
              return (
                <li key={c.n}>
                  <span className="desk-course-n">{c.n}</span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{open ? c.desc : `Teaser · ${c.desc}`}</p>
                    {href ? (
                      <p style={{ marginTop: 10 }}>
                        <Link
                          to={href}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 12,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Open interactive →
                        </Link>
                      </p>
                    ) : null}
                  </div>
                  <span className={`desk-status ${open ? 'open' : 'locked'}`}>
                    {open ? 'Open' : 'Coming soon'}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="desk-section" aria-labelledby="desk-next">
          <div className="desk-section-head">
            <h2 id="desk-next">Level up</h2>
            <span className="eyebrow" style={{ margin: 0 }}>
              When you’re ready
            </span>
          </div>
          <div className="desk-upsell">
            <article className="desk-card mint">
              <span className="eyebrow" style={{ color: 'var(--mint)' }}>
                Desk tools
              </span>
              <h3>MintScript</h3>
              <p>
                Setups, pro charts, Mozzie, and a screener that catches volume + EMA flips — plus BTC
                Station and Global Flow.
              </p>
              <span className="price">From $19/mo</span>
              <a href={LINKS.mintscript} className="btn btn-mint" style={{ textAlign: 'center', marginTop: 8 }}>
                Join MintScript
              </a>
            </article>
            <article className="desk-card">
              <span className="eyebrow">Mentor</span>
              <h3>1-on-1</h3>
              <p>
                Live sessions on your charts, your risk, and your process — not a signal dump.
              </p>
              <span className="price">From $300</span>
              <Link to="/coaching" className="btn btn-primary" style={{ textAlign: 'center', marginTop: 8 }}>
                Book a session
              </Link>
            </article>
          </div>
        </section>

        <section className="desk-section" aria-labelledby="desk-notes">
          <div className="desk-section-head">
            <h2 id="desk-notes">Desk notes</h2>
            <Link to="/blog" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              All notes →
            </Link>
          </div>
          <div className="desk-notes">
            {NOTES.map((n) => (
              <Link key={n.slug} to={`/blog/${n.slug}`} className="desk-note">
                <span>{n.tag}</span>
                <strong>{n.title}</strong>
              </Link>
            ))}
          </div>
        </section>

        <p className="desk-foot">Educational only · Not financial advice</p>
      </div>
    </main>
  )
}
