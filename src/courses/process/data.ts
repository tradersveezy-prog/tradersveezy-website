import type { CallChoice, QuizQ } from '../market-structure/data'
import type { RiskLabDef } from '../risk/data'

export const PHRASE = "You can't regret a well thought out plan."

export const RULES = {
  premise: {
    law: 'Do the steps in order. Then look back. If you skip looking back, you will make the same mistake again.',
    refuse: 'A winning day does not mean your habits are good. A losing day does not mean you should quit the plan.',
  },
  checklist: {
    law: 'Before every trade, run the checklist. If one box is no, do not trade.',
    refuse: 'Do not skip a box because the chart feels urgent.',
  },
  journal: {
    law: 'Write your plan before you know if you won or lost — entry, stop, target, size, and why.',
    refuse: 'Do not only write down the winners. Write the losers and the skips too.',
  },
  loss: {
    law: 'After a loss, write a short review before you risk again. Did you break a rule, or was it just a bad beat?',
    refuse: 'Do not jump into a bigger trade to “get it back.” Review first — or sit out.',
  },
  weekly: {
    law: 'Once a week, spend 15 minutes: how often you followed the list, your best trade, your worst slip, one thing to keep, one thing to stop.',
    refuse: 'Do not only look at profit and loss. That hides bad habits on green weeks.',
  },
} as const

export type ChecklistItem = {
  n: string
  course: string
  text: string
}

/** Same lines as pre-trade-checklist.csv — shown live on the desk pack. */
export const CHECKLIST_ITEMS: ChecklistItem[] = [
  { n: '01', course: '01', text: 'Can I name what the chart is doing in one sentence (trend / range / flip)?' },
  { n: '02', course: '01', text: 'Am I using a higher timeframe for context and a lower one for the entry?' },
  { n: '03', course: '01', text: 'Am I reading buyers and sellers - not drawing random lines?' },
  { n: '04', course: '02', text: 'Is the level clear in about 15 seconds? If not I skip.' },
  { n: '05', course: '02', text: 'Does the level have proof (touches / EMAs / value) - not a Fib alone?' },
  { n: '06', course: '03', text: 'Is my entry type clear (retest / EMA reclaim / breakout)?' },
  { n: '07', course: '03', text: 'Am I waiting for the full trigger - not the first break alone?' },
  { n: '08', course: '03', text: 'Do I have a hard stop written down?' },
  { n: '09', course: '04', text: 'Is the stop past the level that kills the idea?' },
  { n: '10', course: '04', text: 'Does ATR say the stop is not too tight and not crazy wide?' },
  { n: '11', course: '04', text: 'Is reward worth the risk (about 1.5R or better)?' },
  { n: '12', course: '04', text: 'Is size based on dollars I can lose - not a guess?' },
  { n: '13', course: '05', text: 'Did I check news / events that could wreck a clean chart?' },
  { n: '14', course: '05', text: `Can I say: ${PHRASE}` },
  { n: '15', course: '05', text: 'If any answer is No - I stay out.' },
]

export type ResourceFile = {
  id: string
  n: string
  title: string
  blurb: string
  file: string
  kind: string
}

/** Full branded workbook (gold headers, borders, dropdowns). */
export const DESK_PACK_FILE = '/curriculum/05/desk-pack.xlsx'

export const RESOURCES: ResourceFile[] = [
  {
    id: 'checklist',
    n: '01',
    title: 'Before-trade checklist',
    blurb: '15 yes/no checks. One no = no trade.',
    file: '/curriculum/05/pre-trade-checklist.xlsx',
    kind: 'XLSX',
  },
  {
    id: 'journal',
    n: '02',
    title: 'Trade log',
    blurb: 'Plan first. Result later. Wins, losses, skips.',
    file: '/curriculum/05/trade-journal.xlsx',
    kind: 'XLSX',
  },
  {
    id: 'loss',
    n: '03',
    title: 'Loss review',
    blurb: 'Rule break or bad beat? Write it before the next risk.',
    file: '/curriculum/05/loss-review.xlsx',
    kind: 'XLSX',
  },
  {
    id: 'weekly',
    n: '04',
    title: 'Weekly check-in',
    blurb: '15 minutes. Best trade. Worst slip. One keep. One stop.',
    file: '/curriculum/05/weekly-review.xlsx',
    kind: 'XLSX',
  },
  {
    id: 'rules',
    n: '05',
    title: 'Playbook rules',
    blurb: 'Do this / don’t - from all five courses.',
    file: '/curriculum/05/playbook-rules.xlsx',
    kind: 'XLSX',
  },
]

export const QUIZZES: Record<string, QuizQ[]> = {
  cold: [
    {
      id: 'c1',
      prompt: 'What is Course 05 for?',
      options: [
        { id: 'a', label: 'Habits so Courses 01–04 stick' },
        { id: 'b', label: 'More indicators' },
        { id: 'c', label: 'Guaranteed profit' },
      ],
      correct: 'a',
      explain: 'Without habits and review, you forget what you learned.',
    },
    {
      id: 'c2',
      prompt: 'You cannot say what the chart is doing in one sentence. What do you do?',
      options: [
        { id: 'a', label: 'Trade small anyway' },
        { id: 'b', label: 'Ask chat for the call' },
        { id: 'c', label: 'Stay out' },
      ],
      correct: 'c',
      explain: 'Staying out is fine. Guessing is not.',
    },
    {
      id: 'c3',
      prompt: 'What belongs in Course 05?',
      options: [
        { id: 'a', label: 'A new indicator set' },
        { id: 'b', label: 'Checklist, log, and look-back habits' },
        { id: 'c', label: 'Guaranteed weekly wins' },
      ],
      correct: 'b',
      explain: 'Habits keep Courses 01–04 alive.',
    },
  ],
  checklist: [
    {
      id: 'k1',
      prompt: 'One checklist box is no, but the chart looks great. You…',
      options: [
        { id: 'a', label: 'Stay out' },
        { id: 'b', label: 'Trade anyway' },
        { id: 'c', label: 'Trade bigger' },
      ],
      correct: 'a',
      explain: 'That is what the checklist is for.',
    },
    {
      id: 'k2',
      prompt: 'The before-trade list covers…',
      options: [
        { id: 'a', label: 'Only entries' },
        { id: 'b', label: 'Whatever you remember that day' },
        { id: 'c', label: 'Structure, levels, entry, risk, and habits' },
      ],
      correct: 'c',
      explain: 'Use the full list. Half a list leaves holes.',
    },
  ],
  journal: [
    {
      id: 'j1',
      prompt: 'When do you write the plan in your log?',
      options: [
        { id: 'a', label: 'After you know if it won' },
        { id: 'b', label: 'Before you know the result' },
        { id: 'c', label: 'Only on bad weeks' },
      ],
      correct: 'b',
      explain: 'Write the plan first. Otherwise you rewrite the story later.',
    },
    {
      id: 'j2',
      prompt: 'You only log winners. What’s wrong?',
      options: [
        { id: 'a', label: 'You hide the lessons in the losses' },
        { id: 'b', label: 'Nothing' },
        { id: 'c', label: 'Sheets run out of rows' },
      ],
      correct: 'a',
      explain: 'Losers and skips teach you. Log them.',
    },
  ],
  loss: [
    {
      id: 'l1',
      prompt: 'You got stopped out. Before the next trade you…',
      options: [
        { id: 'a', label: 'Double size to get it back' },
        { id: 'b', label: 'Delete the chart and move on' },
        { id: 'c', label: 'Write a short review' },
      ],
      correct: 'c',
      explain: 'A short review beats revenge.',
    },
    {
      id: 'l2',
      prompt: 'You followed the plan and still lost. Most likely…',
      options: [
        { id: 'a', label: 'A normal loss inside a good plan' },
        { id: 'b', label: 'Throw out the playbook' },
        { id: 'c', label: 'You must have cheated' },
      ],
      correct: 'a',
      explain: 'Good plans still lose sometimes. That is why size stays small.',
    },
  ],
  weekly: [
    {
      id: 'w1',
      prompt: 'A good weekly check-in looks at…',
      options: [
        { id: 'a', label: 'Only profit and loss' },
        { id: 'b', label: 'Did I follow the list, best trade, worst slip, keep/stop' },
        { id: 'c', label: 'How many likes your chart got' },
      ],
      correct: 'b',
      explain: 'Habits matter more than one lucky week.',
    },
    {
      id: 'w2',
      prompt: 'Best “thing to stop” is…',
      options: [
        { id: 'a', label: 'Something clear — e.g. no trade if any box is no' },
        { id: 'b', label: '“Trade better”' },
        { id: 'c', label: 'Quit for a year' },
      ],
      correct: 'a',
      explain: 'Clear beats vague.',
    },
  ],
}

export const PROCESS_LABS: RiskLabDef[] = [
  {
    id: 'lab-loop',
    title: 'Lab A — The full path',
    pair: 'PLAYBOOK',
    tf: 'ALL STEPS',
    regime: 'See → review',
    blurb: 'Tap each marker. The loop only works if you finish it — what do you do after a trade?',
    diagram: 'structure',
    hotspots: [
      {
        id: 'h1',
        x: 22,
        y: 40,
        title: 'See the chart',
        body: 'Courses 01–03: what is happening, where is the level, when do you enter.',
      },
      {
        id: 'h2',
        x: 50,
        y: 55,
        title: 'Size the risk',
        body: 'Course 04: stop and size. Still not done.',
      },
      {
        id: 'h3',
        x: 78,
        y: 40,
        title: 'Look back',
        body: 'Course 05: if you skip this, the same mistake shows up on a new coin.',
      },
    ],
    calls: [
      { id: 'jump', label: 'Next trade' },
      { id: 'review', label: 'Review first' },
      { id: 'ignore', label: 'Skip review' },
    ],
    correctCall: 'review',
    decision: {
      story: 'Close the loop before you size up again',
      why: 'Without look-back, Courses 01–04 don’t stick',
      action: 'Checklist + log (or loss sheet) — then the next setup',
    },
  },
  {
    id: 'lab-loss',
    title: 'Lab B — After a stop',
    pair: 'AFTER A LOSS',
    tf: 'HABITS',
    regime: 'Review first',
    blurb: 'You just got stopped. Tap the markers — what should you do next?',
    diagram: 'atr',
    hotspots: [
      {
        id: 'h1',
        x: 28,
        y: 45,
        title: 'Stop hit',
        body: 'The idea was wrong or unlucky. That is what the stop is for.',
      },
      {
        id: 'h2',
        x: 55,
        y: 38,
        title: 'Urge to revenge',
        body: 'Bigger size “to get it back” digs a deeper hole. Don’t.',
      },
      {
        id: 'h3',
        x: 80,
        y: 52,
        title: 'Write it down',
        body: 'Did I break a rule? What will I do next time? Then take new risk — or stay out.',
      },
    ],
    calls: [
      { id: 'revenge', label: 'Revenge size' },
      { id: 'review', label: 'Write review' },
      { id: 'forget', label: 'Move on' },
    ],
    correctCall: 'review',
    decision: {
      story: 'Review before any new risk',
      why: 'Revenge is not a plan',
      action: 'Fill the loss sheet. Sit out until you do',
    },
  },
  {
    id: 'lab-flat',
    title: 'Lab C — Good no-trade',
    pair: 'NO TRADE',
    tf: 'DESK',
    regime: 'Checklist says no',
    blurb: 'Entry looks fine, but reward is weak and the stop is too tight. Call it.',
    diagram: 'size',
    hotspots: [
      {
        id: 'h1',
        x: 30,
        y: 42,
        title: 'Nice-looking chart',
        body: 'Feeling rushed is not a yes on the checklist.',
      },
      {
        id: 'h2',
        x: 55,
        y: 58,
        title: 'Two boxes say no',
        body: 'Reward too small. Stop too tight. Plan says sit out.',
      },
      {
        id: 'h3',
        x: 82,
        y: 40,
        title: 'Write the skip',
        body: 'Log that you passed. Saying no is part of the job.',
      },
    ],
    calls: [
      { id: 'force', label: 'Take it' },
      { id: 'sit', label: 'Sit out' },
      { id: 'half', label: 'Half size' },
    ],
    correctCall: 'sit',
    decision: {
      story: 'Sitting out is the right call',
      why: 'Two checklist fails',
      action: 'Stay out. Log the skip. Protect the account',
    },
  },
]

export const GATE_ITEMS = [
  { id: 'g1', label: 'I will run the before-trade checklist — one no means I stay out' },
  { id: 'g2', label: 'I will write the plan before I know the result (not only winners)' },
  { id: 'g3', label: 'After a loss, I write a short review before I risk again' },
  { id: 'g4', label: 'Once a week I check: follow-through, best trade, worst slip, one keep, one stop' },
  { id: 'g5', label: 'I downloaded (or opened) the Sheets files for my desk' },
  { id: 'g6', label: `I can honestly say: “${PHRASE}”` },
] as const

export type StepId =
  | 'intro'
  | 'premise'
  | 'quiz-cold'
  | 'checklist'
  | 'quiz-checklist'
  | 'journal'
  | 'quiz-journal'
  | 'loss'
  | 'quiz-loss'
  | 'weekly'
  | 'quiz-weekly'
  | 'resources'
  | 'lab-loop'
  | 'lab-loss'
  | 'lab-flat'
  | 'play-fill'
  | 'play-match'
  | 'play-spell'
  | 'gate'
  | 'complete'

export const STEPS: { id: StepId; label: string }[] = [
  { id: 'intro', label: 'Open' },
  { id: 'premise', label: 'Why' },
  { id: 'quiz-cold', label: 'Quiz' },
  { id: 'checklist', label: 'Checklist' },
  { id: 'quiz-checklist', label: 'Quiz' },
  { id: 'journal', label: 'Log' },
  { id: 'quiz-journal', label: 'Quiz' },
  { id: 'loss', label: 'Losses' },
  { id: 'quiz-loss', label: 'Quiz' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'quiz-weekly', label: 'Quiz' },
  { id: 'resources', label: 'Files' },
  { id: 'lab-loop', label: 'Lab A' },
  { id: 'lab-loss', label: 'Lab B' },
  { id: 'lab-flat', label: 'Lab C' },
  { id: 'play-fill', label: 'Fill-in' },
  { id: 'play-match', label: 'Match' },
  { id: 'play-spell', label: 'Spell' },
  { id: 'gate', label: 'Gate' },
  { id: 'complete', label: 'Done' },
]

export type { CallChoice, QuizQ }
