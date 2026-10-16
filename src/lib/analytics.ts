import posthog from 'posthog-js'

const key = (import.meta.env.VITE_POSTHOG_KEY as string | undefined)?.trim() || ''
/** US cloud default — override with VITE_POSTHOG_HOST if you use EU. */
const host =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined)?.trim() || 'https://us.i.posthog.com'

export const analyticsEnabled = Boolean(key)

let booted = false

export function initAnalytics() {
  if (booted || !key || typeof window === 'undefined') return
  booted = true
  posthog.init(key, {
    api_host: host,
    person_profiles: 'identified_only',
    capture_pageview: false, // SPA: we capture on route change
    capture_pageleave: true,
    autocapture: true,
    persistence: 'localStorage+cookie',
  })
}

export function trackPageview(path: string) {
  if (!analyticsEnabled) return
  posthog.capture('$pageview', { $current_url: `${window.location.origin}${path}` })
}

export function track(event: string, properties?: Record<string, string | number | boolean | null | undefined>) {
  if (!analyticsEnabled) return
  posthog.capture(event, properties)
}

export function identifyUser(user: { id: string; email?: string; displayName?: string } | null) {
  if (!analyticsEnabled) return
  if (!user) {
    posthog.reset()
    return
  }
  posthog.identify(user.id, {
    email: user.email,
    name: user.displayName,
  })
}
