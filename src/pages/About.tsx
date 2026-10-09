import { Link } from 'react-router-dom'
import { LINKS } from '../data'

export function About() {
  return (
    <main>
      <section
        className="shell"
        style={{
          paddingTop: 'clamp(72px, 10vw, 140px)',
          paddingBottom: 'clamp(72px, 10vw, 140px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(48px, 7vw, 110px)',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', maxWidth: 520, width: '100%' }}>
          <div
            style={{
              position: 'absolute',
              inset: '18px -18px -18px 18px',
              border: '1px solid rgba(227,180,74,0.4)',
            }}
          />
          <img
            src="/assets/sveezy-portrait.jpg"
            alt="TraderSveezy"
            style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
          />
        </div>
        <div>
          <p className="eyebrow">About · @tradersveezy</p>
          <h1
            className="display"
            style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', letterSpacing: '0.02em', lineHeight: 1.02, marginTop: 28 }}
          >
            Mentor,
            <br />
            <span style={{ color: 'var(--gold)' }}>not guru.</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(19px, 1.5vw, 22px)',
              lineHeight: 1.6,
              color: 'var(--soft)',
              margin: '36px 0 0',
            }}
          >
            I&apos;m a day trader. Crypto and gold, mostly intraday — with the occasional swing when the structure is
            clean. Every trade I take is posted with the levels and the reasoning, before I know the result.
          </p>
          <p
            style={{
              fontSize: 'clamp(19px, 1.5vw, 22px)',
              lineHeight: 1.6,
              color: 'var(--soft)',
              margin: '20px 0 0',
            }}
          >
            I don&apos;t promise returns. I teach the process: read the structure, define the risk, take the trade or
            skip it, then review it honestly.
          </p>
          <p
            style={{
              fontSize: 'clamp(19px, 1.5vw, 22px)',
              lineHeight: 1.6,
              color: 'var(--soft)',
              margin: '20px 0 0',
            }}
          >
            I also built{' '}
            <Link to="/mintscript" style={{ color: 'var(--mint)' }}>
              MintScript
            </Link>
            — the desk behind selective setups and the tools I use every day. You still take every trade.
          </p>
        </div>
      </section>

      <section
        style={{
          borderTop: '1px solid rgba(227,180,74,0.22)',
          borderBottom: '1px solid rgba(242,241,238,0.08)',
          background: 'linear-gradient(180deg, rgba(227,180,74,0.06), transparent 40%), var(--ink)',
        }}
      >
        <div
          className="shell"
          style={{ paddingTop: 'clamp(72px, 9vw, 120px)', paddingBottom: 'clamp(72px, 9vw, 120px)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow">Credentials</div>
              <h2
                className="display"
                style={{ fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '0.02em', marginTop: 18 }}
              >
                Where I&apos;ve
                <br />
                <span style={{ color: 'var(--gold)' }}>sat the desk.</span>
              </h2>
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--muted)', maxWidth: '26em', margin: 0 }}>
              Before TraderSveezy, I worked as an analyst inside trading academies and private groups — sharing setups,
              levels, and the reasoning behind them.
            </p>
          </div>

          <div style={{ marginTop: 56, borderTop: '1px solid rgba(242,241,238,0.14)' }}>
            {[
              {
                n: '01',
                org: 'Unity Academy',
                role: 'Leading Analyst',
                desc: 'Former leading analyst — market reads, education, and high-signal setup work for the desk.',
              },
              {
                n: '02',
                org: 'CB Trading Academy',
                role: 'Trading Analyst',
                desc: 'Analyst covering ideas, structure, and process for traders building consistency.',
              },
              {
                n: '03',
                org: 'Wealth Group',
                role: 'Ideas & Setups',
                desc: 'Shared live ideas and setups with the group — entry, risk, and the why, not just the call.',
              },
            ].map((item) => (
              <div
                key={item.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px minmax(0, 1.1fr) minmax(0, 1.4fr)',
                  gap: 'clamp(16px, 3vw, 40px)',
                  alignItems: 'baseline',
                  padding: 'clamp(28px, 3.4vw, 44px) 0',
                  borderBottom: '1px solid rgba(242,241,238,0.14)',
                }}
                className="about-cred-row"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 14,
                    letterSpacing: '0.16em',
                    color: 'var(--gold)',
                  }}
                >
                  {item.n}
                </span>
                <div>
                  <div
                    className="display"
                    style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '0.02em', lineHeight: 1 }}
                  >
                    {item.org}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      display: 'inline-block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      background: 'var(--gold)',
                      padding: '8px 12px',
                    }}
                  >
                    {item.role}
                  </div>
                </div>
                <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
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
          style={{ paddingTop: 'clamp(72px, 9vw, 120px)', paddingBottom: 'clamp(72px, 9vw, 120px)' }}
        >
          <div className="eyebrow">How I trade</div>
          <div
            style={{
              marginTop: 36,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(32px, 4vw, 56px)',
            }}
          >
            {[
              {
                title: 'Risk first',
                desc: "Every trade starts with the stop. If I can't define where I'm wrong, I'm not in.",
                gold: true,
              },
              {
                title: 'Post the losses',
                desc: "Wins and losses get the same card. Only showing the wins isn't honest.",
                gold: false,
              },
              {
                title: 'No promises',
                desc: 'Nobody knows what the market will do next. What you control is your process.',
                gold: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  borderTop: `1px solid ${item.gold ? 'var(--gold)' : 'rgba(242,241,238,0.3)'}`,
                  paddingTop: 28,
                }}
              >
                <div
                  className="display"
                  style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', letterSpacing: '0.02em', lineHeight: 1 }}
                >
                  {item.title}
                </div>
                <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--muted)', margin: '16px 0 0' }}>{item.desc}</p>
              </div>
            ))}
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
          Learn with me.
        </h2>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link to="/coaching" className="btn btn-primary">
            1-on-1 sessions
          </Link>
          <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Follow on X
          </a>
        </div>
      </section>
    </main>
  )
}
