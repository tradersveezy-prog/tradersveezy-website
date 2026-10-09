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
    title: 'MintScript — Selective trading desk | TraderSveezy',
    description:
      'MintScript is the desk TraderSveezy trades from: selective setups, Draw plan charts, Telegram alerts, Market Radar, and plans from $19/mo. Join at build.mintscript.io.',
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
          'Selective crypto swing setups with entry, stop, targets, grade and risk — plus charts, Market Radar, and Telegram alerts.',
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
    title: 'Trading Courses Playbook — $300 Bundle | TraderSveezy',
    description:
      'Five prerecorded trading courses: market structure, levels, entries, risk & sizing, and process & review. One payment $300 bundle.',
    path: '/courses',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'TraderSveezy Full Playbook',
        description:
          'Five prerecorded courses covering market structure, key levels, entries, risk and position sizing, and trade review.',
        provider: { '@id': `${SITE_URL}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '300',
          priceCurrency: 'USD',
          category: 'Paid',
          availability: 'https://schema.org/InStock',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT5H',
        },
      },
    ],
  },
  tools: {
    title: 'Market Radar Trading Tools | TraderSveezy',
    description:
      'Market Radar Discord feeds: gainers, volume, funding, EMA-200, key levels and support/resistance. Free habit tools inside MintScript.',
    path: '/tools',
  },
  collabs: {
    title: 'Brand Partnerships & Co-branded Content | TraderSveezy',
    description:
      'Open to brand partnerships: co-branded content, workshops, tools, Spaces and live sessions with brands that teach traders.',
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

export function seoForPath(pathname: string): PageSeo {
  const clean = pathname.replace(/\/+$/, '') || '/'
  const id = (Object.entries(PAGE_PATHS) as [PageId, string][]).find(([, p]) => p === clean)?.[0]
  return PAGE_SEO[id ?? 'home']
}
