import { TradeCard } from '../components/TradeCard'
import { HERO_CARD, LINKS, OFFERS, RECENT_CARDS } from '../data'

export function Home() {
  return (
    <main>
      <section style={{ position: 'relative', borderBottom: '1px solid rgba(242,241,238,0.08)' }}>
        <div className="glow" />
        <div
          className="shell"
          style={{
            position: 'relative',
            paddingTop: 'clamp(72px, 11vw, 150px)',
            paddingBottom: 'clamp(64px, 8vw, 110px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(48px, 6vw, 96px)',
            alignItems: 'center',
          }}
        >
          <div>
            <div className="eyebrow">Trading education · @tradersveezy</div>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 8.4vw, 128px)', marginTop: 28 }}>
              Trade
              <br />
              the plan.
              <br />
              <span style={{ color: 'var(--gold)' }}>
                Not the
                <br />
                feeling.
              </span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(19px, 1.6vw, 23px)',
                lineHeight: 1.5,
                color: 'var(--soft)',
                maxWidth: '30em',
                margin: '36px 0 0',
              }}
            >
              Every trade I take is posted with the entry, the stop, the target and the reason I&apos;m in. I teach the
              same process: know your risk first, then decide if the reward is worth it.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 44 }}>
              <a href="#coaching" className="btn btn-primary">
                Learn 1-on-1
              </a>
              <a href={LINKS.discord} className="btn btn-ghost" target={LINKS.discord.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                Join free Discord
              </a>
            </div>
          </div>
          <div style={{ position: 'relative', maxWidth: 520, justifySelf: 'end', width: '100%' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-14px 14px 14px -14px',
                border: '1px solid rgba(227,180,74,0.35)',
              }}
            />
            <div style={{ position: 'relative', boxShadow: '0 40px 90px rgba(0,0,0,0.6)' }}>
              <TradeCard {...HERO_CARD} eyebrow={HERO_CARD.eyebrow} />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 16,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              <span>Latest card · XAU/USD</span>
              <span style={{ color: 'var(--gold)' }}>{HERO_CARD.rr}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(80px, 10vw, 140px)', paddingBottom: 'clamp(80px, 10vw, 140px)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '0.02em' }}>
            What I offer
          </h2>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            04 ways in
          </div>
        </div>
        <div style={{ marginTop: 56, borderTop: '1px solid rgba(242,241,238,0.14)' }}>
          {OFFERS.map((o) => (
            <a
              key={o.n}
              href={o.href}
              className="offers-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '72px minmax(0, 1.3fr) minmax(0, 1fr) auto',
                gap: 'clamp(16px, 3vw, 40px)',
                alignItems: 'center',
                padding: 'clamp(28px, 3.4vw, 44px) 0',
                borderBottom: '1px solid rgba(242,241,238,0.14)',
                color: 'var(--bone)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.16em', color: 'var(--gold)' }}>
                {o.n}
              </span>
              <span
                className="display"
                style={{ fontSize: 'clamp(24px, 3.2vw, 46px)', letterSpacing: '0.02em', lineHeight: 1 }}
              >
                {o.title}
              </span>
              <span className="offers-desc" style={{ fontSize: 18, lineHeight: 1.45, color: 'var(--muted)' }}>
                {o.desc}
              </span>
              <span
                className="offers-price"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--bone)',
                  whiteSpace: 'nowrap',
                }}
              >
                {o.price} <span style={{ color: 'var(--gold)' }}>→</span>
              </span>
            </a>
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
          style={{ paddingTop: 'clamp(80px, 10vw, 130px)', paddingBottom: 'clamp(80px, 10vw, 130px)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow">On the record</div>
              <h2
                className="display"
                style={{ fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '0.02em', marginTop: 18 }}
              >
                Recent trade cards
              </h2>
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--muted)', maxWidth: '26em', margin: 0 }}>
              Entry, stop, target and reasoning, posted before the outcome. Wins and losses both.
            </p>
          </div>
          <div
            style={{
              marginTop: 56,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: 20,
            }}
          >
            {RECENT_CARDS.map((card) => (
              <TradeCard key={card.pair} {...card} compact />
            ))}
          </div>
        </div>
      </section>

      <section
        className="shell"
        style={{
          paddingTop: 'clamp(80px, 10vw, 130px)',
          paddingBottom: 'clamp(80px, 10vw, 130px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          <img src="/assets/ts-mark-gold.svg" alt="TraderSveezy" style={{ height: 84 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: 'var(--muted)' }}>×</span>
          <img src="/assets/mintscript-logo.png" alt="MintScript" style={{ height: 64 }} />
        </div>
        <div>
          <div className="eyebrow">Collab · MintScript</div>
          <h3
            className="display"
            style={{ fontSize: 'clamp(28px, 3.4vw, 48px)', lineHeight: 1, letterSpacing: '0.02em', marginTop: 18 }}
          >
            30-minute 1-on-1 workshops
          </h3>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--soft)', margin: '20px 0 0', maxWidth: '30em' }}>
            Exclusive to MintScript subscribers. Pro members get a follow-up workshop included.
          </p>
          <a
            href="#collabs"
            style={{
              display: 'inline-block',
              marginTop: 26,
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              borderBottom: '1px solid rgba(227,180,74,0.5)',
              paddingBottom: 6,
            }}
          >
            Pitch a collab →
          </a>
        </div>
      </section>

      <section style={{ position: 'relative', borderTop: '1px solid rgba(227,180,74,0.2)', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 120%, rgba(227,180,74,0.16), transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="shell"
          style={{
            position: 'relative',
            paddingTop: 'clamp(90px, 12vw, 170px)',
            paddingBottom: 'clamp(90px, 12vw, 170px)',
            textAlign: 'center',
          }}
        >
          <div className="eyebrow">Free Discord</div>
          <h2 className="display" style={{ fontSize: 'clamp(52px, 9vw, 150px)', marginTop: 24 }}>
            The desk
            <br />
            is open.
          </h2>
          <p
            style={{
              fontSize: 'clamp(18px, 1.5vw, 22px)',
              lineHeight: 1.5,
              color: 'var(--soft)',
              maxWidth: '32em',
              margin: '32px auto 0',
            }}
          >
            Setups as I take them, plus the Market Radar feeds I watch every day: volume, funding, EMA reclaims and key
            levels.
          </p>
          <a href={LINKS.discord} className="btn btn-primary" style={{ marginTop: 44, padding: '22px 34px' }}>
            Join the Discord
          </a>
        </div>
      </section>
    </main>
  )
}
