import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { COURSES, LINKS } from '../data'

export function Courses() {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onWaitlist(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()

    try {
      const inbox = LINKS.courseWaitlistEmail
      if (inbox) {
        const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: name || 'Waitlist',
            email,
            _subject: 'TraderSveezy playbook waitlist',
            _template: 'table',
            message: `${name || 'Someone'} joined the playbook waitlist (${email}).`,
          }),
        })
        if (!res.ok) throw new Error('submit failed')
      } else {
        const key = 'ts-playbook-waitlist'
        const prev = JSON.parse(localStorage.getItem(key) || '[]') as unknown[]
        prev.push({ name, email, at: new Date().toISOString() })
        localStorage.setItem(key, JSON.stringify(prev))
      }
      e.currentTarget.reset()
      setSent(true)
    } catch {
      setError("Couldn't join just now. Try again, or DM @tradersveezy on X.")
    } finally {
      setBusy(false)
    }
  }

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
            <p className="eyebrow">Playbook · Coming soon</p>
            <h1
              className="display"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 80px)',
                letterSpacing: '0.02em',
                lineHeight: 1.02,
                marginTop: 28,
              }}
            >
              The full
              <br />
              <span style={{ color: 'var(--gold)' }}>playbook.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(18px, 1.4vw, 21px)',
                lineHeight: 1.5,
                color: 'var(--soft)',
                maxWidth: '28em',
                margin: '28px 0 0',
              }}
            >
              Five courses from market structure to trade review — filmed and written when it&apos;s ready to deliver.
              Join the waitlist and I&apos;ll tell you when the bundle opens.
            </p>
          </div>
          <aside
            aria-label="Course bundle — coming soon"
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
              All 5 courses
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: 76,
                color: 'var(--gold)',
                marginTop: 14,
                letterSpacing: '-0.02em',
              }}
            >
              $300
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginTop: 6,
              }}
            >
              One payment · Bundle
            </div>
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
              Coming soon
            </div>
            <a
              href="#waitlist"
              className="btn btn-ghost"
              style={{ display: 'block', marginTop: 28, textAlign: 'center', fontSize: 13, padding: 19 }}
            >
              Join the waitlist
            </a>
          </aside>
        </div>
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(64px, 8vw, 110px)', paddingBottom: 'clamp(40px, 5vw, 64px)' }}
        aria-labelledby="courses-list-heading"
      >
        <h2 id="courses-list-heading" className="visually-hidden">
          Course list
        </h2>
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
                </div>
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
            <p className="eyebrow">Waitlist</p>
            <h2
              id="waitlist-heading"
              className="display"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.02em', lineHeight: 1.05, marginTop: 20 }}
            >
              Get told when
              <br />
              <span style={{ color: 'var(--gold)' }}>it opens.</span>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', maxWidth: '28em', margin: '22px 0 0' }}>
              No drip spam. One note when the $300 bundle is ready — then you decide.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--muted)', margin: '28px 0 0', maxWidth: '30em' }}>
              Want structure on your trades before then?{' '}
              <Link to="/coaching">Book a 1-on-1</Link>.
            </p>
          </div>

          <div
            style={{
              border: '1px solid rgba(227,180,74,0.45)',
              background: 'linear-gradient(180deg, rgba(227,180,74,0.06), #0B0B0B 70%)',
              padding: 'clamp(28px, 3vw, 36px)',
            }}
          >
            {sent ? (
              <div>
                <p className="eyebrow">You&apos;re on the list</p>
                <h3 className="display" style={{ fontSize: 28, letterSpacing: '0.03em', marginTop: 16, lineHeight: 1.1 }}>
                  I&apos;ll ping you at launch.
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--soft)', margin: '16px 0 0' }}>
                  Educational only · Not financial advice.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ marginTop: 28, fontSize: 13, padding: '14px 22px' }}
                  onClick={() => setSent(false)}
                >
                  Add another email
                </button>
              </div>
            ) : (
              <form onSubmit={onWaitlist} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <label className="field">
                  <span>Name</span>
                  <input name="name" autoComplete="name" placeholder="Optional" />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input required type="email" name="email" autoComplete="email" placeholder="you@email.com" />
                </label>
                {error ? (
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: 'var(--short)' }} role="alert">
                    {error}
                  </p>
                ) : null}
                <button type="submit" className="btn btn-primary" style={{ marginTop: 4, border: 'none' }} disabled={busy}>
                  {busy ? 'Joining…' : 'Join waitlist'}
                </button>
                <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--muted)' }}>
                  Educational only · Not financial advice
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
