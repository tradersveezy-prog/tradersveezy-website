import { useState, type FormEvent } from 'react'

const FIT = [
  {
    title: 'Exchanges',
    desc: 'Referral programmes, onboarding campaigns, and desk-native coverage for traders who already size risk.',
  },
  {
    title: 'Crypto projects',
    desc: 'Launches, listings, and product stories told to an audience that reads charts — not hype threads.',
  },
  {
    title: 'Trading platforms & tools',
    desc: 'Integrations, co-branded education, and features that help traders execute a cleaner process.',
  },
  {
    title: 'Sponsored content & Spaces',
    desc: 'X posts, Spaces, walkthroughs, and co-branded sessions that stay on-brand and educational.',
  },
]

const WHY = [
  {
    n: '01',
    title: 'An audience that trades',
    desc: 'Day traders in crypto and gold who follow levels, risk, and process — not empty signal spam.',
  },
  {
    n: '02',
    title: 'Public track of ideas',
    desc: 'Setups posted with entry, stop, target and reasoning — so partners see how the desk actually communicates.',
  },
  {
    n: '03',
    title: 'Desk + academy background',
    desc: 'Former Unity Academy leading analyst, CB Trading Academy analyst, and Wealth Group contributor.',
  },
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
          <p className="eyebrow">Partnerships · Exchanges · Projects</p>
          <h1
            className="display"
            style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', letterSpacing: '0.02em', lineHeight: 1.02, marginTop: 28 }}
          >
            Put your product
            <br />
            <span style={{ color: 'var(--gold)' }}>in front of traders.</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(19px, 1.6vw, 23px)',
              lineHeight: 1.5,
              color: 'var(--soft)',
              maxWidth: '36em',
              margin: '36px 0 0',
            }}
          >
            Open to exchanges, projects, and platforms that want honest coverage with my audience — referral links,
            launches, sponsored education, and co-branded sessions that still sound like the desk.
          </p>
          <p
            style={{
              fontSize: 'clamp(18px, 1.5vw, 21px)',
              lineHeight: 1.55,
              color: 'var(--gold)',
              maxWidth: '34em',
              margin: '24px 0 0',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}
          >
            I only take on quality projects I can stand behind. If I wouldn&apos;t use it or recommend it myself, it
            doesn&apos;t go on the desk.
          </p>
        </div>
      </section>

      <section
        style={{
          background: 'var(--panel)',
          borderBottom: '1px solid rgba(242,241,238,0.08)',
        }}
      >
        <div
          className="shell"
          style={{ paddingTop: 'clamp(64px, 8vw, 110px)', paddingBottom: 'clamp(64px, 8vw, 110px)' }}
        >
          <p className="eyebrow">The bar</p>
          <h2
            className="display"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.02em', marginTop: 18 }}
          >
            Quality only.
            <br />
            <span style={{ color: 'var(--gold)' }}>Or we pass.</span>
          </h2>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: 'var(--soft)',
              maxWidth: '40em',
              margin: '24px 0 0',
            }}
          >
            My name sits next to every partnership. I&apos;ll only consider products and campaigns I can stand behind —
            clear utility for traders, no junk launches, no pay-to-shill noise.
          </p>
          <p className="eyebrow" style={{ marginTop: 56 }}>
            Who this is for
          </p>
          <h2
            className="display"
            style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '0.02em', marginTop: 14 }}
          >
            Partners who ship
            <br />
            to real traders.
          </h2>
          <div
            style={{
              marginTop: 48,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: 20,
            }}
          >
            {FIT.map((item) => (
              <div
                key={item.title}
                style={{
                  borderTop: '1px solid var(--gold)',
                  paddingTop: 24,
                }}
              >
                <h3
                  className="display"
                  style={{ fontSize: 22, letterSpacing: '0.06em', margin: 0, lineHeight: 1.15 }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--muted)', margin: '14px 0 0' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(64px, 8vw, 110px)', paddingBottom: 'clamp(64px, 8vw, 110px)' }}
      >
        <p className="eyebrow">Why partner here</p>
        <div style={{ marginTop: 36, borderTop: '1px solid rgba(242,241,238,0.14)' }}>
          {WHY.map((item) => (
            <div
              key={item.n}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px minmax(0, 1fr)',
                gap: 24,
                padding: 'clamp(28px, 3vw, 40px) 0',
                borderBottom: '1px solid rgba(242,241,238,0.14)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.16em', color: 'var(--gold)' }}>
                {item.n}
              </span>
              <div>
                <h3 className="display" style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', letterSpacing: '0.04em', margin: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', margin: '12px 0 0' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="shell"
        style={{
          paddingTop: 'clamp(24px, 4vw, 48px)',
          paddingBottom: 'clamp(72px, 9vw, 120px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(48px, 6vw, 96px)',
          alignItems: 'start',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              margin: 0,
            }}
          >
            Example · product collab
          </p>
          <div
            style={{
              marginTop: 24,
              border: '1px solid rgba(242,241,238,0.14)',
              background: 'var(--panel)',
              padding: '40px 36px',
            }}
          >
            <img src="/assets/mintscript-logo.png" alt="MintScript" style={{ height: 52 }} />
            <h2 className="display" style={{ fontSize: 28, letterSpacing: '0.03em', marginTop: 28, lineHeight: 1.05 }}>
              MintScript × TraderSveezy
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', margin: '16px 0 0' }}>
              The trading desk I built and promote — selective setups, charts, and education for the same audience.
              That&apos;s the bar for how a partnership should feel.
            </p>
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
              <p className="eyebrow">Request sent</p>
              <h2 className="display" style={{ fontSize: 40, lineHeight: 1, letterSpacing: '0.02em', marginTop: 18 }}>
                Thanks. I&apos;ll be in touch.
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--soft)', margin: '18px 0 0' }}>
                I review partnership requests myself. Expect a reply on X or by email.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ marginTop: 32, fontSize: 13, padding: '16px 24px' }}
                onClick={() => setSent(false)}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <h2 className="display" style={{ fontSize: 28, letterSpacing: '0.04em', margin: 0 }}>
                Pitch a partnership
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--muted)', margin: 0 }}>
                Tell me who you are, what you&apos;re launching, and why it&apos;s something I can stand behind with
                traders.
              </p>
              <label className="field">
                <span>Name</span>
                <input required name="name" />
              </label>
              <label className="field">
                <span>Exchange / project / brand</span>
                <input required name="brand" placeholder="e.g. Bybit, your protocol, your tool" />
              </label>
              <label className="field">
                <span>Email or X handle</span>
                <input required name="contact" />
              </label>
              <label className="field">
                <span>Partnership type</span>
                <select name="type" defaultValue="Exchange · referral / affiliate">
                  <option>Exchange · referral / affiliate</option>
                  <option>Project · launch / listing promo</option>
                  <option>Platform · tool / integration</option>
                  <option>Sponsored content / Space</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="field">
                <span>What you want traders to see</span>
                <textarea
                  name="idea"
                  rows={5}
                  placeholder="Product, campaign window, referral or promo angle, assets you can share…"
                />
              </label>
              <button type="submit" className="btn btn-primary" style={{ marginTop: 6, border: 'none' }}>
                Send partnership request
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
