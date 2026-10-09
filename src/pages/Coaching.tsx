import { LINKS } from '../data'

const PACKAGES = [
  {
    label: 'Single',
    title: '1 Session',
    price: '$300',
    rate: '$300 / session',
    desc: 'A focused review of your setups, or one problem you keep running into.',
    cta: 'Book 1 session',
    featured: false,
  },
  {
    label: 'Build',
    title: '3 Sessions',
    price: '$750',
    rate: '$250 / session',
    desc: 'Review, fix, then check it held. Enough time to change how you trade.',
    cta: 'Book 3 sessions',
    featured: false,
  },
  {
    label: 'Mentorship',
    title: '5 Sessions',
    price: '$1,000',
    rate: '$200 / session',
    desc: 'The full rebuild: strategy, risk, execution and review, over five sessions.',
    cta: 'Book 5 sessions',
    featured: true,
  },
]

const TOPICS = [
  { n: '01', title: 'Your setups', desc: "What you're seeing, what you're missing, and which ones are worth taking." },
  { n: '02', title: 'Risk & sizing', desc: 'Where the stop goes, how big to size, and what a loss should cost you.' },
  { n: '03', title: 'Entries & exits', desc: "Triggers, retests, DCA levels, and knowing when you're wrong." },
  { n: '04', title: 'Your process', desc: "A checklist and a review habit you can keep using after we're done." },
]

export function Coaching() {
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
            Live, on screen, just you and me. We go through your trades, your charts and your risk, and build a process
            you can repeat without me.
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 20,
            alignItems: 'stretch',
          }}
        >
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.title}
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
              <div
                className="display"
                style={{ fontSize: 34, letterSpacing: '0.04em', marginTop: 18 }}
              >
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
                {pkg.price}
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
              <a href={LINKS.booking} style={{ marginTop: 'auto', display: 'block' }}>
                <span
                  className={pkg.featured ? 'btn btn-primary' : 'btn btn-ghost'}
                  style={{ display: 'block', marginTop: 40, textAlign: 'center', fontSize: 13, padding: pkg.featured ? 19 : 18 }}
                >
                  {pkg.cta}
                </span>
              </a>
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
            { n: '01', title: 'Book a time', desc: 'Pick a package and a slot that works for you.' },
            { n: '02', title: 'Send your trades', desc: 'Recent charts, wins and losses, so we start with real context.' },
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
      </section>
    </main>
  )
}
