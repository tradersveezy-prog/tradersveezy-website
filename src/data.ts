export type PageId = 'home' | 'mintscript' | 'coaching' | 'courses' | 'blog' | 'tools' | 'collabs' | 'about'

export const PAGES: PageId[] = ['home', 'mintscript', 'coaching', 'courses', 'blog', 'tools', 'collabs', 'about']

export const PAGE_LABELS: Record<PageId, string> = {
  home: 'Home',
  mintscript: 'MintScript',
  coaching: '1-on-1',
  courses: 'Courses',
  blog: 'Notes',
  tools: 'Tools',
  collabs: 'Partners',
  about: 'About',
}

export const PAGE_PATHS: Record<PageId, string> = {
  home: '/',
  mintscript: '/mintscript',
  coaching: '/coaching',
  courses: '/courses',
  blog: '/blog',
  tools: '/tools',
  collabs: '/partners',
  about: '/about',
}

export function pageHref(id: PageId): string {
  return PAGE_PATHS[id]
}

export function pageFromPath(pathname: string): PageId {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/blog' || clean.startsWith('/blog/')) return 'blog'
  if (clean === '/courses' || clean.startsWith('/courses/')) return 'courses'
  const entry = (Object.entries(PAGE_PATHS) as [PageId, string][]).find(([, path]) => path === clean)
  return entry?.[0] ?? 'home'
}

/** Swap these when booking / Discord / course checkout links are ready. */
export const LINKS = {
  booking: '/coaching',
  courses: '/courses',
  /** FormSubmit inbox for playbook waitlist. Leave '' for UI-only until set. */
  courseWaitlistEmail: (import.meta.env.VITE_WAITLIST_EMAIL as string | undefined)?.trim() || '',
  discord: 'https://build.mintscript.io/join',
  mintscript: 'https://build.mintscript.io/join',
  mintscriptPlans: 'https://mintscript.io/#plans',
  mintscriptApp: 'https://build.mintscript.io',
  x: 'https://x.com/tradersveezy',
  mintX: 'https://x.com/MintScript_io',
}

export const OFFERS = [
  {
    n: '01',
    href: '/mintscript',
    title: 'MintScript',
    desc: 'Setups, marked-up charts, Mozzie, screener, BTC Station, and Global Flow. Start free in Discord.',
    price: 'From $19/mo',
    accent: 'mint' as const,
  },
  {
    n: '02',
    href: '/coaching',
    title: '1-on-1 Sessions',
    desc: 'Live sessions on your trades, your risk and your process.',
    price: 'From $300',
    accent: 'gold' as const,
  },
  {
    n: '03',
    href: '/courses',
    title: 'Trading Playbook',
    desc: 'Five courses, from market structure to trade review — written lessons and worksheets.',
    price: 'Coming soon',
    accent: 'gold' as const,
  },
  {
    n: '04',
    href: '/tools',
    title: 'Trading Tools',
    desc: 'Market Radar Discord feeds — where to look before you size.',
    price: 'In MintScript',
    accent: 'gold' as const,
  },
  {
    n: '05',
    href: '/partners',
    title: 'Partnerships',
    desc: 'Exchanges, projects, and platforms — only quality I can stand behind. Referrals, launches, sponsored education.',
    price: 'Pitch a partner',
    accent: 'gold' as const,
  },
]

export const COURSES = [
  {
    n: '01',
    title: 'Market Structure',
    tag: 'Foundations',
    desc: 'Trend, range, and flip. Read what buyers and sellers are doing before you look for a trade.',
  },
  {
    n: '02',
    title: 'Levels That Matter',
    tag: 'Support · Resistance · Volume profile',
    desc: 'Clear levels in 15 seconds. Higher timeframes, value edges, and the 55 / 200 as real levels.',
  },
  {
    n: '03',
    title: 'Entries & Triggers',
    tag: 'Retests · EMA reclaims · Breakouts',
    desc: 'Retest after structure, EMA reclaim, breakout sequence — when to enter, when to wait.',
  },
  {
    n: '04',
    title: 'Risk & Position Sizing',
    tag: 'Structure stop · ATR · R:R · Size',
    desc: 'Stop beyond structure, confirm with ATR, know R:R, then size from dollar risk.',
  },
  {
    n: '05',
    title: 'Process & Review',
    tag: 'Checklist · Log · Loss review · Sheets files',
    desc: 'Make it stick: checklist before you trade, a simple log, review after losses, weekly look-back, downloadable files.',
  },
]

export const FEEDS = [
  { ch: 'gainers-losers', desc: 'Biggest movers up and down, so you see where attention is going.' },
  { ch: 'ema-200', desc: 'Alerts when price reclaims or loses the 200 EMA.' },
  { ch: 'volume', desc: 'Unusual volume, the first sign something is starting.' },
  { ch: 'volume-change', desc: 'Sharp shifts in volume compared to the recent average.' },
  { ch: 'funding-rates', desc: 'Funding extremes that show crowded longs or shorts.' },
  { ch: 'key-levels', desc: 'The levels I am watching on the majors.' },
  { ch: 'sup-res', desc: 'Support and resistance touches and breaks as they happen.' },
]

export const MINT_FEATURES = [
  {
    n: '01',
    title: 'Trade setups',
    desc: 'Entry, stop, and targets on every card — on the web and Telegram. Paced on purpose, not a spam feed.',
  },
  {
    n: '02',
    title: 'Charts with pro overlays',
    desc: 'Key levels, bounce zones, Fibs, and more marked on the candles — plus a current analysis so you’re not staring at a blank chart.',
  },
  {
    n: '03',
    title: 'Mozzie',
    desc: 'Your personal crypto analyst. Ask about a coin, a setup, or the tape — get a clear read without opening ten tabs.',
  },
  {
    n: '04',
    title: 'Screener',
    desc: 'Find coins doing something real — high volume that just crossed the 50 EMA, resistance flipping to support, and similar patterns. Spot the move before you’re late.',
  },
  {
    n: '05',
    title: 'BTC Station',
    desc: 'Bitcoin context in one place — so alt setups make sense against what BTC is actually doing.',
  },
  {
    n: '06',
    title: 'Global Flow',
    desc: 'A live read on where money is moving across the market — so you trade with the flow, not against it.',
  },
]

export const MINT_PLANS = [
  {
    id: 'free',
    label: 'Habit',
    title: 'Free Discord',
    price: '$0',
    rate: 'Apply · same-day if approved',
    tagline: 'See the feeds before you pay for anything.',
    features: ['Market feeds (gainers, volume, levels)', 'Charts & screeners', 'Trader chat'],
    cta: 'Join free',
    href: 'discord' as const,
    featured: false,
  },
  {
    id: 'starter',
    label: 'On-ramp',
    title: 'Starter',
    price: '$19',
    rate: '/ mo',
    tagline: 'About one setup every other day — entry, stop, targets included.',
    features: [
      'Max 1 setup alert / 48h',
      'Entry, stop, targets on every card',
      'Charts with pro overlays',
      'Telegram when it prints',
    ],
    cta: 'Start Starter',
    href: 'mintscript' as const,
    featured: false,
  },
  {
    id: 'core',
    label: 'Flagship',
    title: 'Core',
    price: '$69',
    rate: '/ mo',
    tagline: 'More setups each day — plus watchlist tools and a short coaching call.',
    features: [
      '~1–2 setup alerts / day',
      'Charts · Mozzie · screener',
      'BTC Station + Global Flow',
      'Web + Telegram on every setup',
      '30-min coaching call included',
    ],
    cta: 'Get Core',
    href: 'mintscript' as const,
    featured: true,
  },
  {
    id: 'pro',
    label: 'Full desk',
    title: 'Pro',
    price: '$199',
    rate: '/ mo',
    tagline: 'Most setups — more timeframes, all tools, workshop + follow-up.',
    features: [
      '~3–4 alerts / day',
      'More setup types & timeframes',
      'Full screener · BTC Station · Global Flow',
      'Mozzie · highest usage tier',
      'Workshop + follow-up',
    ],
    cta: 'Go Pro',
    href: 'mintscript' as const,
    featured: false,
  },
]
