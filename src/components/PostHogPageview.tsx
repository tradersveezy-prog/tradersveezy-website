import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageview } from '../lib/analytics'

/** SPA pageviews for PostHog (capture_pageview is off in init). */
export function PostHogPageview() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    trackPageview(`${pathname}${search}`)
  }, [pathname, search])

  return null
}
