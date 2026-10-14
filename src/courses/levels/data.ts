import type { CallChoice, ChartLab, QuizQ } from '../market-structure/data'

export const PHRASE = "You can't regret a well thought out plan."

export const RULES = {
  matter: {
    law: 'Use levels where buyers or sellers already reacted. Prefer higher timeframes, especially when they agree with the 1H–4H.',
    refuse: 'If the level is not clear within about 15 seconds, leave it alone.',
  },
  mechanical: {
    law: 'Watch the 55 and 200 EMAs. Price often reacts there because many buy and sell orders are placed at those averages.',
    refuse: 'Do not ignore those averages. Treat them as real levels, the same way you treat a clear horizontal.',
  },
  magnets: {
    law: 'Price often returns to where volume and emotion left a mark — two wide candles sharing a flat open/close, the midpoint of a long wick, and VWAP for the session.',
    refuse: 'Do not treat every candle as a magnet. Use obvious prints: a flat body pair, a clear long wick, or the session VWAP.',
  },
  profile: {
    law: 'POC is where most volume traded. VAL and VAH are the low and high edges of value. “Premium” and “discount” describe the same idea: expensive vs cheap relative to value.',
    refuse: 'Do not trade the middle of value without a clear reason.',
  },
  discount: {
    law: 'Fibonacci tools help you find a zone quickly. The zone matters when other evidence sits there too — POC, VAL/VAH, EMAs, a broken level, or a strong wick.',
    refuse: 'Do not take a trade from a Fibonacci level alone.',
  },
} as const

export const QUIZZES: Record<string, QuizQ[]> = {
  cold: [
    {
      id: 'c1',
      prompt: 'You cannot find a clear level in about 15 seconds. What should you do?',
      options: [
        { id: 'a', label: 'Skip it — unclear levels should not be used' },
        { id: 'b', label: 'Add more lines until something looks tradable' },
        { id: 'c', label: 'Drop to the 1-minute chart and force an entry' },
      ],
      correct: 'a',
      explain: 'If the level is not obvious quickly, it is usually not worth trading.',
    },
    {
      id: 'c2',
      prompt: 'A 12-hour level lines up with a 2-hour level. Which matters more?',
      options: [
        { id: 'a', label: 'The lower timeframe, because it is more precise' },
        { id: 'b', label: 'Neither — ignore both' },
        { id: 'c', label: 'The higher timeframe first — agreement with 1H–4H makes it stronger' },
      ],
      correct: 'c',
      explain: 'Higher timeframes come first. Alignment with 1H–4H adds weight.',
    },
    {
      id: 'c3',
      prompt: 'You draw six lines in under a minute and still feel unsure. Default?',
      options: [
        { id: 'a', label: 'Trade the thickest line anyway' },
        { id: 'b', label: 'Stay flat — more lines usually means more noise' },
        { id: 'c', label: 'Switch symbols until one “looks better”' },
      ],
      correct: 'b',
      explain: 'Clarity first. A crowded chart is a skip signal, not a green light.',
    },
  ],
  swing: [
    {
      id: 's1',
      prompt: 'When you teach equal highs, focus on…',
      options: [
        { id: 'a', label: 'What buyers and sellers are doing — stops, breaks, and traps' },
        { id: 'b', label: 'The pattern name' },
        { id: 'c', label: 'Always shorting there' },
      ],
      correct: 'a',
      explain: 'Equal highs matter because of how people place stops and react — not because of a label.',
    },
    {
      id: 's2',
      prompt: 'A level held twice, then broke and came back. Why is it important?',
      options: [
        { id: 'a', label: 'Because the number is round' },
        { id: 'b', label: 'Any wick is enough' },
        { id: 'c', label: 'Buyers and sellers already showed interest there' },
      ],
      correct: 'c',
      explain: 'Repeated defense shows real interest. That is why a level like NEAR 4.60 mattered.',
    },
    {
      id: 's3',
      prompt: 'Equal highs are useful mainly because…',
      options: [
        { id: 'a', label: 'Stops and liquidity often sit there — traps and breaks matter' },
        { id: 'b', label: 'The pattern name guarantees a short' },
        { id: 'c', label: 'You must always fade them' },
      ],
      correct: 'a',
      explain: 'Teach the behavior (stops, liquidity, reaction) — not the label.',
    },
  ],
  mechanical: [
    {
      id: 'm1',
      prompt: 'Why watch the 55 and 200 EMAs as levels, not only as trend tools?',
      options: [
        { id: 'a', label: 'They look clean on the chart' },
        { id: 'b', label: 'They replace every horizontal level' },
        { id: 'c', label: 'Orders are often placed there, so price frequently reacts' },
      ],
      correct: 'c',
      explain: 'Many automated and discretionary orders sit at those averages. Expect reactions.',
    },
    {
      id: 'm2',
      prompt: 'Price touches the 200 EMA, prints a long wick, and holds. Best next step?',
      options: [
        { id: 'a', label: 'Mark it and wait for your normal entry signal' },
        { id: 'b', label: 'Ignore it — moving averages are not real levels' },
        { id: 'c', label: 'Buy immediately with no stop' },
      ],
      correct: 'a',
      explain: 'Note the reaction. Still wait for your entry process before you size.',
    },
    {
      id: 'm3',
      prompt: 'You lose the 200 EMA on the context chart with acceptance. Best read?',
      options: [
        { id: 'a', label: 'Nothing changed — EMAs are decoration' },
        { id: 'b', label: 'The average was a level; losing it often changes behavior' },
        { id: 'c', label: 'Double size because “it always snaps back”' },
      ],
      correct: 'b',
      explain: 'Treat the 200 like a real level. Acceptance through it is information.',
    },
  ],
  magnets: [
    {
      id: 'mg1',
      prompt: 'A wide red candle closes flat, then a wide green opens from the same edge. What do you mark?',
      options: [
        { id: 'a', label: 'Only the high of the green candle' },
        { id: 'b', label: 'Nothing — two candles never make a level' },
        { id: 'c', label: 'The shared flat open/close — that level often pulls price back' },
      ],
      correct: 'c',
      explain: 'The flat junction between two wide bodies is the magnet. Price often revisits that edge.',
    },
    {
      id: 'mg2',
      prompt: 'After a long wick, which level is often worth marking besides the extreme?',
      options: [
        { id: 'a', label: 'The midpoint (0.5) of the wick' },
        { id: 'b', label: 'The open of the next candle only' },
        { id: 'c', label: 'Nothing — only the tip of the wick matters' },
      ],
      correct: 'a',
      explain: 'The extreme shows the sweep. The halfway point of the wick is often where price reacts on the retest.',
    },
    {
      id: 'mg3',
      prompt: 'VWAP in this playbook is best thought of as…',
      options: [
        { id: 'a', label: 'A replacement for all higher-timeframe levels' },
        { id: 'b', label: 'Only useful on the weekly chart' },
        { id: 'c', label: 'The session’s volume-weighted average — a magnet after stretches away' },
      ],
      correct: 'c',
      explain: 'VWAP is fair value for the session. Stretches away often pull back toward it.',
    },
    {
      id: 'mg4',
      prompt: 'Every small candle on the chart is a magnet. Agree?',
      options: [
        { id: 'a', label: 'Yes — mark them all' },
        { id: 'b', label: 'No — only obvious prints: flat body pair, clear long wick, or session VWAP' },
        { id: 'c', label: 'Only if the candle is green' },
      ],
      correct: 'b',
      explain: 'Magnets are obvious marks left by volume and emotion — not every tick.',
    },
  ],
  profile: [
    {
      id: 'p1',
      prompt: 'POC means…',
      options: [
        { id: 'a', label: 'The price where the most volume traded' },
        { id: 'b', label: 'The highest wick of the day' },
        { id: 'c', label: 'Your automatic entry' },
      ],
      correct: 'a',
      explain: 'Point of Control is where the market agreed most. Useful context — not a forced entry.',
    },
    {
      id: 'p2',
      prompt: '“Premium” and “discount” are closest to…',
      options: [
        { id: 'a', label: 'A separate system with no link to value' },
        { id: 'b', label: 'Only the 0.618 Fibonacci' },
        { id: 'c', label: 'Expensive vs cheap relative to value — similar to VAH and VAL' },
      ],
      correct: 'c',
      explain: 'Those words describe position versus value. Same auction idea, different vocabulary.',
    },
    {
      id: 'p3',
      prompt: 'For a range long in this playbook, you often want…',
      options: [
        { id: 'a', label: 'Any bounce from the middle of value' },
        { id: 'b', label: 'A reclaim of VAL (the low end of value)' },
        { id: 'c', label: 'Price above the 1-minute VWAP only' },
      ],
      correct: 'b',
      explain: 'Focus on the edge of value — especially a VAL reclaim — not random mid-range trades.',
    },
    {
      id: 'p4',
      prompt: 'VAH is best described as…',
      options: [
        { id: 'a', label: 'Your automatic short entry' },
        { id: 'b', label: 'The high edge of value — where expensive starts relative to the profile' },
        { id: 'c', label: 'The same thing as the daily open' },
      ],
      correct: 'b',
      explain: 'VAH is the upper edge of value. Useful context — still wait for a trigger.',
    },
  ],
  discount: [
    {
      id: 'd1',
      prompt: 'A Fib zone also holds POC, the 55 EMA, and a long wick. How do you treat it?',
      options: [
        { id: 'a', label: 'Treat it as a stronger zone — Fib only helped you find it' },
        { id: 'b', label: 'Trade the Fib number by itself' },
        { id: 'c', label: 'Ignore the EMA because Fibs override everything' },
      ],
      correct: 'a',
      explain: 'Fibonaccis locate. Other evidence decides whether the zone is worth trading.',
    },
    {
      id: 'd2',
      prompt: 'You only have a Fib level — nothing else supports it. Default?',
      options: [
        { id: 'a', label: 'Increase size — Fibs are enough' },
        { id: 'b', label: 'Short it automatically' },
        { id: 'c', label: 'Wait for more evidence, or stay flat' },
      ],
      correct: 'c',
      explain: 'A Fib alone is not an entry. Wait for more support or pass.',
    },
    {
      id: 'd3',
      prompt: 'Best use of Fibonacci in this playbook?',
      options: [
        { id: 'a', label: 'Locate a zone quickly — then check for other evidence' },
        { id: 'b', label: 'Replace every other level tool' },
        { id: 'c', label: 'Enter every 0.618 touch with size' },
      ],
      correct: 'a',
      explain: 'Fib finds. Confluence decides. Size only after the rest of the plan lines up.',
    },
  ],
}

export const LABS: ChartLab[] = [
  {
    id: 'bnb-1d',
    title: 'Lab A — Big picture',
    pair: 'BNBUSDT.P',
    tf: '1D',
    src: '/curriculum/02/bnb-1d-pvah-ema.png',
    regime: 'P-profile · PVAH · EMAs',
    blurb: 'Tap each marker. Read the volume profile, the prior value high, and the EMAs together.',
    hotspots: [
      {
        id: 'h1',
        x: 12,
        y: 38,
        title: 'P-shaped profile',
        body: 'Volume stacked higher on the left — a P-profile. Most trading sat in the upper half of the range.',
      },
      {
        id: 'h2',
        x: 58,
        y: 48,
        title: 'PVAH ~740',
        body: 'Blue line = prior value area high. Price wicked into it (yellow X) while the medium EMA sat nearby.',
      },
      {
        id: 'h3',
        x: 86,
        y: 42,
        title: 'EMA + level together',
        body: 'Averages and PVAH in the same area — stronger than either alone. Wait for a reaction, not a blind buy.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Pullback into prior value high with EMAs nearby',
      why: 'P-profile shows where volume lived; PVAH + EMA is the defense to watch',
      action: 'Wait for a hold or reclaim at ~740 — do not chase halfway through the move',
    },
  },
  {
    id: 'bnb-4h',
    title: 'Lab B — Closer view',
    pair: 'BNBUSDT.P',
    tf: '4H',
    src: '/curriculum/02/bnb-4h-value-zone.png',
    regime: 'Same story · value edge',
    blurb: 'Same plan on 4H. Find the value edge, the magnet zone, and the wick into it.',
    hotspots: [
      {
        id: 'h1',
        x: 42,
        y: 32,
        title: 'Fixed-range profiles',
        body: 'Each orange P-profile marks a stretch of volume. Blue lines project prior VAH / VAL across the chart.',
      },
      {
        id: 'h2',
        x: 62,
        y: 58,
        title: 'Magnet zone ~718–730',
        body: 'Grey band = defended area (yellow X). Aligns with a prior value edge — same idea as a flat or VAL hold.',
      },
      {
        id: 'h3',
        x: 82,
        y: 52,
        title: 'Wick into the zone',
        body: 'Long lower wick tagged the band and held. That is the reaction — still wait for your entry signal.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: '4H clarifies the 1D PVAH / value edge',
      why: 'Lower timeframe shows the wick into a marked magnet zone with EMAs nearby',
      action: 'Wait for confirmation at the zone — seeing the wick is not the same as entering',
    },
  },
  {
    id: 'near-level',
    title: 'Lab C — Key level',
    pair: 'NEARUSDT.P',
    tf: '6H',
    src: '/curriculum/01/near-6h-sweep-reclaim.png',
    regime: 'Held twice · break · reclaim',
    blurb: 'Why 4.60 mattered to buyers and sellers. Then the reclaim plan.',
    hotspots: [
      {
        id: 'h1',
        x: 48,
        y: 52,
        title: 'Level ~4.60',
        body: 'Held twice before the break. That is why it matters — real interest sat there.',
      },
      {
        id: 'h2',
        x: 78,
        y: 68,
        title: 'Dip under',
        body: 'Price broke under briefly — stops were likely hit — then failed to continue lower.',
      },
      {
        id: 'h3',
        x: 86,
        y: 42,
        title: 'Back above',
        body: 'After a few confirming closes, look for entry near the broken level — not far above it.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Key level break and reclaim',
      why: 'Repeated holds showed interest from both sides',
      action: 'Wait for confirmation, then consider the broken level as entry',
    },
  },
]

export const GATE_ITEMS = [
  { id: 'g1', label: 'I named the market condition before choosing levels' },
  { id: 'g2', label: 'My level is clear within about 15 seconds (or I stay flat)' },
  { id: 'g3', label: 'I checked the higher timeframe — stronger when it agrees with 1H–4H' },
  { id: 'g4', label: 'I noted the 55 and 200 EMAs as possible reaction levels' },
  { id: 'g5', label: 'I checked magnets — flat-body pair, wick 0.5, or session VWAP when relevant' },
  { id: 'g6', label: 'The zone has more than a Fib — e.g. POC, VAL, broken level, or wick' },
  { id: 'g7', label: 'I am not trading the middle of value without a clear reason' },
  { id: 'g8', label: `I can honestly say: “${PHRASE}”` },
] as const

export type StepId =
  | 'intro'
  | 'premise'
  | 'quiz-cold'
  | 'swing'
  | 'quiz-swing'
  | 'mechanical'
  | 'quiz-mechanical'
  | 'magnets'
  | 'quiz-magnets'
  | 'profile'
  | 'quiz-profile'
  | 'discount'
  | 'confluence'
  | 'quiz-discount'
  | 'lab-btc'
  | 'lab-ema'
  | 'lab-near'
  | 'play-fill'
  | 'play-match'
  | 'play-tf'
  | 'play-odd'
  | 'play-spell'
  | 'gate'
  | 'complete'

export const STEPS: { id: StepId; label: string }[] = [
  { id: 'intro', label: 'Open' },
  { id: 'premise', label: 'Premise' },
  { id: 'quiz-cold', label: 'Quiz' },
  { id: 'swing', label: 'Swings' },
  { id: 'quiz-swing', label: 'Quiz' },
  { id: 'mechanical', label: 'EMAs' },
  { id: 'quiz-mechanical', label: 'Quiz' },
  { id: 'magnets', label: 'Magnets' },
  { id: 'quiz-magnets', label: 'Quiz' },
  { id: 'profile', label: 'Value' },
  { id: 'quiz-profile', label: 'Quiz' },
  { id: 'discount', label: 'Zones' },
  { id: 'confluence', label: 'Build' },
  { id: 'quiz-discount', label: 'Quiz' },
  { id: 'lab-btc', label: 'Lab A' },
  { id: 'lab-ema', label: 'Lab B' },
  { id: 'lab-near', label: 'Lab C' },
  { id: 'play-fill', label: 'Play' },
  { id: 'play-match', label: 'Play' },
  { id: 'play-tf', label: 'Play' },
  { id: 'play-odd', label: 'Play' },
  { id: 'play-spell', label: 'Play' },
  { id: 'gate', label: 'Gate' },
  { id: 'complete', label: 'Done' },
]

export type { CallChoice, ChartLab, QuizQ }
