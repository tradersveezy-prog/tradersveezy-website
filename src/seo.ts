import type { PageId } from './data'
import { PAGE_PATHS } from './data'

export const SITE_URL = 'https://tradersveezy.com'
export const SITE_NAME = 'TraderSveezy'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/ts-mark-gold.svg`
export const TWITTER_HANDLE = '@tradersveezy'

export type PageSeo = {
  title: string
  description: string
  path: string
  jsonLd?: Record<string, unknown>[]
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
}

const orgLd = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  sameAs: ['https://x.com/tradersveezy'],
  founder: { '@id': `${SITE_URL}/#person` },
}

export const PAGE_SEO: Record<PageId, PageSeo> = {
  home: {
    title: 'TraderSveezy — Trade the plan. Not the feeling.',
    description:
      'Day trading education for crypto and gold. Risk-first process, 1-on-1 coaching, courses, MintScript desk tools, and brand partnerships. Educational only · Not financial advice.',
    path: '/',
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
    title: 'MintScript — Setups, charts, screener, Mozzie | TraderSveezy',
    description:
      'MintScript: trade setups, pro chart overlays, Mozzie analyst, volume/EMA screener, BTC Station, and Global Flow. Start free in Discord. From $19/mo.',
    path: '/mintscript',
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
    title: '1-on-1 Trading Coaching | TraderSveezy',
    description:
      'Live 1-on-1 trading sessions with TraderSveezy. Review your setups, risk, and process. Packages from $300. Educational only · Not financial advice.',
    path: '/coaching',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: '1-on-1 Trading Education',
        provider: { '@id': `${SITE_URL}/#person` },
        description: 'Live coaching sessions on setups, risk, entries, and trading process.',
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
    title: 'Trading Playbook — Coming Soon | TraderSveezy',
    description:
      'Five trading courses: market structure, levels, entries, risk & sizing, and process & review — one video per module plus written interactive lessons. Waitlist special $250.',
    path: '/courses',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'TraderSveezy Full Playbook',
        description:
          'Five courses covering market structure, key levels, entries, risk and position sizing, and trade review. Coming soon — join the waitlist.',
        provider: { '@id': `${SITE_URL}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '300',
          priceCurrency: 'USD',
          category: 'Paid',
          availability: 'https://schema.org/PreOrder',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
        },
      },
    ],
  },
  blog: {
    title: 'Desk Notes — Trading Process | TraderSveezy',
    description:
      'Short reads on market structure, risk, and process from TraderSveezy. Mentor, not guru. Educational only · Not financial advice.',
    path: '/blog',
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
  },
  collabs: {
    title: 'Exchange & Project Partnerships | TraderSveezy',
    description:
      'Partner with TraderSveezy for exchange referrals, project launches, and sponsored education. Quality projects only — ones the desk can stand behind.',
    path: '/partners',
  },
  about: {
    title: 'About TraderSveezy — Mentor, not guru',
    description:
      'Day trader in crypto and gold. Former Unity Academy leading analyst, CB Trading Academy analyst, Wealth Group setups contributor. Builder of MintScript.',
    path: '/about',
    jsonLd: [{ '@context': 'https://schema.org', ...personLd }],
  },
}

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

const MARKET_STRUCTURE_SEO: PageSeo = {
  title: 'Market Structure Interactive Module | TraderSveezy',
  description:
    'Interactive Course 01: name trend, range, and transition. Hotspot charts, regime quizzes, and the structure gate. Educational only · Not financial advice.',
  path: '/courses/market-structure',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Market Structure — Interactive Module',
      description:
        'Name the regime before you size: trend, value-range, and transition with chart labs and a pre-trade structure gate.',
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
    'Create a TraderSveezy account to access interactive course modules and member tools. Educational only · Not financial advice.',
  path: '/account',
}

const DESK_SEO: PageSeo = {
  title: 'Member Desk | TraderSveezy',
  description:
    'Your TraderSveezy desk: Course 01, playbook teasers, MintScript, and 1-on-1. Educational only · Not financial advice.',
  path: '/desk',
}

export function seoForPath(pathname: string): PageSeo {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/courses/market-structure') return MARKET_STRUCTURE_SEO
  if (clean === '/courses/levels-that-matter') {
    return {
      title: 'Levels That Matter Interactive Module | TraderSveezy',
      description:
        'Course 02 interactive: swings, POC/VAL/VAH, premium vs discount, and a levels gate. Educational only · Not financial advice.',
      path: '/courses/levels-that-matter',
    }
  }
  if (clean === '/courses/entries-triggers') {
    return {
      title: 'Entries & Triggers Interactive Module | TraderSveezy',
      description:
        'Course 03 interactive: retests, EMA reclaims, breakout sequence, hard stops, and an entries gate. Educational only · Not financial advice.',
      path: '/courses/entries-triggers',
    }
  }
  if (clean === '/courses/risk-position-sizing') {
    return {
      title: 'Risk & Position Sizing Interactive Module | TraderSveezy',
      description:
        'Course 04 interactive: structure stops, ATR confirmation, R:R filter, position sizing, and a risk gate. Educational only · Not financial advice.',
      path: '/courses/risk-position-sizing',
    }
  }
  if (clean === '/courses/process-review') {
    return {
      title: 'Process & Review Interactive Module | TraderSveezy',
      description:
        'Course 05 interactive: before-trade checklist, trade log, loss review, weekly look-back, and Google Sheets downloads. Educational only · Not financial advice.',
      path: '/courses/process-review',
    }
  }
  if (clean === '/account') return ACCOUNT_SEO
  if (clean === '/desk') return DESK_SEO
  if (clean.startsWith('/blog')) return PAGE_SEO.blog
  const id = (Object.entries(PAGE_PATHS) as [PageId, string][]).find(([, p]) => p === clean)?.[0]
  return PAGE_SEO[id ?? 'home']
}
