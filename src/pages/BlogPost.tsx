import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ExpandableImage } from '../components/ExpandableImage'
import { formatPostDate, getPostBySlug } from '../lib/blog'
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from '../seo'

export function BlogPost() {
  const { slug = '' } = useParams()
  const post = getPostBySlug(slug)
  const proseRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    const root = proseRef.current
    if (!root) return

    const imgs = Array.from(root.querySelectorAll('img'))
    const cleanups: Array<() => void> = []

    for (const img of imgs) {
      img.classList.add('blog-prose-expandable')
      img.setAttribute('tabindex', '0')
      img.setAttribute('role', 'button')
      img.setAttribute('aria-label', `Expand chart: ${img.alt || 'chart'}`)
      const open = () => setLightbox({ src: img.currentSrc || img.src, alt: img.alt || 'Chart' })
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open()
        }
      }
      img.addEventListener('click', open)
      img.addEventListener('keydown', onKey)
      cleanups.push(() => {
        img.removeEventListener('click', open)
        img.removeEventListener('keydown', onKey)
      })
    }

    return () => {
      for (const fn of cleanups) fn()
    }
  }, [post?.slug, post?.html])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  if (!post || post.draft) {
    return <Navigate to="/blog" replace />
  }

  const url = absoluteUrl(`/blog/${post.slug}`)
  const ogImage = post.image ? absoluteUrl(post.image) : DEFAULT_OG_IMAGE

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
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <article>
        <header className="blog-post-header">
          <div className="glow" style={{ background: 'radial-gradient(circle at 90% 0%, rgba(227,180,74,0.12), transparent 45%)' }} />
          <div className="shell blog-post-header-inner">
            <p className="eyebrow">
              <Link to="/blog" style={{ color: 'inherit' }}>
                Desk notes
              </Link>
              <span style={{ color: 'var(--muted)', margin: '0 12px' }}>·</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </p>
            <h1 className="display blog-post-title">{post.title}</h1>
            {post.tags.length > 0 ? (
              <div className="blog-row-tags" style={{ marginTop: 22 }}>
                {post.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            ) : null}
          </div>

          {post.image ? (
            <div className="shell blog-post-hero">
              <ExpandableImage src={post.image} alt={post.imageAlt} caption={post.imageAlt} />
            </div>
          ) : null}
        </header>

        <div className="shell blog-post-body">
          <div
            ref={proseRef}
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <div className="blog-post-foot">
            <Link to="/blog" className="btn btn-ghost" style={{ fontSize: 13, padding: '14px 22px' }}>
              All notes
            </Link>
            <p className="mono" style={{ margin: 0, fontSize: 12, letterSpacing: '0.08em', color: 'var(--muted)' }}>
              Educational only · Not financial advice
            </p>
          </div>
        </div>
      </article>

      {lightbox ? (
        <div
          className="expandable-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="expandable-image-close mono"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            Close · Esc
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="expandable-image-full"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </main>
  )
}
