import { FEEDS, LINKS } from '../data'

export function Tools() {
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
          <p className="eyebrow">Trading tools</p>
          <h1
            className="display"
            style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', letterSpacing: '0.02em', lineHeight: 1.02, marginTop: 28 }}
          >
            Market
            <br />
            <span style={{ color: 'var(--gold)' }}>radar.</span>
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
            The feeds I check before every trade, sent straight to Discord. They don&apos;t tell you what to do. They tell
            you where to look.
          </p>
        </div>
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(64px, 8vw, 110px)', paddingBottom: 'clamp(64px, 8vw, 110px)' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
            gap: 2,
            background: 'rgba(242,241,238,0.1)',
            border: '1px solid rgba(242,241,238,0.1)',
          }}
        >
          {FEEDS.map((f) => (
            <div key={f.ch} style={{ background: 'var(--ink)', padding: '36px 32px 40px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 22, color: 'var(--bone)' }}>
                <span style={{ color: 'var(--gold)' }}>#</span> {f.ch}
              </div>
              <div style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--muted)', marginTop: 14 }}>{f.desc}</div>
            </div>
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
          className="shell"
          style={{
            paddingTop: 'clamp(72px, 9vw, 120px)',
            paddingBottom: 'clamp(72px, 9vw, 120px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 20,
          }}
        >
          <div style={{ border: '1px solid rgba(242,241,238,0.14)', padding: '44px 40px', background: 'var(--ink)' }}>
            <p className="eyebrow" style={{ letterSpacing: '0.22em' }}>
              Template
            </p>
            <h2 className="display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '0.02em', marginTop: 18, lineHeight: 1 }}>
              Strategy checklists
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', margin: '20px 0 0' }}>
              The pre-trade checks I go through before entering: trend, level, trigger, stop, size. If a box isn&apos;t
              ticked, I don&apos;t take the trade.
            </p>
          </div>
          <div style={{ border: '1px solid rgba(242,241,238,0.14)', padding: '44px 40px', background: 'var(--ink)' }}>
            <p className="eyebrow" style={{ letterSpacing: '0.22em' }}>
              Review
            </p>
            <h2 className="display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '0.02em', marginTop: 18, lineHeight: 1 }}>
              Loss log
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', margin: '20px 0 0' }}>
              Losses are where you learn the most. Log them: what the plan was, what happened, and whether you followed
              it.
            </p>
          </div>
        </div>
      </section>

      <section
        className="shell"
        style={{
          paddingTop: 'clamp(72px, 9vw, 120px)',
          paddingBottom: 'clamp(72px, 9vw, 120px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap',
        }}
      >
        <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '0.02em' }}>
          Get the feeds.
        </h2>
        <a href={LINKS.discord} className="btn btn-primary" style={{ padding: '22px 34px' }}>
          Join the Discord
        </a>
      </section>
    </main>
  )
}
