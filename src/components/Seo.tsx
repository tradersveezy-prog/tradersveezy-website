import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  absoluteUrl,
  seoForPath,
} from '../seo'

export function Seo() {
  const { pathname } = useLocation()
  const page = seoForPath(pathname)
  const url = absoluteUrl(page.path)
  const jsonLd = page.jsonLd ?? []

  return (
    <Helmet>
      <html lang="en" />
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <meta name="author" content={SITE_NAME} />
      <meta name="theme-color" content="#060606" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}

      <link rel="alternate" href={`${SITE_URL}/`} hrefLang="en" />
    </Helmet>
  )
}
