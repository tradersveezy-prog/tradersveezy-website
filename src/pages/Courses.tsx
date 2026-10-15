import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { usePlaybookAccess } from '../auth/usePlaybookAccess'
import { COURSES } from '../data'
import { PLAYBOOK_PRICE_USD, startPlaybookCheckout } from '../lib/playbook'
import { supabase, supabaseConfigured } from '../lib/supabase'

const INCLUDES = [
  {
    n: '01',
    title: 'Five interactive modules',
    body: 'Market structure → levels → entries → risk → process. Quizzes, chart picks, and games — not a PDF dump.',
  },
  {
    n: '02',
    title: 'One video per module',
    body: 'Course 01 video is live. The rest film as we go — you already own the waitlist seat at $50 off.',
  },
  {
    n: '03',
    title: 'The same rules I use',
    body: 'Name the condition, mark levels that matter, wait for a trigger, size from risk, review the losses.',
  },
  {
    n: '04',
    title: 'Shareable cert when done',
    body: 'Finish all five live modules and download a cert with your name. Process over vibes.',
  },
]

const OUTCOMES = [
  'Stop guessing “is this a trend or a trap?”',
  'Mark levels you can explain in 15 seconds',
  'Enter on a named trigger — retest, reclaim, or breakout sequence',
  'Place a structure stop and size from dollar risk',
  'Keep a simple checklist and review loop',
]

export function Courses() {
  const { user } = useAuth()
  const { access: hasPlaybook } = usePlaybookAccess()
  const [payBusy, setPayBusy] = useState(false)
  const [payError, setPayError] = useState('')
  const [payEmail, setPayEmail] = useState('')

  async function onPayCrypto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPayError('')
    setPayBusy(true)
    try {
      const email = (user?.email || payEmail).trim()
      if (!email) throw new Error('Enter the email for your access.')
      if (!supabaseConfigured) {
        throw new Error('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env first.')
      }
      const { data: session } = supabase ? await supabase.auth.getSession() : { data: { session: null } }
      const url = await startPlaybookCheckout(email, session.session?.access_token)
      window.location.href = url
    } catch (err) {
      setPayError(err instanceof Error ? err.message : 'Could not start payment.')
      setPayBusy(false)
    }
  }

  const payForm = (
    <form onSubmit={onPayCrypto} style={{ marginTop: 28 }}>
      {!user?.email ? (
        <label style={{ display: 'block', marginBottom: 12 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)' }}>
            EMAIL FOR ACCESS
          </span>
          <input
            type="email"
            required
            value={payEmail}
            onChange={(ev) => setPayEmail(ev.target.value)}
            placeholder="you@email.com"
            style={{
              display: 'block',
              width: '100%',
              marginTop: 8,
              padding: '14px 16px',
              boxSizing: 'border-box',
              background: 'var(--ink)',
              border: '1px solid rgba(242,241,238,0.2)',
              color: 'var(--bone)',
              fontFamily: 'var(--font-body)',
              fontSize: 16,
            }}
          />
        </label>
      ) : (
        <p className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
          Access email: {user.email}
        </p>
      )}
      {payError ? <p style={{ color: 'var(--short)', fontSize: 14, marginBottom: 12 }}>{payError}</p> : null}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={payBusy}
        style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: 13, padding: 19 }}
      >
        {payBusy ? 'Opening checkout…' : `Pay with crypto · $${PLAYBOOK_PRICE_USD}`}
      </button>
      <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 12, lineHeight: 1.4 }}>
        One payment · Crypto only (NOWPayments) · Educational only · Not financial advice
      </p>
    </form>
  )

  return (
    <main>
      <section style={{ position: 'relative', borderBottom: '1px solid rgba(242,241,238,0.08)' }}>
        <div className="glow" style={{ background: 'radial-gradient(circle at 90% 0%, rgba(227,180,74,0.12), transparent 45%)' }} />
        <div
          className="shell courses-hero"
          style={{
            position: 'relative',
            paddingTop: 'clamp(72px, 10vw, 140px)',
            paddingBottom: 'clamp(56px, 7vw, 90px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(260px, 380px)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p className="eyebrow">Crypto day trading playbook · Waitlist</p>
            <h1
              className="display"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 80px)',
                letterSpacing: '0.02em',
                lineHeight: 1.02,
                marginTop: 28,
              }}
            >
              Learn to trade
              <br />
              <span style={{ color: 'var(--gold)' }}>the plan.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(18px, 1.4vw, 21px)',
                lineHeight: 1.5,
                color: 'var(--soft)',
                maxWidth: '32em',
                margin: '28px 0 0',
              }}
            >
              An interactive course stack for crypto (and gold) day traders who want a repeatable process — not tip
              spam. You learn how I read structure, mark levels, take entries, size risk, and review losses.
            </p>
            <ul
              style={{
                margin: '28px 0 0',
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                maxWidth: '34em',
              }}
            >
              {[
                '5 modules · written lessons + quizzes + chart labs',
                'Course 01 (Market Structure) open today with an account',
                'Pay $250 now ($50 off $300) — unlock 02–05 + cert path',
                'Module videos roll out as filmed · interactive is live',
              ].map((line) => (
                <li
                  key={line}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '12px 1fr',
                    gap: 12,
                    fontSize: 16,
                    lineHeight: 1.45,
                    color: 'var(--bone)',
                  }}
                >
                  <span style={{ color: 'var(--gold)', marginTop: 2 }}>▸</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p style={{ margin: '32px 0 0', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link to="/courses/market-structure" className="btn btn-primary" style={{ fontSize: 13, padding: '16px 24px' }}>
                Try Course 01 free
              </Link>
              <a href="#waitlist" className="btn btn-ghost" style={{ fontSize: 13, padding: '16px 24px' }}>
                Unlock full playbook · $250
              </a>
            </p>
          </div>
          <aside
            id="buy"
            aria-label="Waitlist special pricing"
            style={{
              border: '1px solid var(--gold)',
              padding: '40px 36px',
              background: 'linear-gradient(180deg, rgba(227,180,74,0.08), #0B0B0B 70%)',
              justifySelf: 'end',
              width: '100%',
              maxWidth: 380,
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Waitlist special
            </div>
            <div
              style={{
                marginTop: 14,
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 36,
                  color: 'var(--muted)',
                  letterSpacing: '-0.02em',
                  textDecoration: 'line-through',
                  textDecorationThickness: 2,
                }}
              >
                $300
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 76,
                  color: 'var(--gold)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                $250
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginTop: 10,
              }}
            >
              $50 off · Full 5-course playbook
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--soft)', margin: '18px 0 0' }}>
              Pay now. Start Course 01 today. Courses 02–05 unlock with payment. Videos keep shipping.
            </p>
            <div
              style={{
                marginTop: 20,
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                background: 'var(--gold)',
                padding: '8px 14px',
              }}
            >
              {hasPlaybook ? 'Unlocked' : 'Pay now'}
            </div>
            {hasPlaybook ? (
              <Link
                to="/desk"
                className="btn btn-primary"
                style={{ display: 'block', marginTop: 28, textAlign: 'center', fontSize: 13, padding: 19 }}
              >
                Open desk
              </Link>
            ) : (
              payForm
            )}
          </aside>
        </div>
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(56px, 7vw, 88px)', paddingBottom: 'clamp(40px, 5vw, 64px)' }}
        aria-labelledby="what-you-get"
      >
        <p className="eyebrow">What this is</p>
        <h2
          id="what-you-get"
          className="display"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '0.02em', marginTop: 16, lineHeight: 1.05 }}
        >
          A process you can
          <br />
          <span style={{ color: 'var(--gold)' }}>run without me.</span>
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', maxWidth: '36em', margin: '20px 0 0' }}>
          Most traders skip straight to entries. This playbook forces the order: name what the market is doing, mark
          the level, wait for the trigger, own the risk, then review. Same language as the desk.
        </p>
        <div
          style={{
            marginTop: 40,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 16,
          }}
        >
          {INCLUDES.map((item) => (
            <article
              key={item.n}
              style={{
                border: '1px solid rgba(242,241,238,0.12)',
                background: 'var(--panel)',
                padding: '28px 24px',
              }}
            >
              <span className="mono" style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.14em' }}>
                {item.n}
              </span>
              <h3 className="display" style={{ fontSize: 22, marginTop: 14, letterSpacing: '0.04em' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--soft)', margin: '12px 0 0' }}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        style={{
          background: 'var(--panel)',
          borderTop: '1px solid rgba(242,241,238,0.08)',
          borderBottom: '1px solid rgba(242,241,238,0.08)',
        }}
      >
        <div
          className="shell courses-outcomes"
          style={{
            paddingTop: 'clamp(56px, 7vw, 88px)',
            paddingBottom: 'clamp(56px, 7vw, 88px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
            gap: 'clamp(32px, 5vw, 72px)',
            alignItems: 'start',
          }}
        >
          <div>
            <p className="eyebrow">After the playbook</p>
            <h2 className="display" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginTop: 14, lineHeight: 1.08 }}>
              What you should
              <br />
              <span style={{ color: 'var(--gold)' }}>be able to do.</span>
            </h2>
          </div>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', borderTop: '1px solid rgba(242,241,238,0.14)' }}>
            {OUTCOMES.map((line, i) => (
              <li
                key={line}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr',
                  gap: 16,
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(242,241,238,0.14)',
                  fontSize: 18,
                  lineHeight: 1.45,
                  color: 'var(--bone)',
                }}
              >
                <span className="mono" style={{ color: 'var(--gold)', fontSize: 13 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(64px, 8vw, 110px)', paddingBottom: 'clamp(40px, 5vw, 64px)' }}
        aria-labelledby="courses-list-heading"
      >
        <p className="eyebrow">Curriculum</p>
        <h2
          id="courses-list-heading"
          className="display"
          style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginTop: 14, marginBottom: 8 }}
        >
          Five modules.
        </h2>
        <p style={{ fontSize: 17, color: 'var(--soft)', margin: '0 0 28px', maxWidth: '34em' }}>
          Course 01 is free with an account. 02–05 open with the waitlist payment.
        </p>
        <div style={{ borderTop: '1px solid rgba(242,241,238,0.14)' }}>
          {COURSES.map((c) => (
            <article
              key={c.n}
              className="course-row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(80px, 140px) minmax(0, 1.2fr) minmax(0, 1fr)',
                gap: 'clamp(16px, 3vw, 48px)',
                alignItems: 'baseline',
                padding: 'clamp(32px, 4vw, 52px) 0',
                borderBottom: '1px solid rgba(242,241,238,0.14)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}
              >
                {c.n}
              </span>
              <div>
                <h3 className="display" style={{ fontSize: 'clamp(26px, 3vw, 42px)', letterSpacing: '0.02em', lineHeight: 1, margin: 0 }}>
                  {c.title}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginTop: 14,
                  }}
                >
                  {c.tag}
                  {c.n === '01' ? ' · Free with account' : hasPlaybook ? ' · Unlocked' : ' · Waitlist unlock'}
                </div>
                {['01', '02', '03', '04', '05'].includes(c.n) ? (
                  <p style={{ margin: '18px 0 0' }}>
                    <Link
                      to={
                        c.n === '01'
                          ? '/courses/market-structure'
                          : c.n === '02'
                            ? '/courses/levels-that-matter'
                            : c.n === '03'
                              ? '/courses/entries-triggers'
                              : c.n === '04'
                                ? '/courses/risk-position-sizing'
                                : '/courses/process-review'
                      }
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 13,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {c.n === '01' ? 'Open Course 01 →' : hasPlaybook ? 'Open module →' : 'Unlock with waitlist →'}
                    </Link>
                  </p>
                ) : null}
              </div>
              <div className="course-desc" style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)' }}>
                {c.desc}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="waitlist"
        style={{
          background: 'var(--panel)',
          borderTop: '1px solid rgba(242,241,238,0.08)',
          borderBottom: '1px solid rgba(242,241,238,0.08)',
        }}
        aria-labelledby="waitlist-heading"
      >
        <div
          className="shell waitlist-grid"
          style={{
            paddingTop: 'clamp(56px, 8vw, 96px)',
            paddingBottom: 'clamp(64px, 9vw, 110px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 420px)',
            gap: 'clamp(36px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          <div>
            <p className="eyebrow">Waitlist = pay now</p>
            <h2
              id="waitlist-heading"
              className="display"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.02em', lineHeight: 1.05, marginTop: 20 }}
            >
              Lock the price.
              <br />
              <span style={{ color: 'var(--gold)' }}>Start today.</span>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', maxWidth: '28em', margin: '22px 0 0' }}>
              List is $300. Waitlist is $250 if you pay in crypto now. You get Course 01 immediately. Payment unlocks
              Courses 02–05 and the cert path. Remaining module videos ship as they&apos;re filmed — you&apos;re already
              in at the special.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--muted)', margin: '28px 0 0', maxWidth: '30em' }}>
              Prefer live help on your trades? <Link to="/coaching">1-on-1 sessions</Link> (crypto too).
            </p>
          </div>

          <div
            className="waitlist-card is-focused"
            style={{
              background: 'linear-gradient(180deg, rgba(227,180,74,0.06), #0B0B0B 70%)',
              padding: 'clamp(28px, 3vw, 36px)',
            }}
          >
            {hasPlaybook ? (
              <div>
                <p className="eyebrow">You&apos;re in</p>
                <h3 className="display" style={{ fontSize: 28, letterSpacing: '0.03em', marginTop: 16, lineHeight: 1.1 }}>
                  Playbook unlocked.
                </h3>
                <Link to="/desk" className="btn btn-primary" style={{ marginTop: 28, display: 'inline-block' }}>
                  Open desk
                </Link>
              </div>
            ) : (
              <>
                <p className="eyebrow">Crypto checkout</p>
                <h3 className="display" style={{ fontSize: 26, letterSpacing: '0.03em', marginTop: 12, lineHeight: 1.15 }}>
                  Full playbook · $250
                </h3>
                <p style={{ fontSize: 15, color: 'var(--soft)', marginTop: 10, lineHeight: 1.45 }}>
                  Structure · levels · entries · risk · process
                </p>
                {payForm}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
