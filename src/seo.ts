import type { PageId } from './data'
import { PAGE_PATHS } from './data'

export const SITE_URL = 'https://tradersveezy.com'
export const SITE_NAME = 'TraderSveezy'
/** PNG/JPG — many crawlers ignore SVG for link previews. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-default.jpg`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const TWITTER_HANDLE = '@tradersveezy'

export type PageSeo = {
  title: string
  description: string
  path: string
  /** Absolute or site-relative image for OG/Twitter */
  image?: string
  imageAlt?: string
  jsonLd?: Record<string, unknown>[]
  noindex?: boolean
}

const personLd = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'TraderSveezy',
  alternateName: 'Sveezy',
  url: SITE_URL,
  sameAs: ['https://x.com/tradersveezy', 'https://x.com/MintScript_io'],
  jobTitle: 'Trading educator & day trader',
  description:
    'Day trader and mentor focused on intraday crypto and gold. Former Unity Academy leading analyst, CB Trading Academy analyst, and Wealth Group contributor.',
  image: DEFAULT_OG_IMAGE,
}

const orgLd = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/ts-mark-gold.svg`,
  image: DEFAULT_OG_IMAGE,
  sameAs: ['https://x.com/tradersveezy'],
  founder: { '@id': `${SITE_URL}/#person` },
}

export const PAGE_SEO: Record<PageId, PageSeo> = {
  home: {
    title: 'TraderSveezy — Trade the plan. Not the feeling.',
    description:
      'Day trading education for crypto and gold. Risk-first process, interactive playbook, 1-on-1 coaching, and MintScript desk tools. Educational only · Not financial advice.',
    path: '/',
    image: '/assets/og-default.jpg',
    imageAlt: 'TraderSveezy — 1-on-1 mentorship, courses & tools for traders who manage risk first.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          'Trading education and mentorship from TraderSveezy — risk-first process for day traders.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
      },
      { '@context': 'https://schema.org', ...orgLd },
      { '@context': 'https://schema.org', ...personLd },
    ],
  },
  mintscript: {
    title: 'MintScript Desk Tools | TraderSveezy',
    description:
      'MintScript: trade setups, chart overlays, Mozzie, screener, BTC Station, Global Flow. Start free in Discord. Plans from $19/mo.',
    path: '/mintscript',
    image: '/assets/og-default.jpg',
    imageAlt: 'MintScript — setups and desk tools from TraderSveezy',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'MintScript',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        url: 'https://build.mintscript.io/join',
        description:
          'Trade setups, marked-up charts, Mozzie crypto analyst, market screener, BTC Station, and Global Flow.',
        offers: [
          {
            '@type': 'Offer',
            name: 'Starter',
            price: '19',
            priceCurrency: 'USD',
            description: 'Max 1 primary alert every 48 hours',
          },
          {
            '@type': 'Offer',
            name: 'Core',
            price: '69',
            priceCurrency: 'USD',
            description: 'Flagship desk · ~1–2 primary alerts per day',
          },
          {
            '@type': 'Offer',
            name: 'Pro',
            price: '199',
            priceCurrency: 'USD',
            description: 'Full desk · primary + secondary on multiple timeframes',
          },
        ],
        creator: { '@id': `${SITE_URL}/#person` },
      },
    ],
  },
  coaching: {
    title: '1-on-1 Trading Coaching · Crypto Pay | TraderSveezy',
    description:
      'Live 1-on-1 sessions on your setups, risk, and process. Packages $300 · $750 · $1,000. Pay with crypto, then book. Educational only · Not financial advice.',
    path: '/coaching',
    image: '/assets/og-coaching.jpg',
    imageAlt: 'Sit at my desk — TraderSveezy 1-on-1 sessions',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: '1-on-1 Trading Education',
        provider: { '@id': `${SITE_URL}/#person` },
        description: 'Live coaching sessions on setups, risk, entries, and trading process. Crypto checkout.',
        areaServed: 'Worldwide',
        offers: [
          { '@type': 'Offer', name: '1 Session', price: '300', priceCurrency: 'USD' },
          { '@type': 'Offer', name: '3 Sessions', price: '750', priceCurrency: 'USD' },
          { '@type': 'Offer', name: '5 Sessions Mentorship', price: '1000', priceCurrency: 'USD' },
        ],
      },
    ],
  },
  courses: {
    title: 'Trading Playbook Waitlist · $250 | TraderSveezy',
    description:
      'Five interactive courses — structure, levels, entries, risk, process. Waitlist special $250 ($50 off). Course 01 open now. Pay with crypto. Educational only · Not financial advice.',
    path: '/courses',
    image: '/assets/og-courses.jpg',
    imageAlt: 'TraderSveezy full playbook — waitlist $250',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'TraderSveezy Full Playbook',
        description:
          'Five courses: market structure, levels, entries, risk & sizing, and process & review. Waitlist special $250. Course 01 open now.',
        provider: { '@id': `${SITE_URL}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '250',
          priceCurrency: 'USD',
          category: 'Paid',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/courses#waitlist`,
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
        },
        isAccessibleForFree: false,
      },
    ],
  },
  blog: {
    title: 'Desk Notes — Trading Process | TraderSveezy',
    description:
      'Short reads on market structure, risk, and process from TraderSveezy. Mentor, not guru. Educational only · Not financial advice.',
    path: '/blog',
    image: '/assets/og-default.jpg',
    imageAlt: 'TraderSveezy Desk Notes',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'TraderSveezy Desk Notes',
        description: 'Short reads on structure, risk, and process from the desk.',
        url: `${SITE_URL}/blog`,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  },
  tools: {
    title: 'Market Radar Trading Tools | TraderSveezy',
    description:
      'Market Radar Discord feeds: gainers, volume, funding, EMA-200, key levels and support/resistance. Inside MintScript.',
    path: '/tools',
    image: '/assets/og-default.jpg',
    imageAlt: 'TraderSveezy Market Radar tools',
  },
  collabs: {
    title: 'Exchange & Project Partnerships | TraderSveezy',
    description:
      'Partner with TraderSveezy for exchange referrals, project launches, and sponsored education. Quality projects only.',
    path: '/partners',
    image: '/assets/og-default.jpg',
    imageAlt: 'TraderSveezy partnerships',
  },
  about: {
    title: 'About TraderSveezy — Mentor, not guru',
    description:
      'Day trader in crypto and gold. Former Unity Academy leading analyst, CB Trading Academy analyst, Wealth Group contributor. Builder of MintScript.',
    path: '/about',
    image: '/assets/og-default.jpg',
    imageAlt: 'About TraderSveezy',
    jsonLd: [{ '@context': 'https://schema.org', ...personLd }],
  },
}

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

const MARKET_STRUCTURE_SEO: PageSeo = {
  title: 'Market Structure Course (Free) | TraderSveezy',
  description:
    'Interactive Course 01: name trend, range, and flip. Charts, quizzes, games, and video. Free with an account. Educational only · Not financial advice.',
  path: '/courses/market-structure',
  image: '/assets/og-courses.jpg',
  imageAlt: 'Market Structure — Course 01',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Market Structure — Interactive Module',
      description:
        'Name the regime before you size: trend, value-range, and flip with chart labs, games, and a structure gate.',
      learningResourceType: 'Interactive lesson',
      educationalLevel: 'Beginner to intermediate',
      provider: { '@id': `${SITE_URL}/#organization` },
      isAccessibleForFree: true,
      url: `${SITE_URL}/courses/market-structure`,
    },
  ],
}

const ACCOUNT_SEO: PageSeo = {
  title: 'Sign in · Create account | TraderSveezy',
  description:
    'Create a TraderSveezy account for Course 01 and member desk access. Educational only · Not financial advice.',
  path: '/account',
  noindex: true,
}

const DESK_SEO: PageSeo = {
  title: 'Member Desk | TraderSveezy',
  description:
    'Your TraderSveezy desk: courses, playbook, MintScript, and coaching credits. Educational only · Not financial advice.',
  path: '/desk',
  noindex: true,
}

function courseModuleSeo(
  path: string,
  title: string,
  description: string,
  free = false,
): PageSeo {
  return {
    title,
    description,
    path,
    image: '/assets/og-courses.jpg',
    imageAlt: title,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: title.replace(' | TraderSveezy', ''),
        description,
        learningResourceType: 'Interactive lesson',
        provider: { '@id': `${SITE_URL}/#organization` },
        isAccessibleForFree: free,
        url: `${SITE_URL}${path}`,
      },
    ],
  }
}

export function seoForPath(pathname: string): PageSeo {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/courses/market-structure') return MARKET_STRUCTURE_SEO
  if (clean === '/courses/levels-that-matter') {
    return courseModuleSeo(
      clean,
      'Levels That Matter | TraderSveezy Playbook',
      'Course 02: swings, EMAs as levels, magnets, VAL/VAH/POC, confluence. Waitlist unlock. Educational only · Not financial advice.',
    )
  }
  if (clean === '/courses/entries-triggers') {
    return courseModuleSeo(
      clean,
      'Entries & Triggers | TraderSveezy Playbook',
      'Course 03: retests, EMA reclaim, breakout sequence, hard stops. Waitlist unlock. Educational only · Not financial advice.',
    )
  }
  if (clean === '/courses/risk-position-sizing') {
    return courseModuleSeo(
      clean,
      'Risk & Position Sizing | TraderSveezy Playbook',
      'Course 04: structure stops, ATR, R:R, sizing. Waitlist unlock. Educational only · Not financial advice.',
    )
  }
  if (clean === '/courses/process-review') {
    return courseModuleSeo(
      clean,
      'Process & Review | TraderSveezy Playbook',
      'Course 05: checklist, journal, loss review, Sheets downloads. Waitlist unlock. Educational only · Not financial advice.',
    )
  }
  if (clean === '/account') return ACCOUNT_SEO
  if (clean === '/desk') return DESK_SEO
  if (clean.startsWith('/blog')) return PAGE_SEO.blog
  const id = (Object.entries(PAGE_PATHS) as [PageId, string][]).find(([, p]) => p === clean)?.[0]
  return PAGE_SEO[id ?? 'home']
}
