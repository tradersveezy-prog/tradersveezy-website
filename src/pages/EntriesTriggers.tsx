import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BreakoutSequenceChart } from '../courses/diagrams/BreakoutSequenceChart'
import { EmaReclaimChart } from '../courses/diagrams/EmaReclaimChart'
import { RetestTriggerChart } from '../courses/diagrams/RetestTriggerChart'
import {
  GATE_ITEMS,
  LABS,
  PHRASE,
  QUIZZES,
  RULES,
  STEPS,
  type StepId,
} from '../courses/entries/data'
import { FillBlank } from '../courses/games/FillBlank'
import { MatchPairs } from '../courses/games/MatchPairs'
import { OrderSteps } from '../courses/games/OrderSteps'
import { TrueFalse } from '../courses/games/TrueFalse'
import { WordBank } from '../courses/games/WordBank'
import { ChartLab } from '../courses/market-structure/ChartLab'
import { ChartPick } from '../courses/market-structure/ChartPick'
import { Quiz } from '../courses/market-structure/Quiz'
import { CourseFinish } from '../courses/market-structure/CourseFinish'
import { StructureGate } from '../courses/market-structure/StructureGate'
import { TeachFigure } from '../courses/market-structure/TeachFigure'
import { TipFigure } from '../courses/market-structure/TipFigure'
import { track } from '../lib/analytics'
import '../courses/market-structure/market-structure.css'

function stepFromParam(raw: string | null): StepId {
  if (raw && STEPS.some((s) => s.id === raw)) return raw as StepId
  return 'intro'
}

export function EntriesTriggers() {
  const [params] = useSearchParams()
  const [step, setStep] = useState<StepId>(() => stepFromParam(params.get('step')))
  const idx = STEPS.findIndex((s) => s.id === step)
  const progress = ((idx + 1) / STEPS.length) * 100

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    track('course_step', { course: '03', step })
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
            <span className="eyebrow">Course 03 · Interactive</span>
            <span className="mono ms-step-label">
              {String(idx + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')} ·{' '}
              {STEPS[idx]?.label}
            </span>
          </div>
        </header>

        {step === 'intro' && (
          <section className="ms-panel ms-intro">
            <p className="eyebrow">Entries &amp; triggers</p>
            <h1 className="display ms-title">
              The level is set.
              <br />
              <span className="gold">Now the entry.</span>
            </h1>
            <p className="lede">
              Condition named. Level clear. This module is the trigger — retest, EMA reclaim, breakout
              sequence — and when to wait or skip.
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
            <p className="eyebrow">Why this third</p>
            <h2 className="display ms-h2">
              Trigger confirms.
              <br />
              <span className="gold">Entry places it.</span>
            </h2>
            <div className="ms-cards">
              <article>
                <span className="mono">01</span>
                <h3>Probabilities</h3>
                <p>A trigger confirms the idea. Nothing is guaranteed — we play the odds.</p>
              </article>
              <article>
                <span className="mono">02</span>
                <h3>15m · 30m</h3>
                <p>Context stays on 12H / 6H. Entries live on 15m / 30m — candle closes matter.</p>
              </article>
              <article>
                <span className="mono">03</span>
                <h3>Execution &gt; fill</h3>
                <p>
                  You can enter late and still do well. A “better” fill than planned can mean the idea
                  is wrong.
                </p>
              </article>
            </div>
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

        {step === 'retest' && (
          <section className="ms-panel">
            <p className="eyebrow">Trigger · Retest</p>
            <h2 className="display ms-h2">
              Break first.
              <br />
              <span className="gold">Then revisit.</span>
            </h2>
            <p className="lede">
              After a structure shift past liquidity (PWH, PDL, order block, weekly support), wait for
              the break to lock with closes — then enter on the revisit to that level.
            </p>
            <TeachFigure
              diagram={<RetestTriggerChart />}
              alt="Market structure break then retest of the broken level"
              caption="MSS · break · retest"
              note="No structure shift, no break, no retest. The entry is the revisit — not the chase."
            />
            <ChartPick
              prompt="Where do you look to enter the retest?"
              diagram={<RetestTriggerChart />}
              options={[
                { id: 'chase', x: 88, y: 22, label: 'Chase far after the move' },
                { id: 'level', x: 62, y: 48, label: 'Revisit · broken level' },
                { id: 'mid', x: 35, y: 58, label: 'Mid range · no level' },
              ]}
              correctId="level"
              explainOk="The entry is the revisit to the broken level — after MSS and closes lock the break."
              explainNo="Not a chase and not mid-air. Wait for the revisit to the level that caused the shift."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.retest.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.retest.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Retest quiz
            </button>
          </section>
        )}

        {step === 'quiz-retest' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.retest} onComplete={() => next()} />
          </section>
        )}

        {step === 'ema' && (
          <section className="ms-panel">
            <p className="eyebrow">Trigger · EMA reclaim</p>
            <h2 className="display ms-h2">
              Impulse through.
              <br />
              <span className="gold">Then hold it.</span>
            </h2>
            <p className="lede">
              Watch 4H 55 / 200 and 15m 21 / 55 / 200. A reclaim is a strong push through the average,
              then 2–3 closes that prove acceptance.
            </p>
            <TeachFigure
              diagram={<EmaReclaimChart />}
              alt="Strong impulse reclaiming an EMA with several holding closes"
              caption="Impulse + acceptance"
              note="One wick is not a reclaim. Wait for closes that the other side could not undo."
            />
            <ChartPick
              prompt="What counts as the reclaim here?"
              diagram={<EmaReclaimChart />}
              options={[
                { id: 'wick', x: 42, y: 58, label: 'Single wick tag' },
                { id: 'hold', x: 68, y: 38, label: 'Impulse + holding closes' },
                { id: 'under', x: 28, y: 72, label: 'Still stuck under' },
              ]}
              correctId="hold"
              explainOk="Impulse through the average, then 2–3 closes that prove acceptance."
              explainNo="A wick alone is not a reclaim. Wait for impulse + holding closes."
            />
            <TeachFigure
              src="/curriculum/03/apt-4h-ema-reclaim.png"
              alt="APT 4H chart showing a pullback and hold into EMAs"
              caption="Live example · APT 4H"
              note="Pullback into the averages — plan the reclaim on your entry TF."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.ema.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.ema.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              EMA quiz
            </button>
          </section>
        )}

        {step === 'quiz-ema' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.ema} onComplete={() => next()} />
          </section>
        )}

        {step === 'breakout' && (
          <section className="ms-panel">
            <p className="eyebrow">Trigger · Breakout</p>
            <h2 className="display ms-h2">
              Reject. Break.
              <br />
              <span className="gold">Sweep. Reclaim.</span>
            </h2>
            <p className="lede">
              Level rejected about five times, then a candle closes through it. Next comes the liquidity
              sweep — your entry is the reclaim after that sweep, with a hard stop past the extreme.
            </p>
            <TeachFigure
              diagram={<BreakoutSequenceChart />}
              alt="Five rejections, break close above, sweep below, entry on reclaim"
              caption="Reject · break · sweep · reclaim"
              note="Do not enter the first close alone. Wait for the sweep, then the reclaim."
            />
            <ChartPick
              prompt="Where is the entry in this sequence?"
              diagram={<BreakoutSequenceChart />}
              options={[
                { id: 'first', x: 48, y: 28, label: 'First break close' },
                { id: 'sweep', x: 58, y: 62, label: 'Into the sweep extreme' },
                { id: 'reclaim', x: 72, y: 32, label: 'Reclaim after sweep' },
              ]}
              correctId="reclaim"
              explainOk="Reject · break · sweep · then enter the reclaim — hard stop past the sweep extreme."
              explainNo="Not the first close and not inside the sweep trap. Entry is the reclaim after."
            />
            <TipFigure
              src="/curriculum/03/ena-30m-breakout.png"
              alt="ENA 30m chart showing rejections, break, sweep, and reclaim entry"
              caption="Live example · ENA 30m"
              note="Same sequence on a real chart. Tap each marker."
              tips={[
                {
                  id: 't1',
                  x: 36,
                  y: 34,
                  title: '5 rejections',
                  body: 'Price tested the level and failed — five times. That defense makes the eventual break meaningful.',
                },
                {
                  id: 't2',
                  x: 48,
                  y: 30,
                  title: 'Break · close',
                  body: 'A candle closes through the level. That proves acceptance — still not the entry by itself.',
                },
                {
                  id: 't3',
                  x: 54,
                  y: 58,
                  title: 'Sweep',
                  body: 'Liquidity raid back through the level. Stops get hit. This is the trap before the real entry.',
                },
                {
                  id: 't4',
                  x: 64,
                  y: 28,
                  title: 'Entry · reclaim',
                  body: 'Close / hold back through the level after the sweep. That is the entry — stop past the sweep extreme.',
                },
              ]}
              addOn="If the reclaim also prints with directional volume, conviction goes up. Thin reclaim candles fail more often."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.breakout.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.breakout.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Breakout quiz
            </button>
          </section>
        )}

        {step === 'quiz-breakout' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.breakout} onComplete={() => next()} />
          </section>
        )}

        {step === 'volume' && (
          <section className="ms-panel">
            <p className="eyebrow">Confirmation</p>
            <h2 className="display ms-h2">
              Volume that
              <br />
              <span className="gold">means something.</span>
            </h2>
            <p className="lede">
              Triggers need volume support — new directional participation, not only shorts or longs
              covering. Thin breaks fail more often.
            </p>
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.volume.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.volume.refuse}</p>
              </div>
            </div>
            <div className="ms-mtf">
              <div className="ms-mtf-card">
                <span className="mono">ALSO USE</span>
                <strong>VAL / VAH</strong>
                <p>VAL reclaim for longs · VAH reclaim for shorts — value flips as entries.</p>
              </div>
              <div className="ms-mtf-card gold-border">
                <span className="mono">ALSO USE</span>
                <strong>S/R · OB</strong>
                <p>Flips and order-block breaks become new retest zones after the break.</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              What we refuse
            </button>
          </section>
        )}

        {step === 'refuse' && (
          <section className="ms-panel">
            <p className="eyebrow">Hard rules</p>
            <h2 className="display ms-h2">
              Hard stops.
              <br />
              <span className="gold">No chase.</span>
            </h2>
            <div className="ms-cards">
              <article>
                <span className="mono">01</span>
                <h3>No soft stops</h3>
                <p>Idea is right or wrong. If a wick takes you out, live to fight another day.</p>
              </article>
              <article>
                <span className="mono">02</span>
                <h3>No TP2 chase</h3>
                <p>TP1 shows acceptance. Chasing past TP2 of your plan is not an entry.</p>
              </article>
              <article>
                <span className="mono">03</span>
                <h3>Macro matters</h3>
                <p>
                  Bonds, gold, DXY, oil, war, health — TA does not ignore the world. Stay informed.
                </p>
              </article>
            </div>
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.invalidation.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.invalidation.refuse}</p>
              </div>
            </div>
            <p className="lede" style={{ marginTop: 8 }}>
              Feeds worth knowing:{' '}
              <a href="https://x.com/KobeissiLetter" target="_blank" rel="noreferrer">
                @KobeissiLetter
              </a>
              ,{' '}
              <a href="https://x.com/lookonchain" target="_blank" rel="noreferrer">
                @lookonchain
              </a>
              ,{' '}
              <a href="https://x.com/sentdefender" target="_blank" rel="noreferrer">
                @sentdefender
              </a>
              ,{' '}
              <a href="https://x.com/solidintel_x" target="_blank" rel="noreferrer">
                @solidintel_x
              </a>
              .
            </p>
            <button type="button" className="btn btn-primary" onClick={next}>
              Hard rules quiz
            </button>
          </section>
        )}

        {step === 'quiz-refuse' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.refuse} onComplete={() => next()} />
          </section>
        )}

        {step === 'lab-apt' && (
          <section className="ms-panel ms-lab-wrap">
            <ChartLab lab={LABS[0]} onComplete={next} />
          </section>
        )}

        {step === 'lab-avax' && (
          <section className="ms-panel ms-lab-wrap">
            <ChartLab lab={LABS[1]} onComplete={next} />
          </section>
        )}

        {step === 'lab-bch' && (
          <section className="ms-panel ms-lab-wrap">
            <ChartLab lab={LABS[2]} onComplete={next} />
          </section>
        )}

        {step === 'play-order' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · Order</p>
            <h2 className="display ms-h2">
              Tap the breakout
              <br />
              <span className="gold">in order.</span>
            </h2>
            <OrderSteps
              prompt="Clean breakout sequence — put the steps in order."
              items={[
                { id: 'o1', label: '~5 rejections of the level' },
                { id: 'o2', label: 'Candle closes through the level' },
                { id: 'o3', label: 'Liquidity sweep' },
                { id: 'o4', label: 'Enter on the reclaim · hard stop past sweep' },
              ]}
              explain="Reject · break close · sweep · reclaim. Never the first close alone."
              onComplete={next}
            />
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
                  sentence: 'A trigger confirms the idea. An ___ is where you place the order.',
                  choices: ['entry', 'emoji', 'excuse'],
                  correct: 'entry',
                  explain: 'Trigger confirms. Entry executes. Probabilities — not guarantees.',
                },
                {
                  id: 'f2',
                  sentence: 'EMA reclaim needs impulse through the average, then ___ holding closes.',
                  choices: ['2–3', 'zero', 'twenty'],
                  correct: '2–3',
                  explain: 'Acceptance closes. One wick is not enough.',
                },
                {
                  id: 'f3',
                  sentence: 'Do not chase past ___ of your plan.',
                  choices: ['TP2', 'TP0', 'the open'],
                  correct: 'TP2',
                  explain: 'TP1 showed acceptance. Past TP2 is chase territory.',
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
              <span className="gold">trigger.</span>
            </h2>
            <MatchPairs
              pairs={[
                { id: 'm1', left: 'Retest', right: 'MSS · break · revisit level' },
                { id: 'm2', left: 'EMA reclaim', right: 'Impulse + 2–3 holds' },
                { id: 'm3', left: 'Breakout', right: 'Reject · sweep · reclaim' },
                { id: 'm4', left: 'Hard stop', right: 'Past sweep / invalidation' },
              ]}
              onComplete={next}
            />
          </section>
        )}

        {step === 'play-tf' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · True / False</p>
            <h2 className="display ms-h2">
              Call it
              <br />
              <span className="gold">true or false.</span>
            </h2>
            <TrueFalse
              items={[
                {
                  id: 't1',
                  claim: 'You can enter the first breakout close alone and call it the playbook sequence.',
                  answer: false,
                  explain: 'Wait for sweep + reclaim. First close alone is not the entry.',
                },
                {
                  id: 't2',
                  claim: 'Soft stops are part of this playbook.',
                  answer: false,
                  explain: 'Hard stops only. The idea is right or wrong.',
                },
                {
                  id: 't3',
                  claim: 'Triggers live mainly on 15m / 30m — closes matter.',
                  answer: true,
                  explain: 'Context on 12H / 6H. Entry thinking on 15m / 30m.',
                },
                {
                  id: 't4',
                  claim: 'Volume that is only covering (not new directional participation) is weaker confirmation.',
                  answer: true,
                  explain: 'Want directional volume — thin or cover-only breaks fail more often.',
                },
              ]}
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
              clue="After the breakout trap, you enter on the ___."
              answer="RECLAIM"
              decoys={['X', 'Y', 'Z']}
              explain="Sweep first, reclaim next — that is the entry."
              onComplete={next}
            />
          </section>
        )}

        {step === 'gate' && (
          <section className="ms-panel">
            <StructureGate
              items={[...GATE_ITEMS]}
              eyebrow="ENTRIES GATE"
              title="Pre-trade entry checklist"
              onPass={() => go('complete')}
            />
          </section>
        )}

        {step === 'complete' && (
          <CourseFinish
            courseId="03"
            courseTitle="Entries & Triggers"
            phrase={PHRASE}
            beats={[
              'Retest after MSS',
              'EMA reclaim',
              'Breakout sequence',
              'Volume',
              'Hard rules',
              'Games',
              'Gate',
            ]}
            takeaway="Execution matters more than the entry. A clean plan beats a lucky fill."
            nextLabel="Course 04 · Risk"
            nextTo="/courses/risk-position-sizing"
            secondaryLabel="Back to desk"
            secondaryTo="/desk"
            onRestart={() => go('intro')}
            sharePath="/courses/entries-triggers"
          />
        )}
      </div>
    </main>
  )
}
