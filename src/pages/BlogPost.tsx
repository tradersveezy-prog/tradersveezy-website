import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import { formatPostDate, getPostBySlug } from '../lib/blog'
import { SITE_NAME, absoluteUrl } from '../seo'

export function BlogPost() {
  const { slug = '' } = useParams()
  const post = getPostBySlug(slug)

  if (!post || post.draft) {
    return <Navigate to="/blog" replace />
  }

  const url = absoluteUrl(`/blog/${post.slug}`)

  return (
    <main>
      <Helmet>
        <title>{`${post.title} | ${SITE_NAME}`}</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
      </Helmet>

      <article>
        <header style={{ position: 'relative', borderBottom: '1px solid rgba(242,241,238,0.08)' }}>
          <div className="glow" style={{ background: 'radial-gradient(circle at 90% 0%, rgba(227,180,74,0.12), transparent 45%)' }} />
          <div
            className="shell"
            style={{
              position: 'relative',
              paddingTop: 'clamp(64px, 9vw, 120px)',
              paddingBottom: 'clamp(48px, 6vw, 72px)',
              maxWidth: 820,
            }}
          >
            <p className="eyebrow">
              <Link to="/blog" style={{ color: 'inherit' }}>
                Desk notes
              </Link>
              <span style={{ color: 'var(--muted)', margin: '0 12px' }}>·</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </p>
            <h1
              className="display"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                letterSpacing: '0.02em',
                lineHeight: 1.05,
                marginTop: 24,
              }}
            >
              {post.title}
            </h1>
            {post.tags.length > 0 ? (
              <div className="blog-row-tags" style={{ marginTop: 22 }}>
                {post.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <div className="shell" style={{ paddingTop: 'clamp(40px, 5vw, 64px)', paddingBottom: 'clamp(64px, 9vw, 120px)', maxWidth: 820 }}>
          <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div
            style={{
              marginTop: 56,
              paddingTop: 28,
              borderTop: '1px solid rgba(242,241,238,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 20,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <Link to="/blog" className="btn btn-ghost" style={{ fontSize: 13, padding: '14px 22px' }}>
              All notes
            </Link>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--muted)' }}>
              Educational only · Not financial advice
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}
