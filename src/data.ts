export type PageId = 'home' | 'mintscript' | 'coaching' | 'courses' | 'tools' | 'collabs' | 'about'

export const PAGES: PageId[] = ['home', 'mintscript', 'coaching', 'courses', 'tools', 'collabs', 'about']

export const PAGE_LABELS: Record<PageId, string> = {
  home: 'Home',
  mintscript: 'MintScript',
  coaching: '1-on-1',
  courses: 'Courses',
  tools: 'Tools',
  collabs: 'Partners',
  about: 'About',
}

/** Swap these when booking / Discord / course checkout links are ready. */
export const LINKS = {
  booking: '#coaching',
  courses: '#courses',
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
    href: '#mintscript' as const,
    title: 'MintScript',
    desc: 'The desk I trade from: selective setups, charts, and Market Radar.',
    price: 'From $19/mo',
    accent: 'mint' as const,
  },
  {
    n: '02',
    href: '#coaching' as const,
    title: '1-on-1 Sessions',
    desc: 'Live sessions on your trades, your risk and your process.',
    price: 'From $300',
    accent: 'gold' as const,
  },
  {
    n: '03',
    href: '#courses' as const,
    title: 'Prerecorded Courses',
    desc: 'Five courses, from market structure to trade review.',
    price: '$300 · All 5',
    accent: 'gold' as const,
  },
  {
    n: '04',
    href: '#tools' as const,
    title: 'Trading Tools',
    desc: 'Market Radar feeds, strategy checklists and a loss log.',
    price: 'In MintScript',
    accent: 'gold' as const,
  },
  {
    n: '05',
    href: '#collabs' as const,
    title: 'Brand Partnerships',
    desc: 'Open to co-branded content, workshops, and product collabs with brands that teach traders.',
    price: 'Pitch a collab',
    accent: 'gold' as const,
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

export const MINT_FEATURES = [
  {
    n: '01',
    title: 'Selective desk setups',
    desc: 'Framed swing ideas on liquid names — entry, stop, targets, grade and risk on every card. Paced on purpose, not a spam feed.',
  },
  {
    n: '02',
    title: 'Draw the plan on chart',
    desc: 'Open the coin and paint entry, stop and targets on the live candles. Pro overlays sit beside the plan — not homework in another tab.',
  },
  {
    n: '03',
    title: 'Web Feed + Telegram',
    desc: 'Same plan on the desk and on your phone the second it prints. You still take the trade — we stop you from hunting blank charts.',
  },
  {
    n: '04',
    title: 'Markets & desk tools',
    desc: 'Screener, watchlist, Global Flow, BTC Station and more — confirm structure before you size.',
  },
  {
    n: '05',
    title: 'Market Radar',
    desc: 'Gainers, volume, funding, key levels and more — the feeds that build the free habit before you subscribe.',
  },
  {
    n: '06',
    title: '1-on-1 with me',
    desc: 'Subscribers get a 30-minute workshop on your process. Pro includes a follow-up.',
  },
]

export const MINT_PLANS = [
  {
    id: 'free',
    label: 'Habit',
    title: 'Free Discord',
    price: '$0',
    rate: 'Apply · same-day if approved',
    tagline: 'See how we trade before you pay for anything.',
    features: ['Market Radar feeds', 'Charts & screeners', 'Trader chat & desk notes'],
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
    tagline: 'One high-bar setup every other day — already framed.',
    features: [
      'Max 1 primary alert / 48h',
      'Full plan: Entry, SL, TP, grade & risk',
      'Telegram the second it prints',
      'Markets screener + charts',
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
    tagline: 'The full primary desk — plus tools to hunt, watch, and act.',
    features: [
      '~1–2 primary alerts / day',
      'Watchlist · up to 10 coins',
      'Global Flow + Indicator Builder',
      'Web + Telegram on every print',
      '30-min 1-on-1 workshop with me',
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
    tagline: 'Full desk — primary plus secondary on 4H, 6H, and 12H.',
    features: [
      '~3–4 alerts / day',
      'Primary + secondary setup types',
      'Station + every tool unlocked',
      'Mozzie AI · highest usage tier',
      'Workshop + follow-up included',
    ],
    cta: 'Go Pro',
    href: 'mintscript' as const,
    featured: false,
  },
]
