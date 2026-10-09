import { useState, type FormEvent } from 'react'

const OPEN_TO = [
  'Workshops & education',
  'Trading tools & indicators',
  'Co-branded content',
  'Spaces & live streams',
]

export function Collabs() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
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
          <p className="eyebrow">Open to partnerships</p>
          <h1
            className="display"
            style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', letterSpacing: '0.02em', lineHeight: 1.02, marginTop: 28 }}
          >
            Build it
            <br />
            <span style={{ color: 'var(--gold)' }}>together.</span>
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
            Looking for brand partners: co-branded content, workshops, tools, Spaces and live sessions. If it helps
            traders get better, send a request.
          </p>
        </div>
      </section>

      <section
        className="shell"
        style={{
          paddingTop: 'clamp(64px, 8vw, 110px)',
          paddingBottom: 'clamp(64px, 8vw, 110px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(48px, 6vw, 96px)',
          alignItems: 'start',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Current collab
          </div>
          <div
            style={{
              marginTop: 24,
              border: '1px solid rgba(242,241,238,0.14)',
              background: 'var(--panel)',
              padding: '40px 36px',
            }}
          >
            <img src="/assets/mintscript-logo.png" alt="MintScript" style={{ height: 52 }} />
            <div className="display" style={{ fontSize: 28, letterSpacing: '0.03em', marginTop: 28, lineHeight: 1.05 }}>
              30-minute 1-on-1 trading workshops
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', margin: '16px 0 0' }}>
              Exclusive to MintScript subscribers. Pro members get a follow-up workshop included.
            </p>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginTop: 56,
            }}
          >
            Open to
          </div>
          <div style={{ marginTop: 12, borderTop: '1px solid rgba(242,241,238,0.14)' }}>
            {OPEN_TO.map((item) => (
              <div
                key={item}
                className="display"
                style={{
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(242,241,238,0.14)',
                  fontSize: 20,
                  letterSpacing: '0.08em',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            border: '1px solid rgba(227,180,74,0.4)',
            background: 'var(--panel)',
            padding: 'clamp(32px, 4vw, 48px)',
          }}
        >
          {sent ? (
            <div style={{ padding: '40px 0' }}>
              <div className="eyebrow">Request sent</div>
              <div className="display" style={{ fontSize: 40, lineHeight: 1, letterSpacing: '0.02em', marginTop: 18 }}>
                Thanks. I&apos;ll be in touch.
              </div>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', margin: '18px 0 0' }}>
                I read every request myself. Expect a reply on X or by email.
              </p>
              <button type="button" className="btn btn-ghost" style={{ marginTop: 32, fontSize: 13, padding: '16px 24px' }} onClick={() => setSent(false)}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div className="display" style={{ fontSize: 28, letterSpacing: '0.04em' }}>
                Send a request
              </div>
              <label className="field">
                <span>Name</span>
                <input required name="name" />
              </label>
              <label className="field">
                <span>Brand / project</span>
                <input name="brand" />
              </label>
              <label className="field">
                <span>Email or X handle</span>
                <input required name="contact" />
              </label>
              <label className="field">
                <span>Type</span>
                <select name="type" defaultValue="Workshop / education">
                  <option>Workshop / education</option>
                  <option>Tool / indicator</option>
                  <option>Co-branded content</option>
                  <option>Space / live stream</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="field">
                <span>The idea</span>
                <textarea name="idea" rows={5} />
              </label>
              <button type="submit" className="btn btn-primary" style={{ marginTop: 6, border: 'none' }}>
                Send request
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
