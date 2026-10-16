import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GoodSkipChart } from '../courses/diagrams/GoodSkipChart'
import { LossReviewChart } from '../courses/diagrams/LossReviewChart'
import { ProcessLoopChart } from '../courses/diagrams/ProcessLoopChart'
import { CourseFinish } from '../courses/market-structure/CourseFinish'
import { Quiz } from '../courses/market-structure/Quiz'
import { StructureGate } from '../courses/market-structure/StructureGate'
import { FillBlank } from '../courses/games/FillBlank'
import { MatchPairs } from '../courses/games/MatchPairs'
import { WordBank } from '../courses/games/WordBank'
import { ChartPick } from '../courses/market-structure/ChartPick'
import { TeachFigure } from '../courses/market-structure/TeachFigure'
import {
  GATE_ITEMS,
  PHRASE,
  PROCESS_LABS,
  QUIZZES,
  RULES,
  STEPS,
  type StepId,
} from '../courses/process/data'
import { ResourcePack } from '../courses/process/ResourcePack'
import { RiskLab } from '../courses/risk/RiskLab'
import { track } from '../lib/analytics'
import '../courses/market-structure/market-structure.css'

function stepFromParam(raw: string | null): StepId {
  if (raw && STEPS.some((s) => s.id === raw)) return raw as StepId
  return 'intro'
}

const DIAGRAM = {
  loop: <ProcessLoopChart />,
  loss: <LossReviewChart />,
  skip: <GoodSkipChart />,
} as const

export function ProcessReview() {
  const [params] = useSearchParams()
  const [step, setStep] = useState<StepId>(() => stepFromParam(params.get('step')))
  const idx = STEPS.findIndex((s) => s.id === step)
  const progress = ((idx + 1) / STEPS.length) * 100

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    track('course_step', { course: '05', step })
  }, [step])

  function go(id: StepId) {
    setStep(id)
  }

  function next() {
    const n = STEPS[idx + 1]
    if (n) setStep(n.id)
  }

  return (
    <main className="ms-page">
      <div className="ms-progress" aria-hidden>
        <div className="ms-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="shell ms-shell">
        <header className="ms-top">
          <Link to="/desk" className="ms-back mono">
            ← Desk
          </Link>
          <div className="ms-top-meta">
            <span className="eyebrow">Course 05 · Interactive</span>
            <span className="mono ms-step-label">
              {String(idx + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')} ·{' '}
              {STEPS[idx]?.label}
            </span>
          </div>
        </header>

        {step === 'intro' && (
          <section className="ms-panel ms-intro">
            <p className="eyebrow">Process &amp; review</p>
            <h1 className="display ms-title">
              Make it
              <br />
              <span className="gold">a habit.</span>
            </h1>
            <p className="lede">
              You learned how to read the chart and size the risk. This last course is simpler: a
              checklist before you trade, a short log, and a look-back after losses — plus files you
              can open in Google Sheets.
            </p>
            <blockquote className="ms-quote">
              <p>{PHRASE}</p>
            </blockquote>
            <button type="button" className="btn btn-primary" onClick={next}>
              Start module
            </button>
            <p className="ms-foot mono">Educational only · Not financial advice</p>
          </section>
        )}

        {step === 'premise' && (
          <section className="ms-panel">
            <p className="eyebrow">Why this last</p>
            <h2 className="display ms-h2">
              Knowing is not
              <br />
              <span className="gold">enough.</span>
            </h2>
            <div className="ms-cards">
              <article>
                <span className="mono">01–03</span>
                <h3>The chart</h3>
                <p>What is happening, where is the level, when do you enter.</p>
              </article>
              <article>
                <span className="mono">04</span>
                <h3>The risk</h3>
                <p>Where you are wrong, and how big you trade.</p>
              </article>
              <article>
                <span className="mono">05</span>
                <h3>The habits</h3>
                <p>Checklist, log, review after a loss, weekly look-back.</p>
              </article>
            </div>
            <TeachFigure
              diagram={<ProcessLoopChart />}
              alt="Steps from reading the chart to looking back"
              caption="Do the work · then look back"
              note="Skip the look-back and the same mistake shows up again."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.premise.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.premise.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Quick quiz
            </button>
          </section>
        )}

        {step === 'quiz-cold' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.cold} onComplete={() => next()} />
          </section>
        )}

        {step === 'checklist' && (
          <section className="ms-panel">
            <p className="eyebrow">Before you trade</p>
            <h2 className="display ms-h2">
              Run the list.
              <br />
              <span className="gold">One no = sit out.</span>
            </h2>
            <p className="lede">
              Same ideas from Courses 01–04, as yes/no boxes. Download it and tick it in Sheets
              before every trade.
            </p>
            <TeachFigure
              diagram={<GoodSkipChart />}
              alt="Checklist with two no boxes meaning stay out"
              caption="Nice chart · two nos"
              note="Feeling rushed is not a yes. Write that you skipped."
            />
            <ChartPick
              prompt="Two boxes on the list are no. What do you do?"
              diagram={<GoodSkipChart />}
              options={[
                { id: 'trade', x: 28, y: 35, label: 'Trade anyway' },
                { id: 'out', x: 72, y: 78, label: 'Sit out' },
                { id: 'bigger', x: 50, y: 55, label: 'Trade bigger' },
              ]}
              correctId="out"
              explainOk="One no is enough. Sit out and write that you skipped."
              explainNo="The list only works if you obey it. Sit out."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.checklist.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.checklist.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Checklist quiz
            </button>
          </section>
        )}

        {step === 'quiz-checklist' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.checklist} onComplete={() => next()} />
          </section>
        )}

        {step === 'journal' && (
          <section className="ms-panel">
            <p className="eyebrow">Trade log</p>
            <h2 className="display ms-h2">
              Write the plan
              <br />
              <span className="gold">first.</span>
            </h2>
            <p className="lede">
              Entry, stop, target, size, and why — before you know if you won. Log wins, losses, and
              the times you sat out.
            </p>
            <div className="ms-cards">
              <article>
                <span className="mono">01</span>
                <h3>Before</h3>
                <p>What you see, where you enter, stop, size, checklist yes.</p>
              </article>
              <article>
                <span className="mono">02</span>
                <h3>After</h3>
                <p>Did it win or lose? Did you follow the plan? One line lesson.</p>
              </article>
              <article>
                <span className="mono">03</span>
                <h3>Always</h3>
                <p>Log skips too. Saying no is part of the job.</p>
              </article>
            </div>
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.journal.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.journal.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Log quiz
            </button>
          </section>
        )}

        {step === 'quiz-journal' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.journal} onComplete={() => next()} />
          </section>
        )}

        {step === 'loss' && (
          <section className="ms-panel">
            <p className="eyebrow">After a loss</p>
            <h2 className="display ms-h2">
              Write it down.
              <br />
              <span className="gold">Then move on.</span>
            </h2>
            <p className="lede">
              Did you break a rule, or was it just a bad beat? What will you do next time? Answer
              that before you risk again.
            </p>
            <TeachFigure
              diagram={<LossReviewChart />}
              alt="After a stop: revenge path versus write a review"
              caption="No revenge trades"
              note="Good plans still lose. That is why size stays small."
            />
            <ChartPick
              prompt="You just got stopped. Tap the next move."
              diagram={<LossReviewChart />}
              options={[
                { id: 'revenge', x: 24, y: 58, label: 'Size up angry' },
                { id: 'review', x: 76, y: 58, label: 'Write a short review' },
                { id: 'ignore', x: 50, y: 28, label: 'Ignore it' },
              ]}
              correctId="review"
              explainOk="Write a short review first. Then trade again — or sit out."
              explainNo="Revenge and ignoring both skip the lesson. Write it down."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.loss.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.loss.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Loss quiz
            </button>
          </section>
        )}

        {step === 'quiz-loss' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.loss} onComplete={() => next()} />
          </section>
        )}

        {step === 'weekly' && (
          <section className="ms-panel">
            <p className="eyebrow">Once a week</p>
            <h2 className="display ms-h2">
              Fifteen minutes.
              <br />
              <span className="gold">That is enough.</span>
            </h2>
            <p className="lede">
              Did you follow the list? Best trade? Worst slip? One thing to keep. One thing to stop.
              Profit alone can hide bad habits.
            </p>
            <div className="ms-cards">
              <article>
                <span className="mono">KEEP</span>
                <h3>Be clear</h3>
                <p>“Always check the stop with ATR” — not “trade better.”</p>
              </article>
              <article>
                <span className="mono">STOP</span>
                <h3>Name it</h3>
                <p>“No trade if any checklist box is no.”</p>
              </article>
              <article>
                <span className="mono">CHECK</span>
                <h3>Follow-through</h3>
                <p>How often you ran the list matters more than one lucky week.</p>
              </article>
            </div>
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.weekly.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.weekly.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Weekly quiz
            </button>
          </section>
        )}

        {step === 'quiz-weekly' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.weekly} onComplete={() => next()} />
          </section>
        )}

        {step === 'resources' && (
          <section className="ms-panel">
            <ResourcePack onContinue={next} />
          </section>
        )}

        {step === 'lab-loop' && (
          <section className="ms-panel ms-lab-wrap">
            <RiskLab lab={PROCESS_LABS[0]} diagram={DIAGRAM.loop} onComplete={next} />
          </section>
        )}

        {step === 'lab-loss' && (
          <section className="ms-panel ms-lab-wrap">
            <RiskLab lab={PROCESS_LABS[1]} diagram={DIAGRAM.loss} onComplete={next} />
          </section>
        )}

        {step === 'lab-flat' && (
          <section className="ms-panel ms-lab-wrap">
            <RiskLab lab={PROCESS_LABS[2]} diagram={DIAGRAM.skip} onComplete={next} />
          </section>
        )}

        {step === 'play-fill' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · Fill-in</p>
            <h2 className="display ms-h2">
              Pick the
              <br />
              <span className="gold">missing word.</span>
            </h2>
            <FillBlank
              items={[
                {
                  id: 'f1',
                  sentence: 'One checklist no means you ___.',
                  choices: ['size up', 'sit out', 'move the stop'],
                  correct: 'sit out',
                  explain: 'The list only works if you obey it.',
                },
                {
                  id: 'f2',
                  sentence: 'Write the plan ___ you know the result.',
                  choices: ['after', 'before', 'never'],
                  correct: 'before',
                  explain: 'Plan first. Outcome later.',
                },
                {
                  id: 'f3',
                  sentence: 'After a loss, write a short review ___ the next risk.',
                  choices: ['after', 'instead of', 'before'],
                  correct: 'before',
                  explain: 'Review first. Revenge later is how accounts die.',
                },
              ]}
              onComplete={next}
            />
          </section>
        )}

        {step === 'play-match' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · Match</p>
            <h2 className="display ms-h2">
              Habit
              <br />
              <span className="gold">pairs.</span>
            </h2>
            <MatchPairs
              pairs={[
                { id: 'm1', left: 'Checklist', right: 'Before every trade' },
                { id: 'm2', left: 'Trade log', right: 'Plan before the result' },
                { id: 'm3', left: 'Loss review', right: 'Before the next risk' },
                { id: 'm4', left: 'Weekly check-in', right: '15 minutes · keep / stop' },
              ]}
              onComplete={next}
            />
          </section>
        )}

        {step === 'play-spell' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · Spell</p>
            <h2 className="display ms-h2">
              Spell the
              <br />
              <span className="gold">habit.</span>
            </h2>
            <WordBank
              clue="After a stop, do not ___ size to get it back."
              answer="REVENGE"
              decoys={['X', 'Q']}
              explain="Write the review. Sit out if you need to. No angry size-ups."
              onComplete={next}
            />
          </section>
        )}

        {step === 'gate' && (
          <section className="ms-panel">
            <StructureGate
              onPass={() => go('complete')}
              items={GATE_ITEMS}
              eyebrow="LAST CHECK"
              title="Before you finish"
            />
          </section>
        )}

        {step === 'complete' && (
          <CourseFinish
            courseId="05"
            courseTitle="Process & Review"
            phrase={PHRASE}
            beats={[
              'Checklist · log',
              'Loss review',
              'Weekly look-back',
              'Sheets files',
              'Games',
              'Done',
            ]}
            takeaway="Do the steps. Look back. Or stay out."
            nextLabel="Back to desk"
            nextTo="/desk"
            secondaryLabel="Replay Course 04"
            secondaryTo="/courses/risk-position-sizing"
            onRestart={() => go('intro')}
            sharePath="/courses/process-review"
          />
        )}
      </div>
    </main>
  )
}
