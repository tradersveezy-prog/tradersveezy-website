import { PositionCalculator } from '../components/PositionCalculator'
import { LINKS, OFFERS } from '../data'

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
            <h1
              className="display"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                letterSpacing: '0.04em',
                lineHeight: 1.02,
                marginTop: 28,
              }}
            >
              Trade the plan.
              <br />
              <span style={{ color: 'var(--gold)' }}>Not the feeling.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(18px, 1.4vw, 21px)',
                lineHeight: 1.55,
                color: 'var(--soft)',
                maxWidth: '28em',
                margin: '28px 0 0',
              }}
            >
              Entry, stop, target, and why I&apos;m in — posted before the outcome. I teach the same process: risk first,
              then decide.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
              <a href="#coaching" className="btn btn-primary">
                Learn 1-on-1
              </a>
              <a href={LINKS.discord} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                Join free Discord
              </a>
            </div>
            <a
              href="#mintscript"
              style={{
                display: 'inline-block',
                marginTop: 22,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                borderBottom: '1px solid rgba(169,165,157,0.45)',
                paddingBottom: 4,
              }}
            >
              Or explore MintScript →
            </a>
          </div>

          <div style={{ position: 'relative', maxWidth: 480, justifySelf: 'end', width: '100%' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-14px 14px 14px -14px',
                border: '1px solid rgba(227,180,74,0.35)',
              }}
            />
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                background: 'var(--panel)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'repeating-linear-gradient(0deg,rgba(242,241,238,0.035) 0 1px,transparent 1px 64px),repeating-linear-gradient(90deg,rgba(242,241,238,0.035) 0 1px,transparent 1px 64px)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 50% 45%, rgba(227,180,74,0.18), transparent 55%)',
                }}
              />
              <img
                src="/assets/ts-mark-gold.svg"
                alt="TraderSveezy mark"
                style={{
                  position: 'relative',
                  width: '50%',
                  height: 'auto',
                  filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.55))',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 24,
                  right: 24,
                  bottom: 22,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                <span>Plan · Risk · Execute</span>
                <span style={{ color: 'var(--gold)' }}>Review</span>
              </div>
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
            05 ways in
          </div>
        </div>
        <div style={{ marginTop: 56, borderTop: '1px solid rgba(242,241,238,0.14)' }}>
          {OFFERS.map((o) => {
            const accent = o.accent === 'mint' ? 'var(--mint)' : 'var(--gold)'
            return (
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
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.16em', color: accent }}>
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
                  {o.price} <span style={{ color: accent }}>→</span>
                </span>
              </a>
            )
          })}
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(48px, 6vw, 96px)',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="eyebrow">Try the math</div>
              <h2
                className="display"
                style={{ fontSize: 'clamp(44px, 6.4vw, 96px)', letterSpacing: '0.01em', marginTop: 22, lineHeight: 0.92 }}
              >
                Risk first.
                <br />
                <span style={{ color: 'var(--gold)' }}>Then reward.</span>
              </h2>
              <p
                style={{
                  fontSize: 'clamp(18px, 1.5vw, 21px)',
                  lineHeight: 1.55,
                  color: 'var(--soft)',
                  maxWidth: '28em',
                  margin: '30px 0 0',
                }}
              >
                Before any trade I know three numbers: where I get in, where I&apos;m wrong, and where I take profit. Put
                in yours and see what the trade is actually worth, and how big to size it.
              </p>
              <div
                style={{
                  marginTop: 36,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {['The stop decides the size', 'Under 1 : 2, I usually pass', 'Same risk on every trade'].map((line) => (
                  <div key={line} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <span style={{ width: 8, height: 8, background: 'var(--gold)', flex: 'none' }} />
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <PositionCalculator />
          </div>
        </div>
      </section>

      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--mint-ink)',
          borderBottom: '1px solid rgba(20,230,164,0.18)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 0% 0%, rgba(20,230,164,0.14), transparent 45%)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="shell"
          style={{
            position: 'relative',
            paddingTop: 'clamp(80px, 10vw, 140px)',
            paddingBottom: 'clamp(80px, 10vw, 140px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(48px, 6vw, 96px)',
            alignItems: 'center',
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: 'var(--mint)' }}>
              The desk
            </div>
            <img
              src="/assets/mintscript-logo.png"
              alt="MintScript"
              style={{ height: 'clamp(44px, 5vw, 72px)', width: 'auto', marginTop: 28 }}
            />
            <p
              style={{
                fontSize: 'clamp(19px, 1.6vw, 23px)',
                lineHeight: 1.5,
                color: '#D9DAE0',
                maxWidth: '28em',
                margin: '32px 0 0',
              }}
            >
              Selective swing setups that fill — then move — so you can manage the trade. Market Radar, charts, and a
              paced desk in one place.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 40 }}>
              <a href="#mintscript" className="btn btn-mint">
                Explore MintScript
              </a>
              <a
                href={LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ borderColor: 'rgba(244,244,246,0.28)', color: '#F4F4F6' }}
              >
                Free Discord
              </a>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 1,
              background: 'rgba(244,244,246,0.1)',
              border: '1px solid rgba(244,244,246,0.1)',
            }}
          >
            <div style={{ background: 'var(--mint-ink)', padding: '32px 28px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#A6A8B3',
                }}
              >
                Subs from
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  color: '#F4F4F6',
                  marginTop: 12,
                }}
              >
                $19<span style={{ fontSize: 18, color: '#A6A8B3' }}>/mo</span>
              </div>
            </div>
            <div style={{ background: 'var(--mint-ink)', padding: '32px 28px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#A6A8B3',
                }}
              >
                Flagship
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  color: '#F4F4F6',
                  marginTop: 12,
                }}
              >
                $69<span style={{ fontSize: 18, color: '#A6A8B3' }}>/mo</span>
              </div>
            </div>
            <div style={{ background: 'var(--mint-ink)', padding: '32px 28px', gridColumn: '1 / 3' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--mint)',
                }}
              >
                Subscriber perk
              </div>
              <div
                className="display"
                style={{
                  fontSize: 'clamp(22px, 2.2vw, 30px)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.1,
                  marginTop: 12,
                  color: '#F4F4F6',
                }}
              >
                30-min 1-on-1 workshop with me
              </div>
              <div style={{ fontSize: 17, lineHeight: 1.5, color: '#A6A8B3', marginTop: 10 }}>
                Pro members get a follow-up workshop included.
              </div>
            </div>
          </div>
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
            Start free with Market Radar and charts. Upgrade when you want selective setups already framed for you.
          </p>
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ marginTop: 44, padding: '22px 34px' }}
          >
            Join the Discord
          </a>
        </div>
      </section>
    </main>
  )
}
