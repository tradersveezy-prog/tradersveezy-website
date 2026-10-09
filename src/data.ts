export type PageId = 'home' | 'coaching' | 'courses' | 'tools' | 'collabs' | 'about'

export const PAGES: PageId[] = ['home', 'coaching', 'courses', 'tools', 'collabs', 'about']

export const PAGE_LABELS: Record<PageId, string> = {
  home: 'Home',
  coaching: '1-on-1',
  courses: 'Courses',
  tools: 'Tools',
  collabs: 'Collabs',
  about: 'About',
}

/** Swap these when booking / Discord / course checkout links are ready. */
export const LINKS = {
  booking: '#coaching',
  courses: '#courses',
  discord: '#tools',
  x: 'https://x.com/tradersveezy',
}

export const OFFERS = [
  {
    n: '01',
    href: '#coaching' as const,
    title: '1-on-1 Sessions',
    desc: 'Live sessions on your trades, your risk and your process.',
    price: 'From $300',
  },
  {
    n: '02',
    href: '#courses' as const,
    title: 'Prerecorded Courses',
    desc: 'Five courses, from market structure to trade review.',
    price: '$300 · All 5',
  },
  {
    n: '03',
    href: '#tools' as const,
    title: 'Trading Tools',
    desc: 'Market Radar feeds, strategy checklists and a loss log.',
    price: 'In Discord',
  },
  {
    n: '04',
    href: '#collabs' as const,
    title: 'Collaborations',
    desc: 'Workshops, tools and content with brands that teach.',
    price: 'Request',
  },
]

export const COURSES = [
  {
    n: '01',
    title: 'Market Structure',
    tag: 'Foundations',
    desc: 'Trend, range and transition. How to read what the chart is actually doing before you look for a trade.',
  },
  {
    n: '02',
    title: 'Levels That Matter',
    tag: 'Support · Resistance · Volume profile',
    desc: 'Key levels, VAH, VAL and POC. Where price is likely to react, and why.',
  },
  {
    n: '03',
    title: 'Entries & Triggers',
    tag: 'Retests · EMA reclaims · Breakouts',
    desc: 'Turning a level into a trade: the trigger, the entry, and when to DCA or stay out.',
  },
  {
    n: '04',
    title: 'Risk & Position Sizing',
    tag: 'Stops · R:R · Sizing',
    desc: 'Where the stop goes, how to size from it, and how to make a loss survivable.',
  },
  {
    n: '05',
    title: 'Process & Review',
    tag: 'Checklists · Journaling · Losses',
    desc: 'A repeatable pre-trade checklist and a review habit that turns losses into lessons.',
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

export const RECENT_CARDS = [
  {
    pair: 'BTC / USDT',
    type: 'SWING',
    direction: 'LONG' as const,
    rr: '1 : 3.1',
    chart: '/assets/btc-4h-poc-retest.png',
    entry: '85,554',
    stop: '83,200',
    target: '92,800',
  },
  {
    pair: 'HYPE / USDT',
    type: 'SCALP',
    direction: 'LONG' as const,
    rr: '1 : 2.4',
    chart: '/assets/hype-15m-scalp.png',
    entry: '87.40',
    stop: '85.10',
    target: '92.90',
  },
  {
    pair: 'XMR / USDT',
    type: 'SWING',
    direction: 'LONG' as const,
    rr: '1 : 2.6',
    chart: '/assets/xmr-12h-chart.png',
    entry: '552',
    stop: '528',
    target: '614',
  },
  {
    pair: 'ZEC / USDT',
    type: 'SCALP',
    direction: 'SHORT' as const,
    rr: '1 : 2.1',
    chart: '/assets/zec-2h-scalp.png',
    entry: '1,305',
    stop: '1,348',
    target: '1,215',
  },
]

export const HERO_CARD = {
  pair: 'XAU / USD',
  type: 'SWING',
  direction: 'LONG' as const,
  rr: '1 : 2.84',
  chart: '/assets/xauusd-1d-oct09-b.png',
  entry: '4,190',
  stop: '4,085',
  target: '4,488',
  eyebrow: 'LONG SETUP · SPOT · 1D',
}
