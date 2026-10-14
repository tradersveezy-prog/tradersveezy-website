import type { CallChoice, ChartLab, QuizQ } from '../market-structure/data'

export const PHRASE = "You can't regret a well thought out plan."

export const RULES = {
  premise: {
    law: 'A trigger confirms the idea. An entry is where you actually enter. Nothing is guaranteed — we play probabilities.',
    refuse: 'Do not enter without a named condition (Course 01) and a clear level (Course 02).',
  },
  retest: {
    law: 'After a market structure shift past liquidity, wait for the break to lock with closes — then enter on the revisit to the broken level.',
    refuse: 'Do not treat every dip into a level as a retest. No MSS, no break, no retest.',
  },
  ema: {
    law: 'EMA reclaim = a strong impulse through a watched average, then 2–3 closes holding that side. Watch 4H 55/200 and 15m 21/55/200.',
    refuse: 'Do not enter the first touch or a weak wick through the average. Wait for impulse + acceptance closes.',
  },
  breakout: {
    law: 'Level rejected ~5 times, then a candle closes through it. Expect a sweep for liquidity — enter on the reclaim after that sweep, hard stop past the sweep extreme.',
    refuse: 'Do not enter the first breakout close alone. Wait for the sweep and the reclaim.',
  },
  volume: {
    law: 'Triggers need volume support — directional participation, not only shorts or longs covering.',
    refuse: 'Do not trust a thin break with no volume story.',
  },
  invalidation: {
    law: 'Use hard stops. The idea is right or wrong. Macro and news can kill a clean chart — stay informed.',
    refuse: 'No soft stops. Do not chase past TP2 of your plan.',
  },
} as const

export const QUIZZES: Record<string, QuizQ[]> = {
  cold: [
    {
      id: 'c1',
      prompt: 'In this playbook, a “trigger” is…',
      options: [
        { id: 'a', label: 'Any candle color you like' },
        { id: 'b', label: 'The signal that confirms the idea before you enter' },
        { id: 'c', label: 'A guarantee the trade will win' },
      ],
      correct: 'b',
      explain: 'Triggers confirm. Entries place the order. Probabilities — not guarantees.',
    },
    {
      id: 'c2',
      prompt: 'Your entry / trigger timeframes are mainly…',
      options: [
        { id: 'a', label: '15m and 30m (with meaningful closes)' },
        { id: 'b', label: '1-minute only' },
        { id: 'c', label: 'Weekly only' },
      ],
      correct: 'a',
      explain: 'Context stays on 12H / 6H. Triggers live on 15m / 30m — closes matter.',
    },
    {
      id: 'c3',
      prompt: 'You have no named condition and no clear level. Default?',
      options: [
        { id: 'a', label: 'Enter anyway — “feel” is enough' },
        { id: 'b', label: 'Stay flat until Courses 01 and 02 are satisfied' },
        { id: 'c', label: 'Size up to make up for uncertainty' },
      ],
      correct: 'b',
      explain: 'Trigger comes last. No condition + no level = no entry.',
    },
  ],
  retest: [
    {
      id: 'r1',
      prompt: 'A real retest in this playbook usually comes after…',
      options: [
        { id: 'a', label: 'A random wick into a round number' },
        { id: 'b', label: 'Any equal high' },
        { id: 'c', label: 'A structure shift past liquidity, then a break that locks with closes' },
      ],
      correct: 'c',
      explain: 'MSS past a liquidity level, break with closes, then revisit the broken level.',
    },
    {
      id: 'r2',
      prompt: 'Where do you look to enter the retest?',
      options: [
        { id: 'a', label: 'At the broken level that caused the structure shift' },
        { id: 'b', label: 'Far above the break, chasing the move' },
        { id: 'c', label: 'In the middle of the prior range with no level' },
      ],
      correct: 'a',
      explain: 'The retest is the revisit to that broken level — not a chase higher or lower.',
    },
    {
      id: 'r3',
      prompt: 'Price dips into a round number with no prior MSS or break. Is that a retest?',
      options: [
        { id: 'a', label: 'Yes — every dip is a retest' },
        { id: 'b', label: 'No — without structure shift and break, it is just a dip' },
        { id: 'c', label: 'Only if the candle is green' },
      ],
      correct: 'b',
      explain: 'No MSS, no break, no retest. Random dips are not the playbook trigger.',
    },
  ],
  ema: [
    {
      id: 'e1',
      prompt: 'What counts as an EMA reclaim here?',
      options: [
        { id: 'a', label: 'A single wick that tags the average' },
        { id: 'b', label: 'A strong impulse through the average, then 2–3 closes holding that side' },
        { id: 'c', label: 'Price sitting under the average all day' },
      ],
      correct: 'b',
      explain: 'Impulse + acceptance closes. Touches alone are not enough.',
    },
    {
      id: 'e2',
      prompt: 'Which averages are on the watch list?',
      options: [
        { id: 'a', label: 'Only the 1-minute VWAP' },
        { id: 'b', label: 'Only the daily SMA 50' },
        { id: 'c', label: '4H 55 & 200 · 15m 21, 55, and 200' },
      ],
      correct: 'c',
      explain: 'Those are the averages you treat as protected levels for reclaim entries.',
    },
    {
      id: 'e3',
      prompt: 'Price tags the 55 EMA with a single wick and continues. Entry?',
      options: [
        { id: 'a', label: 'Enter on the wick alone' },
        { id: 'b', label: 'Wait — reclaim needs impulse through + 2–3 holding closes' },
        { id: 'c', label: 'Remove the stop and hope' },
      ],
      correct: 'b',
      explain: 'Touches are not reclaims. Impulse + acceptance closes first.',
    },
  ],
  breakout: [
    {
      id: 'b1',
      prompt: 'Before a breakout is “worthy,” you generally want…',
      options: [
        { id: 'a', label: 'About 5+ touches without a break' },
        { id: 'b', label: 'One touch and a hope' },
        { id: 'c', label: 'No prior defense at all' },
      ],
      correct: 'a',
      explain: 'Repeated defense makes the level meaningful when it finally breaks.',
    },
    {
      id: 'b2',
      prompt: 'The clean breakout sequence in this module is…',
      options: [
        { id: 'a', label: 'Enter the first candle that looks green' },
        { id: 'b', label: '5 rejections · break close · sweep · entry on the reclaim' },
        { id: 'c', label: 'Double exposure because FOMO' },
      ],
      correct: 'b',
      explain: 'Reject, break and close, let liquidity get swept, then enter the reclaim — hard stop past the sweep.',
    },
    {
      id: 'b3',
      prompt: 'Where does invalidation usually sit on that breakout sequence?',
      options: [
        { id: 'a', label: 'Wherever feels comfortable' },
        { id: 'b', label: 'There is never an invalidation' },
        { id: 'c', label: 'Beyond the sweep extreme — hard stop' },
      ],
      correct: 'c',
      explain: 'Hard stop past the sweep. Soft stops are not in this playbook.',
    },
    {
      id: 'b4',
      prompt: 'The first candle closes through a well-defended level. You…',
      options: [
        { id: 'a', label: 'Enter that close alone' },
        { id: 'b', label: 'Wait for the sweep, then the reclaim' },
        { id: 'c', label: 'Double size because FOMO' },
      ],
      correct: 'b',
      explain: 'Break close proves acceptance of the break — still not the entry by itself.',
    },
  ],
  refuse: [
    {
      id: 'f1',
      prompt: 'Price already hit TP2 of your plan and is still running. You…',
      options: [
        { id: 'a', label: 'Chase a new entry at TP2+' },
        { id: 'b', label: 'Stay out of chase — TP1 showed acceptance; TP2 is not your chase zone' },
        { id: 'c', label: 'Remove the stop and hope' },
      ],
      correct: 'b',
      explain: 'Do not chase past TP2. Acceptance at TP1 is enough signal that the move was real.',
    },
    {
      id: 'f2',
      prompt: 'Soft stops in this playbook?',
      options: [
        { id: 'a', label: 'Never — hard stops; the idea is right or wrong' },
        { id: 'b', label: 'Always — give every trade “room”' },
        { id: 'c', label: 'Only on Fridays' },
      ],
      correct: 'a',
      explain: 'Hard invalidation. If a wick takes you out, live to fight another day.',
    },
    {
      id: 'f3',
      prompt: 'A clean chart setup hits a major macro headline mid-trade. Mindset?',
      options: [
        { id: 'a', label: 'Ignore the world — TA always wins' },
        { id: 'b', label: 'Macro and news can kill a clean chart — stay informed' },
        { id: 'c', label: 'Remove the stop during news' },
      ],
      correct: 'b',
      explain: 'Hard stops stay. Awareness of macro risk is part of the plan.',
    },
  ],
}

export const LABS: ChartLab[] = [
  {
    id: 'apt-ema',
    title: 'Lab A — EMA reclaim',
    pair: 'APTUSDT.P',
    tf: '4H',
    src: '/curriculum/03/apt-4h-ema-reclaim.png',
    regime: 'Reclaim · averages',
    blurb: 'Tap each marker. Find the reclaim into the EMAs and what you wait for before entering.',
    hotspots: [
      {
        id: 'h1',
        x: 48,
        y: 55,
        title: 'Protected averages',
        body: 'Price pulled into the medium EMA area after the advance — that is the level to watch, not mid-air.',
      },
      {
        id: 'h2',
        x: 72,
        y: 48,
        title: 'Hold / reclaim',
        body: 'Look for impulse through or hold of the average, then closes that show acceptance — not one wick.',
      },
      {
        id: 'h3',
        x: 88,
        y: 38,
        title: 'Your call',
        body: 'If closes hold the reclaim, plan the entry on the trigger TF. If not, wait or skip.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Pullback into EMA defense after an advance',
      why: 'Averages are protected levels — reclaim needs impulse + acceptance closes',
      action: 'Wait for 2–3 holds on your entry TF before you enter',
    },
  },
  {
    id: 'avax-val',
    title: 'Lab B — Value break',
    pair: 'AVAXUSDT.P',
    tf: '6H',
    src: '/curriculum/03/avax-6h-val-break.png',
    regime: 'Lost value · short idea',
    blurb: 'Value broke. Tap the markers — then decide trade / wait / skip.',
    hotspots: [
      {
        id: 'h1',
        x: 35,
        y: 40,
        title: 'Prior value',
        body: 'Volume profile marked where the market agreed. That zone was the battlefield.',
      },
      {
        id: 'h2',
        x: 62,
        y: 48,
        title: 'Lost VAL / POC',
        body: 'Price lost the low end of value / high-volume node. For shorts, that loss is the structure tell.',
      },
      {
        id: 'h3',
        x: 82,
        y: 62,
        title: 'Continuation',
        body: 'After the break, wait for your trigger (retest of broken value, or reclaim fail) — do not chase the first flush.',
      },
    ],
    correctCall: 'wait',
    decision: {
      story: 'Value lost — short opportunity developing',
      why: 'Losing VAL / POC changes acceptance; still need a trigger to enter',
      action: 'Wait for retest of broken value or a clear hold below — then enter with a hard stop',
    },
  },
  {
    id: 'bch-monday',
    title: 'Lab C — Level break',
    pair: 'BCHUSDT.P',
    tf: '8H',
    src: '/curriculum/03/bch-8h-monday-low.png',
    regime: 'Monday low lost',
    blurb: 'Liquidity levels labeled. Tap each — then call the short trigger.',
    hotspots: [
      {
        id: 'h1',
        x: 70,
        y: 28,
        title: 'Liquidity map',
        body: 'PMH, PWH, Monday high/low — these are the levels people defend and raid.',
      },
      {
        id: 'h2',
        x: 78,
        y: 42,
        title: 'Monday low broken',
        body: 'Losing Monday low is a clean structure tell for the short idea on this chart.',
      },
      {
        id: 'h3',
        x: 86,
        y: 55,
        title: 'Enter the trigger',
        body: 'Enter on the break / retest sequence with a hard stop above the level — not a soft “mental” stop.',
      },
    ],
    correctCall: 'trade',
    decision: {
      story: 'Monday low lost — short trigger',
      why: 'Named liquidity level broke; the plan is defined',
      action: 'Enter with invalidation above the broken Monday low — hard stop',
    },
  },
]

export const GATE_ITEMS = [
  { id: 'g1', label: 'I named the condition (Course 01) and the level (Course 02) before looking for a trigger' },
  { id: 'g2', label: 'My trigger matches the playbook (retest after MSS · EMA reclaim · breakout sequence · value flip)' },
  { id: 'g3', label: 'I am on 15m / 30m for the entry — closes matter' },
  { id: 'g4', label: 'I am not entering the first break close alone — I waited for sweep + reclaim (or I skipped)' },
  { id: 'g5', label: 'Volume supports a directional move — not only covering' },
  { id: 'g6', label: 'Hard stop is defined — no soft stops' },
  { id: 'g7', label: 'I checked macro / news risk that could kill a clean chart' },
  { id: 'g8', label: `I can honestly say: “${PHRASE}”` },
] as const

export type StepId =
  | 'intro'
  | 'premise'
  | 'quiz-cold'
  | 'retest'
  | 'quiz-retest'
  | 'ema'
  | 'quiz-ema'
  | 'breakout'
  | 'quiz-breakout'
  | 'volume'
  | 'refuse'
  | 'quiz-refuse'
  | 'lab-apt'
  | 'lab-avax'
  | 'lab-bch'
  | 'play-order'
  | 'play-fill'
  | 'play-match'
  | 'play-tf'
  | 'play-spell'
  | 'gate'
  | 'complete'

export const STEPS: { id: StepId; label: string }[] = [
  { id: 'intro', label: 'Open' },
  { id: 'premise', label: 'Premise' },
  { id: 'quiz-cold', label: 'Quiz' },
  { id: 'retest', label: 'Retest' },
  { id: 'quiz-retest', label: 'Quiz' },
  { id: 'ema', label: 'EMA' },
  { id: 'quiz-ema', label: 'Quiz' },
  { id: 'breakout', label: 'Breakout' },
  { id: 'quiz-breakout', label: 'Quiz' },
  { id: 'volume', label: 'Volume' },
  { id: 'refuse', label: 'Rules' },
  { id: 'quiz-refuse', label: 'Quiz' },
  { id: 'lab-apt', label: 'Lab A' },
  { id: 'lab-avax', label: 'Lab B' },
  { id: 'lab-bch', label: 'Lab C' },
  { id: 'play-order', label: 'Play' },
  { id: 'play-fill', label: 'Play' },
  { id: 'play-match', label: 'Play' },
  { id: 'play-tf', label: 'Play' },
  { id: 'play-spell', label: 'Play' },
  { id: 'gate', label: 'Gate' },
  { id: 'complete', label: 'Done' },
]

export type { CallChoice, ChartLab, QuizQ }
