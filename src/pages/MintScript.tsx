import { Link } from 'react-router-dom'
import { MintScreenerDemo } from '../components/MintScreenerDemo'
import { LINKS, MINT_FEATURES, MINT_PLANS } from '../data'

function planHref(key: 'discord' | 'mintscript') {
  return key === 'discord' ? LINKS.discord : LINKS.mintscript
}

export function MintScript() {
  return (
    <main className="mint-page" style={{ background: 'var(--mint-ink)' }}>
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(167,139,250,0.2)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 8% 0%, rgba(47,217,138,0.16), transparent 40%), radial-gradient(circle at 72% 8%, rgba(167,139,250,0.18), transparent 42%), radial-gradient(circle at 92% 60%, rgba(245,166,35,0.1), transparent 35%)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="shell"
          style={{
            position: 'relative',
            paddingTop: 'clamp(72px, 10vw, 140px)',
            paddingBottom: 'clamp(40px, 5vw, 64px)',
          }}
        >
          <p className="eyebrow mint-eyebrow">
            Setups · charts · screener · Mozzie
          </p>
          <img
            src="/assets/mintscript-logo.png"
            alt="MintScript"
            style={{ height: 'clamp(56px, 8vw, 112px)', width: 'auto', maxWidth: '100%', marginTop: 32 }}
          />
          <h1
            className="display"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              letterSpacing: '0.01em',
              marginTop: 40,
              maxWidth: '14em',
              color: '#F4F4F6',
              lineHeight: 0.95,
            }}
          >
            Setups, ready to take.{' '}
            <span className="mint-grad-text">You manage the trade.</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(19px, 1.6vw, 23px)',
              lineHeight: 1.5,
              color: '#D9DAE0',
              maxWidth: '34em',
              margin: '32px 0 0',
            }}
          >
            Trade setups with entry, stop, and targets. Charts with levels and Fibs already marked. A screener that
            finds volume + EMA flips. Plus Mozzie, BTC Station, and Global Flow. Start free in Discord.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 44 }}>
            <a href={LINKS.mintscript} target="_blank" rel="noopener noreferrer" className="btn btn-mint-grad btn-mint-pulse">
              Join MintScript
            </a>
            <a
              href={LINKS.mintscriptPlans}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ borderColor: 'rgba(244,244,246,0.28)', color: '#F4F4F6' }}
            >
              See plans
            </a>
          </div>

          <MintScreenerDemo />
        </div>
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(72px, 9vw, 120px)', paddingBottom: 'clamp(72px, 9vw, 120px)' }}
      >
        <p className="eyebrow mint-eyebrow">
          What is MintScript
        </p>
        <h2 className="visually-hidden">What is MintScript</h2>
        <div
          className="mint-features-grid"
          style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 1,
            background: 'rgba(244,244,246,0.1)',
            border: '1px solid rgba(244,244,246,0.1)',
          }}
        >
          {MINT_FEATURES.map((f) => (
            <div key={f.n} style={{ background: 'var(--mint-ink)', padding: '40px 32px' }}>
              <div className={`mint-feat-n is-${Number(f.n)}`}>
                {f.n}
              </div>
              <h3
                className="display"
                style={{ fontSize: 24, letterSpacing: '0.05em', marginTop: 22, color: '#F4F4F6', marginBottom: 0 }}
              >
                {f.title}
              </h3>
              <div style={{ fontSize: 18, lineHeight: 1.5, color: '#A6A8B3', marginTop: 10 }}>{f.desc}</div>
            </div>
          ))}
            <div
              className="mint-desk-card"
              style={{
                gridColumn: '1 / -1',
                background:
                  'radial-gradient(circle at 70% 30%, rgba(227,180,74,0.12), transparent 55%), radial-gradient(circle at 20% 80%, rgba(20,230,164,0.1), transparent 50%), var(--mint-ink)',
                padding: '48px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                gap: 22,
                minHeight: 200,
              }}
            >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#A6A8B3',
              }}
            >
              Co-branded desk
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
              <img src="/assets/ts-mark-gold.svg" alt="TraderSveezy" style={{ height: 52, width: 'auto' }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 22,
                  color: '#A6A8B3',
                  lineHeight: 1,
                }}
              >
                ×
              </span>
              <img src="/assets/mintscript-logo.png" alt="MintScript" style={{ height: 40, width: 'auto' }} />
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--mint)',
              }}
            >
              TraderSveezy × MintScript
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(244,244,246,0.08)' }}>
        <div
          className="shell"
          style={{ paddingTop: 'clamp(72px, 9vw, 120px)', paddingBottom: 'clamp(40px, 5vw, 64px)' }}
        >
          <div className="eyebrow" style={{ color: 'var(--mint)' }}>
            Pricing
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '0.02em', marginTop: 18, color: '#F4F4F6' }}
          >
            Pick your pace.
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: '#A6A8B3', maxWidth: '36em', margin: '20px 0 0' }}>
            Lower plans are scarce on purpose. Core is the flagship desk most traders run. Cancel anytime.
          </p>
        </div>
        <div
          className="shell"
          style={{
            paddingBottom: 'clamp(72px, 9vw, 120px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 16,
            alignItems: 'stretch',
          }}
        >
          {MINT_PLANS.map((plan) => (
            <div
              key={plan.id}
              style={{
                border: plan.featured ? '1px solid var(--mint)' : '1px solid rgba(244,244,246,0.14)',
                background: plan.featured
                  ? 'linear-gradient(180deg, rgba(20,230,164,0.08), #0B0C10 55%)'
                  : 'var(--mint-ink)',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {plan.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: -1,
                    right: -1,
                    background: 'var(--mint)',
                    color: '#06140F',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '8px 12px',
                  }}
                >
                  Most pick this
                </div>
              )}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: plan.featured ? 'var(--mint)' : '#A6A8B3',
                }}
              >
                {plan.label}
              </div>
              <h3 className="display" style={{ fontSize: 28, letterSpacing: '0.04em', marginTop: 14, color: '#F4F4F6', marginBottom: 0 }}>
                {plan.title}
              </h3>
              <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 48,
                    color: plan.featured ? 'var(--mint)' : '#F4F4F6',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 14,
                    letterSpacing: '0.08em',
                    color: '#A6A8B3',
                  }}
                >
                  {plan.rate}
                </span>
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: '#A6A8B3', margin: '18px 0 0' }}>{plan.tagline}</p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '28px 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {plan.features.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      fontSize: 15,
                      lineHeight: 1.45,
                      color: '#D9DAE0',
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        marginTop: 7,
                        flex: 'none',
                        background: 'var(--mint)',
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={planHref(plan.href)} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', display: 'block' }}>
                <span
                  className={plan.featured || plan.id === 'starter' || plan.id === 'pro' ? 'btn btn-mint-grad' : 'btn btn-ghost'}
                  style={{
                    display: 'block',
                    marginTop: 32,
                    textAlign: 'center',
                    fontSize: 13,
                    padding: 18,
                    ...(plan.id === 'free'
                      ? { borderColor: 'rgba(244,244,246,0.28)', color: '#F4F4F6', background: 'transparent' }
                      : {}),
                  }}
                >
                  {plan.cta}
                </span>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          borderTop: '1px solid rgba(244,244,246,0.08)',
          background: '#08090C',
        }}
      >
        <div
          className="shell"
          style={{
            paddingTop: 'clamp(72px, 9vw, 120px)',
            paddingBottom: 'clamp(72px, 9vw, 120px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: 'var(--mint)' }}>
              On this site
            </div>
            <h2
              className="display"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.02em', marginTop: 18, color: '#F4F4F6' }}
            >
              Coaching teaches the process.
              <br />
              <span style={{ color: 'var(--mint)' }}>MintScript runs the desk.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: '#D9DAE0', margin: 0 }}>
              Coaching teaches the process. MintScript sends the setups between sessions — entry, stop, targets. You still
              take every trade.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/coaching" className="btn btn-ghost" style={{ borderColor: 'rgba(244,244,246,0.28)', color: '#F4F4F6' }}>
                1-on-1 sessions
              </Link>
              <a href={LINKS.mintscript} target="_blank" rel="noopener noreferrer" className="btn btn-mint-grad btn-mint-pulse">
                Open MintScript
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(20,230,164,0.2)', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 120%, rgba(20,230,164,0.14), transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="shell"
          style={{
            position: 'relative',
            paddingTop: 'clamp(80px, 10vw, 140px)',
            paddingBottom: 'clamp(80px, 10vw, 140px)',
            textAlign: 'center',
          }}
        >
          <div className="eyebrow" style={{ color: 'var(--mint)' }}>
            Ready
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(44px, 7vw, 96px)', marginTop: 24, color: '#F4F4F6' }}>
            Sit at the desk.
          </h2>
          <p
            style={{
              fontSize: 'clamp(18px, 1.5vw, 22px)',
              lineHeight: 1.5,
              color: '#D9DAE0',
              maxWidth: '30em',
              margin: '28px auto 0',
            }}
          >
            Join free Discord first. Upgrade for setups, marked-up charts, Mozzie, the screener, BTC Station, and Global
            Flow.
          </p>
          <a
            href={LINKS.mintscript}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-mint-grad btn-mint-pulse"
            style={{ marginTop: 40, padding: '22px 34px' }}
          >
            Join MintScript
          </a>
          <div
            style={{
              marginTop: 28,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#A6A8B3',
            }}
          >
            Educational only · Not financial advice
          </div>
        </div>
      </section>
    </main>
  )
}
