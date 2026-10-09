import { Link } from 'react-router-dom'
import { formatPostDate, getAllPosts } from '../lib/blog'

export function Blog() {
  const posts = getAllPosts()

  return (
    <main>
      <section style={{ position: 'relative', borderBottom: '1px solid rgba(242,241,238,0.08)', overflow: 'hidden' }}>
        <div
          className="glow"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 80% -10%, rgba(227,180,74,0.16), transparent 55%), radial-gradient(circle at 10% 90%, rgba(227,180,74,0.04), transparent 40%)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(242,241,238,0.03) 48px)',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.45), transparent 80%)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="shell"
          style={{
            position: 'relative',
            paddingTop: 'clamp(72px, 10vw, 140px)',
            paddingBottom: 'clamp(56px, 8vw, 100px)',
          }}
        >
          <p className="eyebrow">From the desk</p>
          <h1
            className="display"
            style={{
              fontSize: 'clamp(44px, 6.5vw, 92px)',
              letterSpacing: '0.02em',
              lineHeight: 0.98,
              marginTop: 28,
              maxWidth: '9em',
            }}
          >
            Desk
            <br />
            <span style={{ color: 'var(--gold)' }}>notes.</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(18px, 1.5vw, 22px)',
              lineHeight: 1.5,
              color: 'var(--soft)',
              maxWidth: '28em',
              margin: '28px 0 0',
            }}
          >
            Short reads on structure, risk, and process — the same language I use on the chart. Mentor, not guru.
          </p>
        </div>
      </section>

      <section className="shell" style={{ paddingTop: 'clamp(48px, 7vw, 88px)', paddingBottom: 'clamp(72px, 10vw, 130px)' }}>
        {posts.length === 0 ? (
          <p style={{ fontSize: 18, color: 'var(--muted)' }}>No notes yet. Check back soon.</p>
        ) : (
          <ul className="blog-list" style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid rgba(242,241,238,0.14)' }}>
            {posts.map((post, i) => (
              <li key={post.slug} className="blog-row">
                <Link to={`/blog/${post.slug}`} className="blog-row-link">
                  <div className="blog-row-meta">
                    <span className="blog-row-n">{String(i + 1).padStart(2, '0')}</span>
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  </div>
                  <div className="blog-row-main">
                    <h2 className="display blog-row-title">{post.title}</h2>
                    {post.tags.length > 0 ? (
                      <div className="blog-row-tags">
                        {post.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    ) : null}
                    <p className="blog-row-excerpt">{post.excerpt}</p>
                  </div>
                  <span className="blog-row-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p
          style={{
            marginTop: 56,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            letterSpacing: '0.08em',
            color: 'var(--muted)',
          }}
        >
          Educational only · Not financial advice
        </p>
      </section>
    </main>
  )
}
