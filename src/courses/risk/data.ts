import type { CallChoice, ChartLab, QuizQ } from '../market-structure/data'

export const PHRASE = "You can't regret a well thought out plan."

/** Playbook defaults for teaching — not a promise of edge. */
export const ATR = {
  period: 14,
  /** Stop distance vs ATR(14) on the entry timeframe */
  minMult: 0.75,
  maxMult: 2,
} as const

export const RULES = {
  premise: {
    law: 'Stop first. Size from the dollars you can lose. A good entry with a random size is still a bad trade.',
    refuse: 'Do not pick size first and invent a stop that “fits.” Invalidation comes from the chart.',
  },
  stop: {
    law: 'Place the hard stop beyond structure — swing extreme, broken level, or sweep wick that kills the idea.',
    refuse: 'Do not use a round-number stop or a fixed % that ignores where the thesis dies.',
  },
  atr: {
    law: `ATR(${ATR.period}) confirms the stop. Distance should usually sit between ~${ATR.minMult}× and ~${ATR.maxMult}× ATR on the entry TF so noise does not stop you — and you are not paying for dead air.`,
    refuse: 'Do not skip structure and “just use 1× ATR.” ATR is a check, not the level.',
  },
  rr: {
    law: 'Know risk : reward before you size. Under ~1.5R is usually a pass unless the playbook says otherwise.',
    refuse: 'Do not move the target closer to force a pretty R:R after you already liked the trade.',
  },
  size: {
    law: 'Position size = (account × risk %) ÷ stop distance. Same idea, same risk — size flexes with the stop.',
    refuse: 'Do not revenge-size after a loss. Do not widen the stop to keep the same size.',
  },
  refuse: {
    law: 'Hard stop means hard. If price takes it, you are out. Review later — not mid-trade.',
    refuse: 'No soft stops. No adding to a loser. No moving invalidation farther because you “feel” it.',
  },
} as const

export const QUIZZES: Record<string, QuizQ[]> = {
  cold: [
    {
      id: 'c1',
      prompt: 'What defines risk in this playbook before you touch size?',
      options: [
        { id: 'a', label: 'How confident you feel today' },
        { id: 'b', label: 'Where the idea is wrong — the hard stop' },
        { id: 'c', label: 'The exchange’s max leverage' },
      ],
      correct: 'b',
      explain: 'Invalidation first. Size is math from that distance and your dollar risk.',
    },
    {
      id: 'c2',
      prompt: 'You love the entry but have not named a stop. Default?',
      options: [
        { id: 'a', label: 'Enter small and figure the stop later' },
        { id: 'b', label: 'Use a 2% stop because that is common' },
        { id: 'c', label: 'Stay flat until invalidation is clear' },
      ],
      correct: 'c',
      explain: 'No stop, no trade. Confidence is not a substitute for a plan.',
    },
    {
      id: 'c3',
      prompt: 'You feel sure about the trade. That means…',
      options: [
        { id: 'a', label: 'You can skip the stop' },
        { id: 'b', label: 'You still need a hard stop and a size' },
        { id: 'c', label: 'You should max leverage' },
      ],
      correct: 'b',
      explain: 'Feeling sure is not a plan. Stop and size still come first.',
    },
  ],
  stop: [
    {
      id: 's1',
      prompt: 'A structure stop for a long usually sits…',
      options: [
        { id: 'a', label: 'A few ticks under entry so R:R looks huge' },
        { id: 'b', label: 'Beyond the swing / level / sweep that kills the long thesis' },
        { id: 'c', label: 'Exactly at the round number below' },
      ],
      correct: 'b',
      explain: 'The stop answers: where is this idea wrong? That spot is structural.',
    },
    {
      id: 's2',
      prompt: 'You pick a stop that keeps size large but sits inside the noise of the level. Problem?',
      options: [
        { id: 'a', label: 'None — tighter is always better' },
        { id: 'b', label: 'You optimized size, not invalidation' },
        { id: 'c', label: 'You should use more leverage instead' },
      ],
      correct: 'b',
      explain: 'Stop from thesis. Size follows. Never reverse that order.',
    },
    {
      id: 's3',
      prompt: 'Best place for a long stop?',
      options: [
        { id: 'a', label: 'A round number that looks neat' },
        { id: 'b', label: 'Past the swing that kills the long' },
        { id: 'c', label: 'Wherever size stays huge' },
      ],
      correct: 'b',
      explain: 'Invalidation is a chart place — not a pretty number.',
    },
  ],
  atr: [
    {
      id: 'a1',
      prompt: 'ATR’s job next to a structure stop is to…',
      options: [
        { id: 'a', label: 'Replace the swing low with a fixed multiple' },
        { id: 'b', label: 'Confirm the stop has room for normal noise — and is not absurdly wide' },
        { id: 'c', label: 'Tell you the exact entry candle' },
      ],
      correct: 'b',
      explain: 'Structure places it. ATR sanity-checks distance vs current volatility.',
    },
    {
      id: 'a2',
      prompt: `Structure stop is 0.3× ATR(14) under your long entry. Likely call?`,
      options: [
        { id: 'a', label: 'Perfect — tiny risk always wins' },
        { id: 'b', label: 'Too tight — noise may tag you before the idea plays' },
        { id: 'c', label: 'Widen to 5× ATR and keep the same size' },
      ],
      correct: 'b',
      explain: `Under ~${ATR.minMult}× ATR is usually noise territory. Give the idea room or skip.`,
    },
    {
      id: 'a3',
      prompt: `Structure stop is 3.5× ATR away. Best response?`,
      options: [
        { id: 'a', label: 'Take full size anyway — structure is sacred' },
        { id: 'b', label: 'Re-check the level, cut size, or pass — distance may be too expensive' },
        { id: 'c', label: 'Move the stop halfway to “fix” ATR' },
      ],
      correct: 'b',
      explain: `Past ~${ATR.maxMult}× ATR, ask if the trade is still worth the dollar risk — or size down.`,
    },
  ],
  rr: [
    {
      id: 'rr1',
      prompt: 'Risk : reward is measured from…',
      options: [
        { id: 'a', label: 'Entry → stop vs entry → planned target' },
        { id: 'b', label: 'Yesterday’s P&L' },
        { id: 'c', label: 'How loud Discord is' },
      ],
      correct: 'a',
      explain: 'R:R is geometry of the plan — not vibes.',
    },
    {
      id: 'rr2',
      prompt: 'Planned R:R is 1.1. Default in this playbook?',
      options: [
        { id: 'a', label: 'Usually a pass' },
        { id: 'b', label: 'Double size to make it worth it' },
        { id: 'c', label: 'Move stop closer until it shows 3R' },
      ],
      correct: 'a',
      explain: 'Asymmetry matters. Forcing the math after the fact is how accounts die.',
    },
  ],
  size: [
    {
      id: 'z1',
      prompt: 'Account $10,000 · risk 1% · stop $50 away. Approx size?',
      options: [
        { id: 'a', label: '2 units ($100 risk ÷ $50)' },
        { id: 'b', label: '200 units' },
        { id: 'c', label: 'Whatever the exchange suggests' },
      ],
      correct: 'a',
      explain: '$100 risk ÷ $50 per unit = 2 units. Size follows the stop.',
    },
    {
      id: 'z2',
      prompt: 'Same idea, but a wider structure stop. You…',
      options: [
        { id: 'a', label: 'Keep the same size and accept bigger $ loss' },
        { id: 'b', label: 'Cut size so dollar risk stays the plan' },
        { id: 'c', label: 'Delete the stop' },
      ],
      correct: 'b',
      explain: 'Dollar risk is the constant. Size is the variable.',
    },
  ],
  refuse: [
    {
      id: 'f1',
      prompt: 'Price tags your hard stop by a wick. You…',
      options: [
        { id: 'a', label: 'Re-enter larger to “get it back”' },
        { id: 'b', label: 'Move the stop farther and hope' },
        { id: 'c', label: 'Accept the loss — invalidation hit' },
      ],
      correct: 'c',
      explain: 'Hard stop means the idea was wrong (or unlucky). Live for the next A+ plan.',
    },
    {
      id: 'f2',
      prompt: 'After two losers you want to “make it back” with 5% risk. Call?',
      options: [
        { id: 'a', label: 'Allowed if the setup is good' },
        { id: 'b', label: 'Refuse — revenge size is not the playbook' },
        { id: 'c', label: 'Only on BTC' },
      ],
      correct: 'b',
      explain: 'Process over emotion. Size stays in the plan.',
    },
  ],
}

/** Decision labs — diagram stages (no screenshot dependency). */
export type RiskLabDef = {
  id: string
  title: string
  pair: string
  tf: string
  regime: string
  blurb: string
  diagram: 'structure' | 'atr' | 'size'
  hotspots: { id: string; x: number; y: number; title: string; body: string }[]
  correctCall: CallChoice
  decision: { story: string; why: string; action: string }
}

export const RISK_LABS: RiskLabDef[] = [
  {
    id: 'lab-structure',
    title: 'Lab A — Structure stop',
    pair: 'LONG SETUP',
    tf: '15m',
    regime: 'Invalidation beyond swing',
    blurb: 'Tap the markers. Find where the long idea dies — that is the stop zone.',
    diagram: 'structure',
    hotspots: [
      {
        id: 'h1',
        x: 28,
        y: 42,
        title: 'Entry zone',
        body: 'Trigger fired at the level. Entry is here — risk is not.',
      },
      {
        id: 'h2',
        x: 52,
        y: 68,
        title: 'Swing / sweep extreme',
        body: 'Beyond this low the long thesis is wrong. Hard stop lives past it — not inside the wick clutter.',
      },
      {
        id: 'h3',
        x: 78,
        y: 55,
        title: 'Fake “tight” stop',
        body: 'A stop just under entry looks pretty on R:R and dies to noise. Structure first.',
      },
    ],
    correctCall: 'trade',
    decision: {
      story: 'Long with invalidation under the swing',
      why: 'Stop answers where the idea dies — not where size feels comfortable',
      action: 'Place hard stop beyond the swing / sweep, then check ATR and size',
    },
  },
  {
    id: 'lab-atr',
    title: 'Lab B — ATR confirm',
    pair: 'ATR(14) CHECK',
    tf: '15m',
    regime: 'Structure + volatility',
    blurb: 'Structure stop is set. Tap markers — decide if ATR confirms, wait, or skip.',
    diagram: 'atr',
    hotspots: [
      {
        id: 'h1',
        x: 30,
        y: 48,
        title: 'Structure stop',
        body: 'Already beyond the level that kills the idea. Do not move it for ATR alone.',
      },
      {
        id: 'h2',
        x: 55,
        y: 36,
        title: 'ATR band',
        body: `Healthy band ≈ ${ATR.minMult}×–${ATR.maxMult}× ATR from entry. Inside = noise risk. Far outside = expensive risk.`,
      },
      {
        id: 'h3',
        x: 80,
        y: 58,
        title: 'This stop ≈ 1.1× ATR',
        body: 'Distance sits in the band. ATR confirms — proceed to R:R and size.',
      },
    ],
    correctCall: 'trade',
    decision: {
      story: 'Structure stop confirmed by ATR',
      why: 'About 1.1× ATR — room for noise without paying for dead air',
      action: 'Keep the structure stop. Size from dollar risk ÷ distance',
    },
  },
  {
    id: 'lab-size',
    title: 'Lab C — Size the plan',
    pair: 'ACCOUNT RISK',
    tf: 'PLAN',
    regime: 'Same $ risk',
    blurb: 'Wider stop, same idea. Tap markers — what happens to size?',
    diagram: 'size',
    hotspots: [
      {
        id: 'h1',
        x: 25,
        y: 40,
        title: 'Dollar risk locked',
        body: '1% of account is the constant. Emotion does not change it.',
      },
      {
        id: 'h2',
        x: 55,
        y: 55,
        title: 'Wider structure stop',
        body: 'Invalidation is farther. Distance up → size must come down.',
      },
      {
        id: 'h3',
        x: 82,
        y: 42,
        title: 'Revenge size trap',
        body: 'Keeping old size with a wider stop silently raises dollar risk. Refuse.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Recalculate size for the real stop',
      why: 'Dollar risk stays fixed; size is the variable',
      action: 'Cut size to match the wider stop — or pass if R:R fails',
    },
  },
]

/** Unused by Risk page — kept for ChartLab type compatibility if needed. */
export const LABS: ChartLab[] = []

export const GATE_ITEMS = [
  { id: 'g1', label: 'Hard stop is beyond structure (swing / broken level / sweep) — not a round number' },
  {
    id: 'g2',
    label: `ATR(${ATR.period}) confirms distance (~${ATR.minMult}×–${ATR.maxMult}×) — ATR did not invent the stop`,
  },
  { id: 'g3', label: 'R:R is known from entry → stop vs entry → target before I size' },
  { id: 'g4', label: 'Size = (account × risk %) ÷ stop distance — dollar risk is the constant' },
  { id: 'g5', label: 'I will not widen the stop or revenge-size if I am wrong' },
  { id: 'g6', label: `I can honestly say: “${PHRASE}”` },
] as const

export type StepId =
  | 'intro'
  | 'premise'
  | 'quiz-cold'
  | 'stop'
  | 'quiz-stop'
  | 'atr'
  | 'quiz-atr'
  | 'rr'
  | 'quiz-rr'
  | 'size'
  | 'quiz-size'
  | 'refuse'
  | 'quiz-refuse'
  | 'lab-structure'
  | 'lab-atr'
  | 'lab-size'
  | 'play-fill'
  | 'play-match'
  | 'play-order'
  | 'gate'
  | 'complete'

export const STEPS: { id: StepId; label: string }[] = [
  { id: 'intro', label: 'Open' },
  { id: 'premise', label: 'Premise' },
  { id: 'quiz-cold', label: 'Quiz' },
  { id: 'stop', label: 'Stop' },
  { id: 'quiz-stop', label: 'Quiz' },
  { id: 'atr', label: 'ATR' },
  { id: 'quiz-atr', label: 'Quiz' },
  { id: 'rr', label: 'R:R' },
  { id: 'quiz-rr', label: 'Quiz' },
  { id: 'size', label: 'Size' },
  { id: 'quiz-size', label: 'Quiz' },
  { id: 'refuse', label: 'Rules' },
  { id: 'quiz-refuse', label: 'Quiz' },
  { id: 'lab-structure', label: 'Lab A' },
  { id: 'lab-atr', label: 'Lab B' },
  { id: 'lab-size', label: 'Lab C' },
  { id: 'play-fill', label: 'Fill-in' },
  { id: 'play-match', label: 'Match' },
  { id: 'play-order', label: 'Order' },
  { id: 'gate', label: 'Gate' },
  { id: 'complete', label: 'Done' },
]

export type { CallChoice, ChartLab, QuizQ }
