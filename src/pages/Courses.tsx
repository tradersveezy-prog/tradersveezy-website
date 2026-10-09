import { Link } from 'react-router-dom'
import { COURSES, LINKS } from '../data'

export function Courses() {
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
            <p className="eyebrow">Prerecorded · 5 courses</p>
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
              Everything I use to plan a trade, recorded and in order. Watch at your own pace and come back to it whenever
              you need it.
            </p>
          </div>
          <aside
            aria-label="Course bundle pricing"
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
            <a href={LINKS.courses} className="btn btn-primary" style={{ display: 'block', marginTop: 32, textAlign: 'center', fontSize: 13, padding: 19 }}>
              Get the courses
            </a>
          </aside>
        </div>
      </section>

      <section
        className="shell"
        style={{ paddingTop: 'clamp(64px, 8vw, 110px)', paddingBottom: 'clamp(64px, 8vw, 110px)' }}
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
            marginTop: 56,
          }}
        >
          <p style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--muted)', margin: 0, maxWidth: '34em' }}>
            Want me to look at how you apply it? Pair the courses with a <Link to="/coaching">1-on-1 session</Link>.
          </p>
          <a href={LINKS.courses} className="btn btn-primary">
            All 5 for $300
          </a>
        </div>
      </section>
    </main>
  )
}
