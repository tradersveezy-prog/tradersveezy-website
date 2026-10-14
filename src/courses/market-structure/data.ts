export type CallChoice = 'trade' | 'wait' | 'skip'

export const PHRASE = "You can't regret a well thought out plan."

export const RULES = {
  stack: {
    context: '12H · 6H',
    execution: '15m',
  },
  trend: {
    law: 'Higher highs and higher lows. For a long, price should also sit above the 21, 55, and 200 EMAs on the 15-minute chart.',
    refuse: 'Do not wait forever for a perfect entry. Strong trends often do not give one.',
  },
  range: {
    law: 'Focus on where the market already agreed on price — especially a reclaim of the low end of value (VAL).',
    refuse: 'Do not trade the middle of the range without a clear reason.',
  },
  transition: {
    law: 'Price breaks a key level, then closes back inside. Look for volume or RSI support, and a few confirming closes.',
    refuse: 'Do not size up on the first reclaim candle. Wait for confirmation (and check Bitcoin if you are in an alt).',
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
      prompt: 'You open a chart and cannot say if it is trending, ranging, or flipping. What do you do?',
      options: [
        { id: 'a', label: 'Look for a 15-minute entry anyway' },
        { id: 'b', label: 'Stay flat until you can name it clearly' },
        { id: 'c', label: 'Add indicators until a story appears' },
      ],
      correct: 'b',
      explain: 'If you cannot describe the condition, you are guessing. Waiting is a valid choice.',
    },
    {
      id: 'c2',
      prompt: 'What is Course 01 training you to do?',
      options: [
        { id: 'a', label: 'Draw as many levels as possible' },
        { id: 'b', label: 'Learn as many terms as possible' },
        { id: 'c', label: 'Describe what buyers and sellers are doing, and where value sits' },
      ],
      correct: 'c',
      explain: 'Candles show who is winning. Levels without that thinking are just lines.',
    },
    {
      id: 'c3',
      prompt: 'Which is also a valid choice?',
      options: [
        { id: 'a', label: 'No trade today' },
        { id: 'b', label: 'Trade every setup you see' },
        { id: 'c', label: 'Enter first, plan later' },
      ],
      correct: 'a',
      explain: 'Sitting out is part of the job.',
    },
  ],
  trend: [
    {
      id: 't1',
      prompt: 'For a long in this playbook you need…',
      options: [
        { id: 'a', label: 'Higher highs and higher lows only' },
        { id: 'b', label: 'Higher highs and lows, and price above the 21, 55, and 200 EMAs on the 15-minute' },
        { id: 'c', label: 'Price above VWAP on the 1-minute' },
      ],
      correct: 'b',
      explain: 'Structure alone can mislead. On the 15-minute, buyers should still own those three averages.',
    },
    {
      id: 't2',
      prompt: 'A clean trend day never gives a perfect entry wick. You…',
      options: [
        { id: 'a', label: 'Still participate with the trend — do not wait for a textbook fill' },
        { id: 'b', label: 'Skip every trade that day' },
        { id: 'c', label: 'Fade every pullback' },
      ],
      correct: 'a',
      explain: 'Strong trends often deny perfect fills. Waiting for perfection means missing the day.',
    },
    {
      id: 't3',
      prompt: 'Price makes higher highs but sits under the 200 on 15m. Long?',
      options: [
        { id: 'a', label: 'Yes — highs are enough' },
        { id: 'b', label: 'No — buyers should own the averages too' },
        { id: 'c', label: 'Only on the 1-minute' },
      ],
      correct: 'b',
      explain: 'In this playbook, longs want price above 21 · 55 · 200 on 15m.',
    },
  ],
  range: [
    {
      id: 'r1',
      prompt: 'In this playbook, “range” mainly means…',
      options: [
        { id: 'a', label: 'Any equal high and equal low box' },
        { id: 'b', label: 'Trading back and forth in the middle for small gains' },
        { id: 'c', label: 'A value area — especially reclaiming the low end of it' },
      ],
      correct: 'c',
      explain: 'Range work is about value — not random boxes or mid-range noise.',
    },
    {
      id: 'r2',
      prompt: 'Price sits in the middle of value with no reclaim idea. Default?',
      options: [
        { id: 'a', label: 'Stay flat' },
        { id: 'b', label: 'Scalp the middle' },
        { id: 'c', label: 'Force a trend label so you can trade' },
      ],
      correct: 'a',
      explain: 'The middle without a clear idea is where weak trades come from.',
    },
    {
      id: 'r3',
      prompt: 'Where do you usually look first in a range?',
      options: [
        { id: 'a', label: 'The middle' },
        { id: 'b', label: 'The edges of value' },
        { id: 'c', label: 'A random round number' },
      ],
      correct: 'b',
      explain: 'Edges matter. Middle is noise by default.',
    },
  ],
  transition: [
    {
      id: 'x1',
      prompt: 'A key level breaks, then one candle closes back above it. Ready to size up?',
      options: [
        { id: 'a', label: 'Yes — the first reclaim is enough' },
        { id: 'b', label: 'No — wait for a few closes (and check Bitcoin on alts)' },
        { id: 'c', label: 'Yes if RSI is extreme' },
      ],
      correct: 'b',
      explain: 'Break and reclaim is the pattern. Rushing the first candle is the common mistake.',
    },
    {
      id: 'x2',
      prompt: 'NEAR breaks 4.60 (held twice), dips under, then closes back above. What is happening?',
      options: [
        { id: 'a', label: 'A new clean downtrend' },
        { id: 'b', label: 'A clean uptrend — buy immediately' },
        { id: 'c', label: 'A failed break — dip under, then reclaim' },
      ],
      correct: 'c',
      explain:
        'It broke and came back. After confirmation, consider entry near the broken level (~4.60), not far above it.',
    },
    {
      id: 'x3',
      prompt: 'On an altcoin flip, you should also…',
      options: [
        { id: 'a', label: 'Ignore Bitcoin' },
        { id: 'b', label: 'Check Bitcoin' },
        { id: 'c', label: 'Only watch the 1-minute' },
      ],
      correct: 'b',
      explain: 'Bitcoin can wreck a clean alt chart. Glance at it.',
    },
  ],
  mtf: [
    {
      id: 'm1',
      prompt: 'Your day-trade chart setup is…',
      options: [
        { id: 'a', label: 'Context on 12H and 6H · entry on 15m' },
        { id: 'b', label: '1m + 5m + 15m + 1H + 4H' },
        { id: 'c', label: 'Daily only' },
      ],
      correct: 'a',
      explain: 'Two charts for context, one for the entry. Drop charts that do not change the decision.',
    },
    {
      id: 'm2',
      prompt: '12H shows a clean bullish pullback into a buy zone. You buy halfway there on 15m. Problem?',
      options: [
        { id: 'a', label: 'No problem — the big picture is bullish' },
        { id: 'b', label: 'You needed a 1-minute chart' },
        { id: 'c', label: 'You knew the zone — buying early skips waiting for a reaction there' },
      ],
      correct: 'c',
      explain: 'Context names the zone. Entry waits for the reaction at that level.',
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
    blurb: 'What is the story on this chart? Tap each marker, then choose trade, wait, or skip.',
    hotspots: [
      {
        id: 'h1',
        x: 28,
        y: 32,
        title: 'Where volume built',
        body: 'Most trading on the advance happened here. Price has pulled back below that area.',
      },
      {
        id: 'h2',
        x: 62,
        y: 58,
        title: 'Buy zone',
        body: 'The long idea sits in the cheaper area — not halfway through the range.',
      },
      {
        id: 'h3',
        x: 78,
        y: 72,
        title: 'Invalidation',
        body: 'Stop under the defense. Mark entry, stop, and target before you size.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Uptrend · pullback into value',
      why: 'Higher highs and lows, then a pullback into a cheaper area — not a new downtrend',
      action: 'Wait for a 15-minute signal at the zone',
    },
  },
  {
    id: 'btc-8h',
    title: 'Lab B — Closer view',
    pair: 'BTCUSDT.P',
    tf: '8H',
    src: '/curriculum/01/btc-8h-long-setup.png',
    regime: 'Same uptrend · clearer level',
    blurb: 'Same plan, closer chart. The big picture named it — this frame clarifies the level.',
    hotspots: [
      {
        id: 'h1',
        x: 22,
        y: 40,
        title: 'The advance',
        body: 'The leg you measure the pullback against.',
      },
      {
        id: 'h2',
        x: 55,
        y: 62,
        title: 'Support ~81–82k',
        body: 'Horizontal support where buyers are expected to show up.',
      },
      {
        id: 'h3',
        x: 82,
        y: 48,
        title: 'The plan',
        body: 'Same invalidation idea as the 12H. Timing still belongs on the 15-minute.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Uptrend pullback · clearer support',
      why: '8H clarifies the level — it does not change the 12H story',
      action: 'Wait for the 15-minute — seeing the level is not the same as entering',
    },
  },
  {
    id: 'near-6h',
    title: 'Lab C — Flip',
    pair: 'NEARUSDT.P',
    tf: '6H',
    src: '/curriculum/01/near-6h-sweep-reclaim.png',
    regime: 'Break under · close back',
    blurb: 'Key level, dip under, close back. Notice the urge to enter too early.',
    hotspots: [
      {
        id: 'h1',
        x: 48,
        y: 52,
        title: 'Key level ~4.60',
        body: 'Held twice before the break — that is why it matters.',
      },
      {
        id: 'h2',
        x: 78,
        y: 68,
        title: 'Dip under',
        body: 'Price broke under briefly — a failed continuation lower.',
      },
      {
        id: 'h3',
        x: 86,
        y: 42,
        title: 'Back above',
        body: 'After a few confirming closes (and Bitcoin on alts), consider entry near ~4.60 — not far above.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Failed break — not a clean new downtrend',
      why: 'Broke under 4.60 and closed back above',
      action:
        'Wait for a few closes and check Bitcoin, then consider entry at the broken level (~4.60)',
    },
  },
]

export const GATE_ITEMS = [
  {
    id: 'g1',
    label: 'I can name the condition: trend / range (value) / flip',
  },
  {
    id: 'g2',
    label: 'My reason matches the rules (HH/HL + 21/55/200 on 15m · value reclaim · break and reclaim)',
  },
  {
    id: 'g3',
    label: 'Context is on 12H and 6H; entry plan is on 15m',
  },
  {
    id: 'g4',
    label: 'I checked what to avoid (no perfect fills · no middle · no rush)',
  },
  {
    id: 'g5',
    label: 'I am thinking about buyers, sellers, and value — not random lines',
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
  | 'play-fill'
  | 'play-match'
  | 'play-order'
  | 'play-spell'
  | 'video'
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
  { id: 'mtf', label: 'Charts' },
  { id: 'quiz-mtf', label: 'Quiz' },
  { id: 'lab-btc12', label: 'Lab A' },
  { id: 'lab-btc8', label: 'Lab B' },
  { id: 'play-fill', label: 'Fill-in' },
  { id: 'play-match', label: 'Match' },
  { id: 'play-order', label: 'Order' },
  { id: 'play-spell', label: 'Spell' },
  { id: 'video', label: 'Video' },
  { id: 'gate', label: 'Gate' },
  { id: 'complete', label: 'Done' },
]

/** YouTube id for the module walkthrough (embed near end, before gate). */
export const MODULE_VIDEO = {
  youtubeId: 'zMesjgeACSM',
  posterSrc: '/curriculum/01/video-cover.jpg',
  title: 'Market Structure — Course 01',
} as const
