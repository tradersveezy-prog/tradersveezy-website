export type CallChoice = 'trade' | 'wait' | 'skip'

export const PHRASE = "You can't regret a well thought out plan."

export const RULES = {
  stack: {
    context: '12H · 6H',
    execution: '15m',
  },
  trend: {
    law: 'Higher highs and higher lows — and for a long, price above the 21, 55, and 200 EMAs on the 15m.',
    refuse: "Don't sit out waiting for a perfect fill — trends often won't give one.",
  },
  range: {
    law: 'Where buyers and sellers already agreed on price — especially a reclaim of the low end of that zone (VAL).',
    refuse: "Don't trade the middle of the box.",
  },
  transition: {
    law: 'Price pokes past a key level, then closes back inside — with volume or RSI backup.',
    refuse: "Don't rush the first reclaim — wait for a few closes (and check BTC if you're in an alt).",
  },
} as const

export type QuizQ = {
  id: string
  prompt: string
  options: { id: string; label: string }[]
  correct: string
  explain: string
}

export const QUIZZES: Record<string, QuizQ[]> = {
  cold: [
    {
      id: 'c1',
      prompt: "You open a chart and can't say if it's trending, ranging, or flipping. What do you do?",
      options: [
        { id: 'a', label: "Stand down. Can't name it → not in" },
        { id: 'b', label: 'Hunt a 15m entry anyway — feel it out' },
        { id: 'c', label: 'Add more indicators until a story appears' },
      ],
      correct: 'a',
      explain: "If you can't name what's happening, you're guessing. Waiting is a position.",
    },
    {
      id: 'c2',
      prompt: 'What is Course 01 actually training?',
      options: [
        { id: 'a', label: 'Drawing as many levels as possible' },
        { id: 'b', label: 'Memorizing trading jargon' },
        { id: 'c', label: 'Naming what buyers and sellers are doing — then tying that to where value is' },
      ],
      correct: 'c',
      explain: 'Candles are sides. Lines without that thought process are noise.',
    },
  ],
  trend: [
    {
      id: 't1',
      prompt: 'For a long in this playbook you need…',
      options: [
        { id: 'a', label: 'Higher highs and higher lows only' },
        { id: 'b', label: 'Price above VWAP on the 1m' },
        { id: 'c', label: 'Higher highs/lows, and price above the 21, 55, and 200 EMAs on the 15m' },
      ],
      correct: 'c',
      explain: 'Swings alone can lie. On the 15m, buyers should still own the 21, 55, and 200.',
    },
    {
      id: 't2',
      prompt: 'Clean trend day. The perfect wick never prints. You…',
      options: [
        { id: 'a', label: 'Still trade with the trend — don’t freeze for a textbook fill' },
        { id: 'b', label: 'Skip — no exact entry, no trade' },
        { id: 'c', label: 'Fade every pullback' },
      ],
      correct: 'a',
      explain: "Real trends often won't give the surgical fill. Don't sit out for perfection.",
    },
  ],
  range: [
    {
      id: 'r1',
      prompt: 'In this playbook, “range” means…',
      options: [
        { id: 'a', label: 'A value zone — especially reclaiming the low end of it' },
        { id: 'b', label: 'Any equal high / equal low box' },
        { id: 'c', label: 'Chop in the middle for scalp points' },
      ],
      correct: 'a',
      explain: 'Range here is where the market already agreed on price — not boredom in the middle.',
    },
    {
      id: 'r2',
      prompt: 'Price is stuck in the middle of value with no reclaim story. Default?',
      options: [
        { id: 'a', label: 'Scalp the middle — it’s free money' },
        { id: 'b', label: 'Force a trend label so you can chase' },
        { id: 'c', label: 'Skip. Leave the middle alone.' },
      ],
      correct: 'c',
      explain: 'The middle is where invented trades live.',
    },
  ],
  transition: [
    {
      id: 'x1',
      prompt: 'A key level breaks, then one candle closes back above it. Ready to size up?',
      options: [
        { id: 'a', label: 'Yes — first reclaim is enough' },
        { id: 'b', label: 'Yes if RSI is extreme' },
        { id: 'c', label: 'No — need a few closes (and check BTC if it’s an alt)' },
      ],
      correct: 'c',
      explain: 'Poke past + close back is the pattern — rushing the first reclaim is the mistake.',
    },
    {
      id: 'x2',
      prompt: 'NEAR breaks 4.60 (held twice), dips under, then closes back above. What’s going on?',
      options: [
        { id: 'a', label: 'Flip / failed break — dip under then reclaim' },
        { id: 'b', label: 'New bear trend — structure broken' },
        { id: 'c', label: 'Clean bull trend — buy market' },
      ],
      correct: 'a',
      explain:
        'Broke and came back. That’s a flip — then look for entry at the initial untested broken level (here ~4.60), not a chase.',
    },
  ],
  mtf: [
    {
      id: 'm1',
      prompt: 'Your day-trade chart stack is…',
      options: [
        { id: 'a', label: '1m + 5m + 15m + 1H + 4H' },
        { id: 'b', label: 'Daily only' },
        { id: 'c', label: 'Big picture 12H & 6H · Entry on 15m' },
      ],
      correct: 'c',
      explain: 'Two charts for the story, one for the trigger. Drop anything that doesn’t change the decision.',
    },
    {
      id: 'm2',
      prompt: '12H is a clean bull pullback into a buy zone. You chase halfway there on 15m. Problem?',
      options: [
        { id: 'a', label: 'You named the zone — chasing mid-air skips the fight at the level' },
        { id: 'b', label: 'None — big picture is bull' },
        { id: 'c', label: 'You needed a 1m chart' },
      ],
      correct: 'a',
      explain: 'Big picture names the zone. Entry waits for the fight at that level — not FOMO in the middle.',
    },
  ],
}

export type Hotspot = {
  id: string
  x: number
  y: number
  title: string
  body: string
}

export type ChartLab = {
  id: string
  title: string
  pair: string
  tf: string
  src: string
  regime: string
  blurb: string
  hotspots: Hotspot[]
  /** Model answer for TRADE / WAIT / SKIP */
  correctCall: CallChoice
  decision: {
    story: string
    why: string
    action: string
  }
}

export const LABS: ChartLab[] = [
  {
    id: 'btc-12h',
    title: 'Lab A — Big picture',
    pair: 'BTCUSDT.P',
    tf: '12H',
    src: '/curriculum/01/btc-12h-long-setup.webp',
    regime: 'Uptrend · pullback into value',
    blurb: 'What’s the story on the big chart? Tap the markers — then lock trade / wait / skip.',
    hotspots: [
      {
        id: 'h1',
        x: 28,
        y: 32,
        title: 'Where volume built up',
        body: 'Lots of trading happened up here on the push. Price has left that area and pulled back lower.',
      },
      {
        id: 'h2',
        x: 62,
        y: 58,
        title: 'Buy zone',
        body: 'The idea lives down here in the discount area — not floating in the middle for sport.',
      },
      {
        id: 'h3',
        x: 78,
        y: 72,
        title: 'Where you’re wrong',
        body: 'Stop under the defense. Plan marked: entry, stop, target.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Uptrend · pullback into value',
      why: 'Higher highs/lows, then a pullback into a cheaper area — not a new downtrend',
      action: 'Wait for a 15m fight at the zone — don’t chase mid-air',
    },
  },
  {
    id: 'btc-8h',
    title: 'Lab B — Closer look',
    pair: 'BTCUSDT.P',
    tf: '8H',
    src: '/curriculum/01/btc-8h-long-setup.png',
    regime: 'Same uptrend · clearer level',
    blurb: 'Same plan, one step closer. The big chart named it — this one sharpens the level.',
    hotspots: [
      {
        id: 'h1',
        x: 22,
        y: 40,
        title: 'The push up',
        body: 'Yellow bracket — the leg you’re measuring the pullback against.',
      },
      {
        id: 'h2',
        x: 55,
        y: 62,
        title: 'Support area ~81–82k',
        body: 'Trendline + flat level — where buyers are supposed to show up.',
      },
      {
        id: 'h3',
        x: 82,
        y: 48,
        title: 'The plan',
        body: 'Same stop idea as the 12H. Timing the fill still belongs on 15m.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Uptrend pullback · clearer support',
      why: '8H sharpens the level — it doesn’t rewrite the 12H story',
      action: 'Wait for 15m — seeing structure isn’t the same as chasing',
    },
  },
  {
    id: 'near-6h',
    title: 'Lab C — Flip',
    pair: 'NEARUSDT.P',
    tf: '6H',
    src: '/curriculum/01/near-6h-sweep-reclaim.png',
    regime: 'Flip · poke under + reclaim',
    blurb: 'Key level, dip under, close back. Spot the rush you’d refuse.',
    hotspots: [
      {
        id: 'h1',
        x: 48,
        y: 52,
        title: 'Key level ~4.60',
        body: 'Held twice (the X’s) before the break — that’s why it matters.',
      },
      {
        id: 'h2',
        x: 78,
        y: 68,
        title: 'The dip under',
        body: 'Price poked under the level — a failed break attempt.',
      },
      {
        id: 'h3',
        x: 86,
        y: 42,
        title: 'Back above',
        body: 'Closed back over. After a few confirms (+ BTC), look for entry at the initial untested broken level (~4.60) — not a chase higher.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Flip — not a clean new downtrend',
      why: 'Poked under 4.60 and closed back above',
      action:
        'Wait for a few closes + check BTC, then consider entry at the initial untested broken level (~4.60) — don’t chase the first reclaim',
    },
  },
]

export const GATE_ITEMS = [
  {
    id: 'g1',
    label: 'I can name what’s happening: trend / range (value) / flip',
  },
  {
    id: 'g2',
    label: 'My why matches the laws (HH/HL + 21/55/200 on 15m · value reclaim · poke + close back)',
  },
  {
    id: 'g3',
    label: 'Big picture is on 12H & 6H; entry plan is on 15m',
  },
  {
    id: 'g4',
    label: 'I checked what I refuse (no perfect fills · no middle · no rush)',
  },
  {
    id: 'g5',
    label: 'I’m thinking buyers vs sellers + value — not random lines',
  },
  {
    id: 'g6',
    label: `I can honestly say: “${PHRASE}”`,
  },
] as const

export type StepId =
  | 'intro'
  | 'premise'
  | 'quiz-cold'
  | 'trend'
  | 'quiz-trend'
  | 'range'
  | 'quiz-range'
  | 'transition'
  | 'quiz-transition'
  | 'lab-near'
  | 'mtf'
  | 'quiz-mtf'
  | 'lab-btc12'
  | 'lab-btc8'
  | 'gate'
  | 'complete'

export const STEPS: { id: StepId; label: string }[] = [
  { id: 'intro', label: 'Open' },
  { id: 'premise', label: 'Premise' },
  { id: 'quiz-cold', label: 'Quiz' },
  { id: 'trend', label: 'Trend' },
  { id: 'quiz-trend', label: 'Quiz' },
  { id: 'range', label: 'Range' },
  { id: 'quiz-range', label: 'Quiz' },
  { id: 'transition', label: 'Flip' },
  { id: 'quiz-transition', label: 'Quiz' },
  { id: 'lab-near', label: 'Lab C' },
  { id: 'mtf', label: 'Stack' },
  { id: 'quiz-mtf', label: 'Quiz' },
  { id: 'lab-btc12', label: 'Lab A' },
  { id: 'lab-btc8', label: 'Lab B' },
  { id: 'gate', label: 'Gate' },
  { id: 'complete', label: 'Done' },
]
