import posthog from 'posthog-js'

const key = (import.meta.env.VITE_POSTHOG_KEY as string | undefined)?.trim() || ''
/** US cloud default — override with VITE_POSTHOG_HOST if you use EU. */
const host =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined)?.trim() || 'https://us.i.posthog.com'

/** Comma-separated ISO regions to never track, e.g. `DE-NW` (NRW). Empty = off. */
const EXCLUDE_REGIONS = (
  (import.meta.env.VITE_POSTHOG_EXCLUDE_REGIONS as string | undefined)?.trim() || 'DE-NW'
)
  .split(',')
  .map((s) => s.trim().toUpperCase())
  .filter(Boolean)

/** Signed-in accounts that should never contribute events. */
const INTERNAL_EMAILS = new Set(['tradersveezy@gmail.com', 'sumant.vasan@gmail.com'])

const OPT_OUT_KEY = 'ts_ph_opt_out'
const REGION_CACHE_KEY = 'ts_ph_region'

let booted = false
let suppressed = false
let ready = false
let bootPromise: Promise<void> | null = null

export const analyticsEnabled = Boolean(key)

function canCapture() {
  return Boolean(key) && ready && !suppressed && typeof window !== 'undefined'
}

async function detectExcludedRegion(): Promise<boolean> {
  if (!EXCLUDE_REGIONS.length) return false
  try {
    const cached = sessionStorage.getItem(REGION_CACHE_KEY)
    if (cached) return EXCLUDE_REGIONS.includes(cached)

    const ctrl = new AbortController()
    const timer = window.setTimeout(() => ctrl.abort(), 2500)
    const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal })
    window.clearTimeout(timer)
    if (!res.ok) return false
    const data = (await res.json()) as { country_code?: string; region_code?: string; region?: string }
    const code = `${data.country_code || ''}-${data.region_code || ''}`.toUpperCase()
    sessionStorage.setItem(REGION_CACHE_KEY, code)
    if (EXCLUDE_REGIONS.includes(code)) return true
    // Fallback name match for NRW if region_code missing
    if (
      EXCLUDE_REGIONS.includes('DE-NW') &&
      data.country_code === 'DE' &&
      /north\s*rhine|nordrhein|nrw/i.test(data.region || '')
    ) {
      return true
    }
    return false
  } catch {
    return false
  }
}

function applyQueryOptOut() {
  const params = new URLSearchParams(window.location.search)
  if (params.get('analytics') === 'off') {
    localStorage.setItem(OPT_OUT_KEY, '1')
    return true
  }
  if (params.get('analytics') === 'on') {
    localStorage.removeItem(OPT_OUT_KEY)
  }
  return localStorage.getItem(OPT_OUT_KEY) === '1'
}

async function boot() {
  if (!key || typeof window === 'undefined') {
    ready = true
    return
  }
  if (applyQueryOptOut()) {
    suppressed = true
    ready = true
    return
  }
  if (await detectExcludedRegion()) {
    suppressed = true
    ready = true
    return
  }
  if (booted) {
    ready = true
    return
  }
  booted = true
  posthog.init(key, {
    api_host: host,
    person_profiles: 'identified_only',
    capture_pageview: false, // SPA: we capture on route change
    capture_pageleave: true,
    autocapture: true,
    persistence: 'localStorage+cookie',
  })
  ready = true
}

/** Start PostHog (skips NRW / opt-out). Safe to call multiple times. */
export function initAnalytics() {
  if (bootPromise) return
  bootPromise = boot()
}

function whenReady(fn: () => void) {
  if (!key) return
  const run = () => {
    if (canCapture()) fn()
  }
  if (ready) {
    run()
    return
  }
  void (bootPromise ?? (bootPromise = boot())).then(run)
}

export function trackPageview(path: string) {
  whenReady(() => {
    posthog.capture('$pageview', { $current_url: `${window.location.origin}${path}` })
  })
}

export function track(event: string, properties?: Record<string, string | number | boolean | null | undefined>) {
  whenReady(() => {
    posthog.capture(event, properties)
  })
}

export function identifyUser(user: { id: string; email?: string; displayName?: string } | null) {
  whenReady(() => {
    if (!user) {
      posthog.reset()
      return
    }
    const email = user.email?.trim().toLowerCase()
    if (email && INTERNAL_EMAILS.has(email)) {
      posthog.opt_out_capturing()
      return
    }
    posthog.identify(user.id, {
      email: user.email,
      name: user.displayName,
    })
  })
}
