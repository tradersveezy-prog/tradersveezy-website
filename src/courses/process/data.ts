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

export type ResourceFile = {
  id: string
  title: string
  blurb: string
  file: string
  sheetsTip: string
}

export const RESOURCES: ResourceFile[] = [
  {
    id: 'checklist',
    title: 'Before-trade checklist',
    blurb: 'Yes/no boxes from all five courses. One no = no trade. Open it in Google Sheets and tick as you go.',
    file: '/curriculum/05/pre-trade-checklist.csv',
    sheetsTip: 'Freeze the top row · use Yes/No dropdowns',
  },
  {
    id: 'journal',
    title: 'Trade log',
    blurb: 'Write the plan first. Add the result later. Winners, losers, and skips.',
    file: '/curriculum/05/trade-journal.csv',
    sheetsTip: 'Copy a blank row when you need more space',
  },
  {
    id: 'loss',
    title: 'Loss review',
    blurb: 'Simple questions after a stop: did I break a rule, and what do I do next time?',
    file: '/curriculum/05/loss-review.csv',
    sheetsTip: 'One row per loss — before the next trade',
  },
  {
    id: 'weekly',
    title: 'Weekly check-in',
    blurb: 'Fifteen minutes each week. Best trade. Worst slip. One keep. One stop.',
    file: '/curriculum/05/weekly-review.csv',
    sheetsTip: 'One row every Monday',
  },
  {
    id: 'rules',
    title: 'Playbook rules',
    blurb: 'Do this / don’t do that from every course — one sheet to pin by your desk.',
    file: '/curriculum/05/playbook-rules.csv',
    sheetsTip: 'Filter by course when you need a refresh',
  },
  {
    id: 'howto',
    title: 'How to open these in Google Sheets',
    blurb: 'Short steps: File → Import → Upload → pick the CSV.',
    file: '/curriculum/05/HOW-TO-GOOGLE-SHEETS.txt',
    sheetsTip: 'Read once, then set up your file',
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
    blurb: 'Tap each marker. Where do people usually drop the ball?',
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
    correctCall: 'wait',
    decision: {
      story: 'Looking back is part of the job',
      why: 'Trading without review repeats the same errors',
      action: 'Build the checklist and log habit first — then take the next trade',
    },
  },
  {
    id: 'lab-loss',
    title: 'Lab B — After a stop',
    pair: 'AFTER A LOSS',
    tf: 'HABITS',
    regime: 'Review first',
    blurb: 'You just got stopped. Tap the markers — what should you do?',
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
    correctCall: 'skip',
    decision: {
      story: 'Skip the next angry trade',
      why: 'Revenge is not a plan',
      action: 'Fill the loss sheet first. Sit out until you do',
    },
  },
  {
    id: 'lab-flat',
    title: 'Lab C — Good no-trade',
    pair: 'NO TRADE',
    tf: 'DESK',
    regime: 'Checklist says no',
    blurb: 'Entry looks fine, but reward is weak and the stop is too tight. What do you do?',
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
    correctCall: 'skip',
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
