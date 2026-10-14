import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import {
  COACHING_PACKAGES,
  fetchCoachingSessions,
  startCoachingCheckout,
  type CoachingPackageId,
} from '../lib/coaching'
import { supabase, supabaseConfigured } from '../lib/supabase'

const TOPICS = [
  { n: '01', title: 'Your setups', desc: "What you're seeing, what you're missing, and which ones are worth taking." },
  { n: '02', title: 'Risk & sizing', desc: 'Where the stop goes, how big to size, and what a loss should cost you.' },
  { n: '03', title: 'Entries & exits', desc: "Triggers, retests, DCA levels, and knowing when you're wrong." },
  { n: '04', title: 'Your process', desc: "A checklist and a review habit you can keep using after we're done." },
]

export function Coaching() {
  const { user } = useAuth()
  const [params] = useSearchParams()
  const paid = params.get('paid') === '1'
  const [payBusy, setPayBusy] = useState<CoachingPackageId | null>(null)
  const [payError, setPayError] = useState('')
  const [payEmail, setPayEmail] = useState('')
  const [sessions, setSessions] = useState(0)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!user?.id) {
        if (!cancelled) setSessions(0)
        return
      }
      if (supabase) {
        await supabase.rpc('claim_coaching_entitlement')
      }
      const n = await fetchCoachingSessions(user.id)
      if (!cancelled) setSessions(n)
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [user?.id, paid])

  async function onPay(packageId: CoachingPackageId) {
    setPayError('')
    setPayBusy(packageId)
    try {
      const email = (user?.email || payEmail).trim()
      if (!email) throw new Error('Enter your email above the packages first.')
      if (!supabaseConfigured) {
        throw new Error('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env first.')
      }
      const { data: session } = supabase ? await supabase.auth.getSession() : { data: { session: null } }
      const url = await startCoachingCheckout(packageId, email, session.session?.access_token)
      window.location.href = url
    } catch (err) {
      setPayError(err instanceof Error ? err.message : 'Could not start payment.')
      setPayBusy(null)
    }
  }

  return (
    <main>
      <section style={{ position: 'relative', borderBottom: '1px solid rgba(242,241,238,0.08)' }}>
        <div className="glow" style={{ background: 'radial-gradient(circle at 90% 0%, rgba(227,180,74,0.12), transparent 45%)' }} />
        <div
          className="shell"
          style={{
            position: 'relative',
            paddingTop: 'clamp(72px, 10vw, 140px)',
            paddingBottom: 'clamp(56px, 7vw, 90px)',
          }}
        >
          <p className="eyebrow">1-on-1 trading education</p>
          <h1
            className="display"
            style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', letterSpacing: '0.02em', lineHeight: 1.02, marginTop: 28 }}
          >
            Sit at
            <br />
            <span style={{ color: 'var(--gold)' }}>my desk.</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(19px, 1.6vw, 23px)',
              lineHeight: 1.5,
              color: 'var(--soft)',
              maxWidth: '34em',
              margin: '36px 0 0',
            }}
          >
            Live, on screen, just you and me. Pay with crypto, then we book the time. Credits stay on your account.
          </p>
          {paid ? (
            <p style={{ marginTop: 24, color: 'var(--gold)', maxWidth: '34em', lineHeight: 1.45 }}>
              Payment received. When NOWPayments confirms, session credits land on your account. DM{' '}
              <a href="https://x.com/tradersveezy" target="_blank" rel="noreferrer">
                @tradersveezy
              </a>{' '}
              to schedule — or check Account / Desk after a few minutes.
            </p>
          ) : null}
          {sessions > 0 ? (
            <p className="mono" style={{ marginTop: 20, color: 'var(--muted)' }}>
              Session credits on file: {sessions}
            </p>
          ) : null}
        </div>
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(40px, 5vw, 64px)', paddingBottom: 'clamp(24px, 3vw, 40px)' }}
      >
        {!user?.email ? (
          <label style={{ display: 'block', maxWidth: 420 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)' }}>
              EMAIL FOR CREDITS
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
                background: 'var(--panel)',
                border: '1px solid rgba(242,241,238,0.2)',
                color: 'var(--bone)',
                fontFamily: 'var(--font-body)',
                fontSize: 16,
              }}
            />
          </label>
        ) : (
          <p className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
            Credits go to {user.email}
          </p>
        )}
        {payError ? (
          <p style={{ color: 'var(--short)', marginTop: 12 }} role="alert">
            {payError}
          </p>
        ) : null}
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(24px, 3vw, 40px)', paddingBottom: 'clamp(64px, 8vw, 110px)' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 20,
            alignItems: 'stretch',
          }}
        >
          {COACHING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                border: pkg.featured ? '1px solid var(--gold)' : '1px solid rgba(242,241,238,0.14)',
                background: pkg.featured
                  ? 'linear-gradient(180deg, rgba(227,180,74,0.08), #0B0B0B 60%)'
                  : 'var(--panel)',
                padding: '44px 36px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {pkg.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: -1,
                    right: -1,
                    background: 'var(--gold)',
                    color: 'var(--ink)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '9px 14px',
                  }}
                >
                  Best value
                </div>
              )}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: pkg.featured ? 'var(--gold)' : 'var(--muted)',
                }}
              >
                {pkg.label}
              </div>
              <div className="display" style={{ fontSize: 34, letterSpacing: '0.04em', marginTop: 18 }}>
                {pkg.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 64,
                  marginTop: 30,
                  letterSpacing: '-0.02em',
                  color: pkg.featured ? 'var(--gold)' : 'var(--bone)',
                }}
              >
                ${pkg.price.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginTop: 8,
                }}
              >
                {pkg.rate}
              </div>
              <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--soft)', margin: '30px 0 0' }}>{pkg.desc}</p>
              <button
                type="button"
                className={pkg.featured ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: 40,
                  textAlign: 'center',
                  fontSize: 13,
                  padding: pkg.featured ? 19 : 18,
                }}
                disabled={payBusy !== null}
                onClick={() => onPay(pkg.id)}
              >
                {payBusy === pkg.id ? 'Opening checkout…' : pkg.cta}
              </button>
            </div>
          ))}
        </div>
        <p className="mono" style={{ marginTop: 28, fontSize: 12, color: 'var(--muted)' }}>
          Crypto only via NOWPayments · After pay, DM @tradersveezy to book times
        </p>
      </section>

      <section
        style={{
          background: 'var(--panel)',
          borderTop: '1px solid rgba(242,241,238,0.08)',
          borderBottom: '1px solid rgba(242,241,238,0.08)',
        }}
      >
        <div
          className="shell"
          style={{
            paddingTop: 'clamp(72px, 9vw, 120px)',
            paddingBottom: 'clamp(72px, 9vw, 120px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(40px, 6vw, 96px)',
          }}
        >
          <div>
            <div className="eyebrow">In the session</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 68px)', letterSpacing: '0.02em', marginTop: 18 }}>
              What we
              <br />
              work on
            </h2>
          </div>
          <div style={{ borderTop: '1px solid rgba(242,241,238,0.14)' }}>
            {TOPICS.map((t) => (
              <div
                key={t.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px minmax(0, 1fr)',
                  gap: 20,
                  padding: '28px 0',
                  borderBottom: '1px solid rgba(242,241,238,0.14)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--gold)' }}>{t.n}</span>
                <div>
                  <div className="display" style={{ fontSize: 22, letterSpacing: '0.06em' }}>
                    {t.title}
                  </div>
                  <div style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--muted)', marginTop: 8 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(72px, 9vw, 120px)', paddingBottom: 'clamp(72px, 9vw, 120px)' }}
      >
        <div className="eyebrow">How it works</div>
        <div
          style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 2,
            background: 'rgba(242,241,238,0.1)',
            border: '1px solid rgba(242,241,238,0.1)',
          }}
        >
          {[
            { n: '01', title: 'Pay with crypto', desc: 'Pick a package. Credits land on your account when payment confirms.' },
            { n: '02', title: 'Book a time', desc: 'DM @tradersveezy with your package — we pick a slot.' },
            { n: '03', title: 'Go live', desc: 'Screen share, mark up charts together, leave with next steps.' },
          ].map((step) => (
            <div key={step.n} style={{ background: 'var(--ink)', padding: '40px 32px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 44, color: 'var(--gold)' }}>
                {step.n}
              </div>
              <div className="display" style={{ fontSize: 22, letterSpacing: '0.06em', marginTop: 22 }}>
                {step.title}
              </div>
              <div style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--muted)', marginTop: 10 }}>{step.desc}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 40 }}>
          <Link to="/courses#waitlist" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.14em' }}>
            Or lock the playbook waitlist · $250 →
          </Link>
        </p>
      </section>
    </main>
  )
}
