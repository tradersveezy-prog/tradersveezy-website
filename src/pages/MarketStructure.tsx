import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FillBlank } from '../courses/games/FillBlank'
import { MatchPairs } from '../courses/games/MatchPairs'
import { OrderSteps } from '../courses/games/OrderSteps'
import { WordBank } from '../courses/games/WordBank'
import { ChartLab } from '../courses/market-structure/ChartLab'
import { ChartPick } from '../courses/market-structure/ChartPick'
import { CourseVideo } from '../courses/market-structure/CourseVideo'
import {
  LABS,
  MODULE_VIDEO,
  PHRASE,
  QUIZZES,
  RULES,
  STEPS,
  type StepId,
} from '../courses/market-structure/data'
import { Quiz } from '../courses/market-structure/Quiz'
import { CourseFinish } from '../courses/market-structure/CourseFinish'
import { StructureGate } from '../courses/market-structure/StructureGate'
import { TeachFigure } from '../courses/market-structure/TeachFigure'
import { BreakReclaimChart } from '../courses/diagrams/BreakReclaimChart'
import { TrendEmaChart } from '../courses/diagrams/TrendEmaChart'
import { ValueProfileChart } from '../courses/diagrams/ValueProfileChart'
import '../courses/market-structure/market-structure.css'

function stepFromParam(raw: string | null): StepId {
  if (raw && STEPS.some((s) => s.id === raw)) return raw as StepId
  return 'intro'
}

export function MarketStructure() {
  const [params] = useSearchParams()
  const [step, setStep] = useState<StepId>(() => stepFromParam(params.get('step')))
  const idx = STEPS.findIndex((s) => s.id === step)
  const progress = ((idx + 1) / STEPS.length) * 100

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            <span className="eyebrow">Course 01 · Interactive</span>
            <span className="mono ms-step-label">
              {String(idx + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')} ·{' '}
              {STEPS[idx]?.label}
            </span>
          </div>
        </header>

        {step === 'intro' && (
          <section className="ms-panel ms-intro">
            <p className="eyebrow">Market structure</p>
            <h1 className="display ms-title">
              Name what&apos;s
              <br />
              <span className="gold">happening.</span>
            </h1>
            <p className="lede">
              Before levels and entries — buyers versus sellers, where value sits, and whether you are in a
              trend, a range, or a flip. Charts, quizzes, then a checklist.
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
            <p className="eyebrow">Why this first</p>
            <h2 className="display ms-h2">
              Candles show
              <br />
              <span className="gold">who is winning.</span>
            </h2>
            <div className="ms-cards">
              <article>
                <span className="mono">01</span>
                <h3>Buyers &amp; sellers</h3>
                <p>Every bar is one side winning. Structure is that contest over time — not decorative lines.</p>
              </article>
              <article>
                <span className="mono">02</span>
                <h3>Value first</h3>
                <p>
                  Where the market already agreed on price. Prefer buying into that area over chasing halfway
                  through a move.
                </p>
              </article>
              <article>
                <span className="mono">03</span>
                <h3>Three conditions</h3>
                <p>
                  Trend · Range (value) · Flip. If you cannot name it in one sentence, stay flat.
                </p>
              </article>
            </div>
            <p className="ms-stack mono">
              Day charts · Context {RULES.stack.context} · Entry {RULES.stack.execution}
            </p>
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

        {step === 'trend' && (
          <section className="ms-panel">
            <p className="eyebrow">Condition · Trend</p>
            <h2 className="display ms-h2">
              Higher highs.
              <br />
              <span className="gold">Above 21 · 55 · 200.</span>
            </h2>
            <TeachFigure
              diagram={<TrendEmaChart />}
              alt="Uptrend with higher highs, higher lows, and price above EMAs"
              caption="Structure + averages"
              note="Higher highs and lows — and still above 21 · 55 · 200 on the 15-minute."
            />
            <ChartPick
              prompt="Where would you rather look for a long on this idea?"
              diagram={<TrendEmaChart />}
              options={[
                { id: 'chase', x: 82, y: 28, label: 'Chase the high' },
                { id: 'pull', x: 58, y: 48, label: 'Pullback · above EMAs' },
                { id: 'under', x: 40, y: 72, label: 'Under the averages' },
              ]}
              correctId="pull"
              explainOk="Yes — with the trend, after a pullback, while price still holds the averages."
              explainNo="Prefer a pullback that still sits above 21 · 55 · 200 — not a chase or a break under."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.trend.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.trend.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Trend quiz
            </button>
          </section>
        )}

        {step === 'quiz-trend' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.trend} onComplete={() => next()} />
          </section>
        )}

        {step === 'range' && (
          <section className="ms-panel">
            <p className="eyebrow">Condition · Range</p>
            <h2 className="display ms-h2">
              Trade the edges.
              <br />
              <span className="gold">Not the middle.</span>
            </h2>
            <TeachFigure
              diagram={<ValueProfileChart />}
              alt="Volume profile with VAH, POC, and VAL labeled"
              caption="Value · edges matter"
              note="Range work is value work. Prefer VAL reclaim over mid-value noise."
            />
            <ChartPick
              prompt="Where do you usually want to work in a range?"
              diagram={<ValueProfileChart />}
              options={[
                { id: 'vah', x: 70, y: 22, label: 'Far above value' },
                { id: 'mid', x: 55, y: 48, label: 'Middle of value' },
                { id: 'val', x: 48, y: 72, label: 'Low end · VAL' },
              ]}
              correctId="val"
              explainOk="Edges first — especially buying the low end of value back (VAL reclaim)."
              explainNo="The middle is noise by default. Look at the edges of value."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.range.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.range.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Range quiz
            </button>
          </section>
        )}

        {step === 'quiz-range' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.range} onComplete={() => next()} />
          </section>
        )}

        {step === 'transition' && (
          <section className="ms-panel">
            <p className="eyebrow">Condition · Flip</p>
            <h2 className="display ms-h2">
              Break under.
              <br />
              <span className="gold">Close back. Confirm.</span>
            </h2>
            <TeachFigure
              diagram={<BreakReclaimChart />}
              alt="Price breaking under a key level then closing back above"
              caption="Failed break"
              note="Dip under · close back · wait for several confirms before you size."
            />
            <ChartPick
              prompt="Price just closed back above the level once. What do you do?"
              diagram={<BreakReclaimChart />}
              options={[
                { id: 'first', x: 48, y: 42, label: 'Enter on first close' },
                { id: 'wait', x: 72, y: 38, label: 'Wait for more closes' },
                { id: 'chase', x: 88, y: 22, label: 'Chase far above' },
              ]}
              correctId="wait"
              explainOk="Wait for a few holding closes. Then look near the level — not far above it."
              explainNo="One reclaim candle is not enough. Wait, then enter near the broken level."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.transition.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.transition.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Flip quiz
            </button>
          </section>
        )}

        {step === 'quiz-transition' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.transition} onComplete={() => next()} />
          </section>
        )}

        {step === 'lab-near' && (
          <section className="ms-panel ms-lab-wrap">
            <ChartLab lab={LABS[2]} onComplete={next} />
          </section>
        )}

        {step === 'mtf' && (
          <section className="ms-panel">
            <p className="eyebrow">Chart setup</p>
            <h2 className="display ms-h2">
              Two charts for context.
              <br />
              <span className="gold">One for entry.</span>
            </h2>
            <div className="ms-mtf">
              <div className="ms-mtf-card">
                <span className="mono">CONTEXT</span>
                <strong>12H · 6H</strong>
                <p>Name the condition and the zone. Do not invent a new story on a lower chart.</p>
              </div>
              <div className="ms-mtf-card gold-border">
                <span className="mono">ENTRY</span>
                <strong>15m</strong>
                <p>Wait for a reaction at the zone the higher charts already named.</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Chart quiz
            </button>
          </section>
        )}

        {step === 'quiz-mtf' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.mtf} onComplete={() => next()} />
          </section>
        )}

        {step === 'lab-btc12' && (
          <section className="ms-panel ms-lab-wrap">
            <ChartLab lab={LABS[0]} onComplete={next} />
          </section>
        )}

        {step === 'lab-btc8' && (
          <section className="ms-panel ms-lab-wrap">
            <ChartLab lab={LABS[1]} onComplete={next} />
          </section>
        )}

        {step === 'play-fill' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · Fill-in</p>
            <h2 className="display ms-h2">
              Finish the
              <br />
              <span className="gold">sentence.</span>
            </h2>
            <FillBlank
              items={[
                {
                  id: 'f1',
                  sentence: 'If you cannot name the condition, stay ___.',
                  choices: ['long', 'flat', 'levered'],
                  correct: 'flat',
                  explain: 'No clear read = no trade.',
                },
                {
                  id: 'f2',
                  sentence: 'Context lives on 12H and 6H. Entry thinking lives on ___.',
                  choices: ['1m', '15m', 'weekly only'],
                  correct: '15m',
                  explain: 'Two charts for context, one for the entry.',
                },
                {
                  id: 'f3',
                  sentence: 'In a range, work the ___ of value — not the middle.',
                  choices: ['edges', 'noise', 'random ticks'],
                  correct: 'edges',
                  explain: 'VAL / VAH matter. Middle is usually a skip.',
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
              Link the
              <br />
              <span className="gold">idea.</span>
            </h2>
            <MatchPairs
              pairs={[
                { id: 'm1', left: 'Trend', right: 'Higher highs / lows + EMAs' },
                { id: 'm2', left: 'Range', right: 'Value edges (VAL / VAH)' },
                { id: 'm3', left: 'Flip', right: 'Break, close back, confirm' },
                { id: 'm4', left: 'Stay flat', right: 'Cannot name the condition' },
              ]}
              onComplete={next}
            />
          </section>
        )}

        {step === 'play-order' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · Order</p>
            <h2 className="display ms-h2">
              Tap the steps
              <br />
              <span className="gold">in order.</span>
            </h2>
            <OrderSteps
              prompt="Before you look for an entry, what comes first?"
              items={[
                { id: 'o1', label: 'Name the condition' },
                { id: 'o2', label: 'Mark context on 12H · 6H' },
                { id: 'o3', label: 'Plan the 15m idea' },
                { id: 'o4', label: 'Enter only if it is clear' },
              ]}
              explain="Name it first. Context next. Entry last — or stay flat."
              onComplete={next}
            />
          </section>
        )}

        {step === 'play-spell' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · Spell</p>
            <h2 className="display ms-h2">
              Build the
              <br />
              <span className="gold">word.</span>
            </h2>
            <WordBank
              clue="When you cannot name the chart, you stay ___."
              answer="FLAT"
              decoys={['E', 'R', 'Y']}
              explain="Flat is a valid choice. Guessing is not."
              onComplete={next}
            />
          </section>
        )}

        {step === 'video' && (
          <section className="ms-panel">
            <p className="eyebrow">Course 01 · Video</p>
            <h2 className="display ms-h2">
              Module 1
              <br />
              <span className="gold">video.</span>
            </h2>
            <p className="lede">
              Trend, range, flip, and how to use 12H · 6H · 15m. Watch this, then pass the gate.
            </p>
            <CourseVideo
              youtubeId={MODULE_VIDEO.youtubeId}
              title={MODULE_VIDEO.title}
              posterSrc={MODULE_VIDEO.posterSrc}
              continueLabel="Continue"
              onContinue={next}
            />
          </section>
        )}

        {step === 'gate' && (
          <section className="ms-panel">
            <StructureGate onPass={() => go('complete')} />
          </section>
        )}

        {step === 'complete' && (
          <CourseFinish
            courseId="01"
            courseTitle="Market Structure"
            phrase={PHRASE}
            beats={['Premise', 'Trend', 'Range', 'Flip', 'Labs', 'Games', 'Video', 'Gate']}
            takeaway="If you cannot name what’s happening in one sentence, stay flat."
            nextLabel="Course 02 · Levels"
            nextTo="/courses/levels-that-matter"
            onRestart={() => go('intro')}
            sharePath="/courses/market-structure"
          />
        )}
      </div>
    </main>
  )
}
