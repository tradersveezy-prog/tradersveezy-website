import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ConfluenceBuilder } from '../courses/levels/ConfluenceBuilder'
import {
  GATE_ITEMS,
  LABS,
  PHRASE,
  QUIZZES,
  RULES,
  STEPS,
  type StepId,
} from '../courses/levels/data'
import { FillBlank } from '../courses/games/FillBlank'
import { MatchPairs } from '../courses/games/MatchPairs'
import { OddOneOut } from '../courses/games/OddOneOut'
import { TrueFalse } from '../courses/games/TrueFalse'
import { WordBank } from '../courses/games/WordBank'
import { ChartLab } from '../courses/market-structure/ChartLab'
import { ChartPick } from '../courses/market-structure/ChartPick'
import { Quiz } from '../courses/market-structure/Quiz'
import { CourseFinish } from '../courses/market-structure/CourseFinish'
import { StructureGate } from '../courses/market-structure/StructureGate'
import { TeachFigure } from '../courses/market-structure/TeachFigure'
import { EmaWickChart } from '../courses/diagrams/EmaWickChart'
import { FibEvidenceChart } from '../courses/diagrams/FibEvidenceChart'
import { FlatBodyMagnetChart } from '../courses/diagrams/FlatBodyMagnetChart'
import { MultiTouchChart } from '../courses/diagrams/MultiTouchChart'
import { ValueProfileChart } from '../courses/diagrams/ValueProfileChart'
import { VwapMagnetChart } from '../courses/diagrams/VwapMagnetChart'
import { WickHalfMagnetChart } from '../courses/diagrams/WickHalfMagnetChart'
import { track } from '../lib/analytics'
import '../courses/market-structure/market-structure.css'

function stepFromParam(raw: string | null): StepId {
  if (raw && STEPS.some((s) => s.id === raw)) return raw as StepId
  return 'intro'
}

export function LevelsThatMatter() {
  const [params] = useSearchParams()
  const [step, setStep] = useState<StepId>(() => stepFromParam(params.get('step')))
  const idx = STEPS.findIndex((s) => s.id === step)
  const progress = ((idx + 1) / STEPS.length) * 100

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    track('course_step', { course: '02', step })
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
            <span className="eyebrow">Course 02 · Interactive</span>
            <span className="mono ms-step-label">
              {String(idx + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')} ·{' '}
              {STEPS[idx]?.label}
            </span>
          </div>
        </header>

        {step === 'intro' && (
          <section className="ms-panel ms-intro">
            <p className="eyebrow">Levels that matter</p>
            <h1 className="display ms-title">
              See it in
              <br />
              <span className="gold">15 seconds.</span>
            </h1>
            <p className="lede">
              Higher timeframes first. Edges of value. The 55 and 200 as real levels. Zones that have more
              than a Fib behind them.
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
            <p className="eyebrow">Why this second</p>
            <h2 className="display ms-h2">
              Structure first.
              <br />
              <span className="gold">Then the map.</span>
            </h2>
            <div className="ms-cards">
              <article>
                <span className="mono">01</span>
                <h3>Higher timeframes first</h3>
                <p>They set the map — especially when they agree with the 1H–4H.</p>
              </article>
              <article>
                <span className="mono">02</span>
                <h3>15-second rule</h3>
                <p>If the level is not obvious quickly, leave it alone. Extra lines usually add noise.</p>
              </article>
              <article>
                <span className="mono">03</span>
                <h3>Buyers and sellers</h3>
                <p>
                  Equal highs, premium, discount — explain what people are doing, not just the terms.
                </p>
              </article>
            </div>
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.matter.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.matter.refuse}</p>
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

        {step === 'swing' && (
          <section className="ms-panel">
            <p className="eyebrow">Swings</p>
            <h2 className="display ms-h2">
              Where price
              <br />
              <span className="gold">already reacted.</span>
            </h2>
            <p className="lede">
              Prior swings with clear reactions matter most when they held more than once. Equal highs matter
              because of stops and traps — not because of a pattern name.
            </p>
            <TeachFigure
              diagram={<MultiTouchChart />}
              alt="Horizontal level held twice with labeled holds"
              caption="Multi-touch"
              note="Held twice = real interest. One touch is a candidate; two makes it a level."
            />
            <ChartPick
              prompt="Which mark is the level you actually care about?"
              diagram={<MultiTouchChart />}
              options={[
                { id: 'noise', x: 28, y: 28, label: 'Random mid wick' },
                { id: 'held', x: 52, y: 48, label: 'Held twice · reaction' },
                { id: 'chase', x: 82, y: 22, label: 'Far above · chase' },
              ]}
              correctId="held"
              explainOk="Yes — prior reactions (especially two holds) make the level real."
              explainNo="Prefer the multi-touch defense. Mid noise and chase highs are skips."
            />
            <TeachFigure
              src="/curriculum/02/near-key-level.png"
              alt="NEAR 6H chart showing a key level held then broken"
              caption="Live example · NEAR ~4.60"
              note="Same idea on a real chart — defense, then the break and reclaim story."
            />
            <button type="button" className="btn btn-primary" style={{ marginTop: 36 }} onClick={next}>
              Swing quiz
            </button>
          </section>
        )}

        {step === 'quiz-swing' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.swing} onComplete={() => next()} />
          </section>
        )}

        {step === 'mechanical' && (
          <section className="ms-panel">
            <p className="eyebrow">Moving averages as levels</p>
            <h2 className="display ms-h2">
              55 &amp; 200
              <br />
              <span className="gold">are levels too.</span>
            </h2>
            <p className="lede">
              Many buy and sell orders sit at those averages, so price often reacts there. Mark them the same
              way you mark a clear horizontal — not only as trend filters.
            </p>
            <TeachFigure
              diagram={<EmaWickChart />}
              alt="Price wicking into the 55 and 200 EMAs then holding"
              caption="Wick into the average"
              note="Tag · hold · continue. Same read as a horizontal defense."
            />
            <ChartPick
              prompt="Where is the reaction level on this idea?"
              diagram={<EmaWickChart />}
              options={[
                { id: 'air', x: 30, y: 22, label: 'Mid-air · no level' },
                { id: 'ema', x: 55, y: 52, label: 'Wick into EMA' },
                { id: 'far', x: 88, y: 18, label: 'Far extension' },
              ]}
              correctId="ema"
              explainOk="Treat the average like a horizontal — tag, hold, then wait for your entry."
              explainNo="The wick into the EMA is the level. Mid-air and far extensions are not."
            />
            <TeachFigure
              src="/curriculum/02/sol-ema-wicks.png"
              alt="SOL daily chart with EMAs and wick holds into the averages"
              caption="Live example · SOL 1D"
              note="Wicks into the EMAs on the rally — same read as a horizontal defense."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.mechanical.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.mechanical.refuse}</p>
              </div>
            </div>
            <div className="ms-mtf">
              <div className="ms-mtf-card">
                <span className="mono">55 EMA</span>
                <strong>Shorter average</strong>
                <p>Often where shorter-term orders lean. Tags and holds matter on your context charts.</p>
              </div>
              <div className="ms-mtf-card gold-border">
                <span className="mono">200 EMA</span>
                <strong>Longer average</strong>
                <p>A major average. Holding or losing it often changes how the market behaves.</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              EMA quiz
            </button>
          </section>
        )}

        {step === 'quiz-mechanical' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.mechanical} onComplete={() => next()} />
          </section>
        )}

        {step === 'magnets' && (
          <section className="ms-panel">
            <p className="eyebrow">Price magnets</p>
            <h2 className="display ms-h2">
              Where price
              <br />
              <span className="gold">gets pulled back.</span>
            </h2>
            <p className="lede">
              Some prints leave a mark. Price often returns to them — two wide candles sharing a flat edge,
              the midpoint of a long wick, and VWAP for the session.
            </p>

            <TeachFigure
              diagram={<FlatBodyMagnetChart />}
              alt="Two wide candles sharing a flat open and close that becomes a magnet level"
              caption="Wide flat pair"
              note="Wide red closes flat · wide green opens from the same edge. That shared level is the magnet."
            />
            <ChartPick
              prompt="Tap the magnet on this print."
              diagram={<FlatBodyMagnetChart />}
              options={[
                { id: 'tip', x: 72, y: 18, label: 'Tip of the next wick' },
                { id: 'flat', x: 48, y: 48, label: 'Shared flat edge' },
                { id: 'mid', x: 22, y: 68, label: 'Random mid body' },
              ]}
              correctId="flat"
              explainOk="The shared flat open/close is the magnet — price often revisits that edge."
              explainNo="Mark the flat junction between the wide bodies — not noise mid-candle."
            />
            <TeachFigure
              src="/curriculum/02/aave-flat-body.png"
              alt="AAVE 12H chart with two wide candles sharing a flat base that later acts as support"
              caption="Live example · AAVE 12H"
              note="Flat close into flat open at ~160 — price came back and held the same edge."
            />
            <TeachFigure
              diagram={<WickHalfMagnetChart />}
              alt="Long wick with the 0.5 midpoint marked as a magnet"
              caption="Long wick · 0.5"
              note="Mark the extreme, then the halfway point of the wick. That midpoint often reacts on the retest."
            />
            <TeachFigure
              diagram={<VwapMagnetChart />}
              alt="Session VWAP with price stretching away then tagging it"
              caption="VWAP"
              note="Volume-weighted average for the session. Stretches away often pull back toward it."
            />

            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.magnets.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.magnets.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Magnets quiz
            </button>
          </section>
        )}

        {step === 'quiz-magnets' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.magnets} onComplete={() => next()} />
          </section>
        )}

        {step === 'profile' && (
          <section className="ms-panel">
            <p className="eyebrow">Volume profile</p>
            <h2 className="display ms-h2">
              Value in
              <br />
              <span className="gold">plain words.</span>
            </h2>
            <TeachFigure
              diagram={<ValueProfileChart />}
              alt="Volume profile diagram labeled VAH, POC, and VAL"
              caption="Anatomy · VAH · POC · VAL"
              note="POC is where most volume traded. VAL and VAH are the edges of value."
            />
            <ChartPick
              prompt="For a range long idea, where do you usually want to work?"
              diagram={<ValueProfileChart />}
              options={[
                { id: 'vah', x: 70, y: 22, label: 'Far above · VAH chase' },
                { id: 'mid', x: 55, y: 48, label: 'Middle of value' },
                { id: 'val', x: 48, y: 72, label: 'Low end · VAL' },
              ]}
              correctId="val"
              explainOk="Edges first — especially a VAL reclaim. Mid-value is usually noise."
              explainNo="Prefer the low end of value. The middle is a skip without a clear reason."
            />
            <TeachFigure
              src="/curriculum/02/virtual-val-poc.png"
              alt="VIRTUAL 12H chart with volume profile, VAH, POC, and VAL — wick tagging VAL"
              caption="Live example · VIRTUAL 12H"
              note="Blue VAH / VAL · red POC. Recent wick tags VAL — edges of value, not the middle."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.profile.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.profile.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Value quiz
            </button>
          </section>
        )}

        {step === 'quiz-profile' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.profile} onComplete={() => next()} />
          </section>
        )}

        {step === 'discount' && (
          <section className="ms-panel">
            <p className="eyebrow">Zones · Fibs · strength</p>
            <h2 className="display ms-h2">
              Fib finds it.
              <br />
              <span className="gold">Evidence decides.</span>
            </h2>
            <TeachFigure
              diagram={<FibEvidenceChart />}
              alt="Fibonacci pullback zone overlapping POC and 55 EMA"
              caption="Fib + evidence"
              note="The Fib shelf only maps the area. POC, EMA, and a wick decide if it is tradable."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.discount.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.discount.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Build a zone
            </button>
          </section>
        )}

        {step === 'confluence' && (
          <section className="ms-panel">
            <ConfluenceBuilder onComplete={next} />
          </section>
        )}

        {step === 'quiz-discount' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.discount} onComplete={() => next()} />
          </section>
        )}

        {step === 'lab-btc' && (
          <section className="ms-panel ms-lab-wrap">
            <ChartLab lab={LABS[0]} onComplete={next} />
          </section>
        )}

        {step === 'lab-ema' && (
          <section className="ms-panel ms-lab-wrap">
            <ChartLab lab={LABS[1]} onComplete={next} />
          </section>
        )}

        {step === 'lab-near' && (
          <section className="ms-panel ms-lab-wrap">
            <ChartLab lab={LABS[2]} onComplete={next} />
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
                  sentence: 'If the level is not clear in about 15 seconds, ___.',
                  choices: ['force it', 'leave it', 'add lines'],
                  correct: 'leave it',
                  explain: 'Unclear = skip. Extra lines usually add noise.',
                },
                {
                  id: 'f2',
                  sentence: 'POC is where the most ___ traded.',
                  choices: ['volume', 'tweets', 'hope'],
                  correct: 'volume',
                  explain: 'Point of Control = highest volume agreement.',
                },
                {
                  id: 'f3',
                  sentence: 'A Fib shelf alone is not an ___.',
                  choices: ['entry', 'chart', 'EMA'],
                  correct: 'entry',
                  explain: 'Fib finds the zone. Evidence decides whether you trade it.',
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
              <span className="gold">level.</span>
            </h2>
            <MatchPairs
              pairs={[
                { id: 'm1', left: '55 / 200 EMA', right: 'Orders often sit there' },
                { id: 'm2', left: 'VAL / VAH', right: 'Edges of value' },
                { id: 'm3', left: 'Flat body pair', right: 'Shared open/close magnet' },
                { id: 'm4', left: 'Wick 0.5', right: 'Midpoint of a long wick' },
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
                  claim: 'Higher timeframe levels matter more than lower ones — especially when they agree with 1H–4H.',
                  answer: true,
                  explain: 'Context first. Alignment with 1H–4H adds weight.',
                },
                {
                  id: 't2',
                  claim: 'You should trade the middle of value by default in a range.',
                  answer: false,
                  explain: 'Edges of value matter. Mid-value without a reason is a skip.',
                },
                {
                  id: 't3',
                  claim: 'The 55 and 200 EMAs can be treated as real reaction levels.',
                  answer: true,
                  explain: 'Orders cluster there — mark them like horizontals.',
                },
                {
                  id: 't4',
                  claim: 'A Fibonacci number alone is enough to enter.',
                  answer: false,
                  explain: 'Fib locates. Confluence (POC, EMA, wick, broken level) decides.',
                },
              ]}
              onComplete={next}
            />
          </section>
        )}

        {step === 'play-odd' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · Odd one out</p>
            <h2 className="display ms-h2">
              Which does
              <br />
              <span className="gold">not belong?</span>
            </h2>
            <OddOneOut
              items={[
                {
                  id: 'o1',
                  prompt: 'Which is NOT a magnet in this playbook?',
                  options: [
                    { id: 'a', label: 'Wide flat open/close pair' },
                    { id: 'b', label: 'Midpoint of a long wick' },
                    { id: 'c', label: 'Every tiny doji on the chart' },
                    { id: 'd', label: 'Session VWAP after a stretch' },
                  ],
                  oddId: 'c',
                  explain: 'Only obvious prints. Random small candles are noise.',
                },
                {
                  id: 'o2',
                  prompt: 'Which does NOT strengthen a Fib zone?',
                  options: [
                    { id: 'a', label: 'POC sitting in the same area' },
                    { id: 'b', label: '55 EMA overlapping the shelf' },
                    { id: 'c', label: 'A clear long wick into the zone' },
                    { id: 'd', label: 'The Fib number by itself with nothing else' },
                  ],
                  oddId: 'd',
                  explain: 'Fib alone is not confluence — the other evidence is.',
                },
                {
                  id: 'o3',
                  prompt: 'Which is the odd level read?',
                  options: [
                    { id: 'a', label: 'Clear within ~15 seconds' },
                    { id: 'b', label: 'Higher timeframe agrees' },
                    { id: 'c', label: 'Buyers/sellers already reacted' },
                    { id: 'd', label: 'Draw until something looks tradable' },
                  ],
                  oddId: 'd',
                  explain: 'Forcing lines is the refuse. Clarity or stay flat.',
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
              clue="Where most volume traded — the point of ___."
              answer="CONTROL"
              decoys={['X', 'Y', 'Z']}
              explain="POC = Point of Control. Context, not a forced entry."
              onComplete={next}
            />
          </section>
        )}

        {step === 'gate' && (
          <section className="ms-panel">
            <StructureGate
              items={[...GATE_ITEMS]}
              eyebrow="LEVELS GATE"
              title="Pre-trade level checklist"
              onPass={() => go('complete')}
            />
          </section>
        )}

        {step === 'complete' && (
          <CourseFinish
            courseId="02"
            courseTitle="Levels That Matter"
            phrase={PHRASE}
            beats={[
              'Swings',
              'EMAs as levels',
              'Magnets',
              'Value edges',
              'Zones + confluence',
              'Games',
              'Gate',
            ]}
            takeaway="A level without proof is just a line. Mark what already got a reaction."
            nextLabel="Course 03 · Entries"
            nextTo="/courses/entries-triggers"
            onRestart={() => go('intro')}
            sharePath="/courses/levels-that-matter"
          />
        )}
      </div>
    </main>
  )
}
