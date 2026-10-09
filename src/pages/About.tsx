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
          <div className="eyebrow">About · @tradersveezy</div>
          <h1 className="display" style={{ fontSize: 'clamp(52px, 7.6vw, 118px)', marginTop: 28 }}>
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
            I trade crypto and gold, mostly swings and intraday setups, and I post every trade publicly with the levels
            and the reasoning, before I know the result.
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
            <a href="#mintscript" style={{ color: 'var(--mint)' }}>
              MintScript
            </a>
            — the desk behind selective swing setups and the tools I use every day. You still take every trade.
          </p>
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
          <a href="#coaching" className="btn btn-primary">
            1-on-1 sessions
          </a>
          <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Follow on X
          </a>
        </div>
      </section>
    </main>
  )
}
