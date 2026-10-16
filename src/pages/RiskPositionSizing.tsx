import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AtrConfirmChart } from '../courses/diagrams/AtrConfirmChart'
import { RiskRewardChart } from '../courses/diagrams/RiskRewardChart'
import { SizeFromRiskChart } from '../courses/diagrams/SizeFromRiskChart'
import { StructureStopChart } from '../courses/diagrams/StructureStopChart'
import { FillBlank } from '../courses/games/FillBlank'
import { MatchPairs } from '../courses/games/MatchPairs'
import { OrderSteps } from '../courses/games/OrderSteps'
import { ChartPick } from '../courses/market-structure/ChartPick'
import { CourseFinish } from '../courses/market-structure/CourseFinish'
import { Quiz } from '../courses/market-structure/Quiz'
import { StructureGate } from '../courses/market-structure/StructureGate'
import { TeachFigure } from '../courses/market-structure/TeachFigure'
import {
  ATR,
  GATE_ITEMS,
  PHRASE,
  QUIZZES,
  RISK_LABS,
  RULES,
  STEPS,
  type StepId,
} from '../courses/risk/data'
import { RiskLab } from '../courses/risk/RiskLab'
import { PositionCalculator } from '../components/PositionCalculator'
import { track } from '../lib/analytics'
import '../courses/market-structure/market-structure.css'

function stepFromParam(raw: string | null): StepId {
  if (raw && STEPS.some((s) => s.id === raw)) return raw as StepId
  return 'intro'
}

const DIAGRAM = {
  structure: <StructureStopChart />,
  atr: <AtrConfirmChart />,
  size: <SizeFromRiskChart />,
} as const

export function RiskPositionSizing() {
  const [params] = useSearchParams()
  const [step, setStep] = useState<StepId>(() => stepFromParam(params.get('step')))
  const idx = STEPS.findIndex((s) => s.id === step)
  const progress = ((idx + 1) / STEPS.length) * 100

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    track('course_step', { course: '04', step })
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
            <span className="eyebrow">Course 04 · Interactive</span>
            <span className="mono ms-step-label">
              {String(idx + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')} ·{' '}
              {STEPS[idx]?.label}
            </span>
          </div>
        </header>

        {step === 'intro' && (
          <section className="ms-panel ms-intro">
            <p className="eyebrow">Risk &amp; position sizing</p>
            <h1 className="display ms-title">
              Stop first.
              <br />
              <span className="gold">Then size.</span>
            </h1>
            <p className="lede">
              Structure names invalidation. ATR confirms the distance. Size is math from the dollars
              you can lose — not a vibe.
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
            <p className="eyebrow">Why this fourth</p>
            <h2 className="display ms-h2">
              The entry is set.
              <br />
              <span className="gold">Survive the loss.</span>
            </h2>
            <div className="ms-cards">
              <article>
                <span className="mono">01</span>
                <h3>Invalidation</h3>
                <p>Where the idea is wrong on the chart — that is the hard stop.</p>
              </article>
              <article>
                <span className="mono">02</span>
                <h3>ATR check</h3>
                <p>
                  ATR({ATR.period}) asks if that stop has room for noise — and is not absurdly wide.
                </p>
              </article>
              <article>
                <span className="mono">03</span>
                <h3>Dollar risk</h3>
                <p>Pick % of account you can lose. Size flexes with stop distance.</p>
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

        {step === 'stop' && (
          <section className="ms-panel">
            <p className="eyebrow">Hard stop · Structure</p>
            <h2 className="display ms-h2">
              Beyond the level
              <br />
              <span className="gold">that kills the idea.</span>
            </h2>
            <p className="lede">
              Ask one question: where is this idea wrong on the chart? Put the stop past that spot.
            </p>
            <TeachFigure
              diagram={<StructureStopChart />}
              alt="Long entry with hard stop beyond the swing low"
              caption="Structure places the stop"
              note="Not a round number. Not a % that ignores the chart."
            />
            <ChartPick
              prompt="Where does the hard stop belong on this long?"
              diagram={<StructureStopChart />}
              options={[
                { id: 'tight', x: 60, y: 38, label: 'Just under entry' },
                { id: 'struct', x: 50, y: 72, label: 'Past the swing' },
                { id: 'air', x: 78, y: 22, label: 'Above the highs' },
              ]}
              correctId="struct"
              explainOk="Past the swing that kills the long — that is invalidation."
              explainNo="A stop just under entry dies to noise. Put it past the swing."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.stop.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.stop.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Stop quiz
            </button>
          </section>
        )}

        {step === 'quiz-stop' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.stop} onComplete={() => next()} />
          </section>
        )}

        {step === 'atr' && (
          <section className="ms-panel">
            <p className="eyebrow">Confirm · ATR({ATR.period})</p>
            <h2 className="display ms-h2">
              Structure first.
              <br />
              <span className="gold">ATR sanity-checks.</span>
            </h2>
            <p className="lede">
              After the chart stop is set, check ATR. Too tight = noise. Way too wide = cut size or
              skip.
            </p>
            <TeachFigure
              diagram={<AtrConfirmChart />}
              alt="Structure stop sitting inside a healthy ATR band from entry"
              caption="Confirm · do not invent"
              note="ATR never replaces the swing. It only asks if the distance makes sense."
            />
            <ChartPick
              prompt="Your structure stop is set. Which band looks healthy?"
              diagram={<AtrConfirmChart />}
              options={[
                { id: 'tight', x: 30, y: 28, label: 'Way too tight' },
                { id: 'ok', x: 40, y: 48, label: 'Inside the band' },
                { id: 'wide', x: 30, y: 78, label: 'Way too wide' },
              ]}
              correctId="ok"
              explainOk={`About ${ATR.minMult}×–${ATR.maxMult}× ATR is the usual healthy band.`}
              explainNo="Too tight gets tagged by noise. Too wide costs too much — cut size or pass."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.atr.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.atr.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              ATR quiz
            </button>
          </section>
        )}

        {step === 'quiz-atr' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.atr} onComplete={() => next()} />
          </section>
        )}

        {step === 'rr' && (
          <section className="ms-panel">
            <p className="eyebrow">Filter · Risk : reward</p>
            <h2 className="display ms-h2">
              Know the asymmetry
              <br />
              <span className="gold">before you size.</span>
            </h2>
            <p className="lede">
              Entry → stop vs entry → target. Under ~1.5R is usually a pass. Do not move the stop to
              fake a prettier number.
            </p>
            <TeachFigure
              diagram={<RiskRewardChart />}
              alt="Risk and reward bars from stop to entry to target"
              caption="Geometry of the plan"
              note="If the math is thin, skip. Forcing R:R after you liked the chart is how accounts die."
            />
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.rr.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.rr.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              R:R quiz
            </button>
          </section>
        )}

        {step === 'quiz-rr' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.rr} onComplete={() => next()} />
          </section>
        )}

        {step === 'size' && (
          <section className="ms-panel">
            <p className="eyebrow">Position size</p>
            <h2 className="display ms-h2">
              Dollar risk fixed.
              <br />
              <span className="gold">Size flexes.</span>
            </h2>
            <p className="lede">
              Size = (account × risk %) ÷ stop distance. Same idea, wider stop → smaller size. Never
              the other way around.
            </p>
            <TeachFigure
              diagram={<SizeFromRiskChart />}
              alt="Same dollar risk with tighter vs wider stop producing different size"
              caption="Math over emotion"
              note="Revenge size after a loser is not the playbook."
            />
            <div className="ms-size-tool">
              <p className="eyebrow">Try the numbers</p>
              <PositionCalculator />
            </div>
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.size.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.size.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Size quiz
            </button>
          </section>
        )}

        {step === 'quiz-size' && (
          <section className="ms-panel">
            <Quiz questions={QUIZZES.size} onComplete={() => next()} />
          </section>
        )}

        {step === 'refuse' && (
          <section className="ms-panel">
            <p className="eyebrow">Hard rules</p>
            <h2 className="display ms-h2">
              Invalidation hit.
              <br />
              <span className="gold">You are out.</span>
            </h2>
            <p className="lede">
              Soft stops, adding to losers, and widening invalidation because you “feel” it —
              refuse all three.
            </p>
            <div className="ms-cards">
              <article>
                <span className="mono">01</span>
                <h3>Hard stop</h3>
                <p>Wick takes you out → accept it. Review later, not mid-trade.</p>
              </article>
              <article>
                <span className="mono">02</span>
                <h3>No widen</h3>
                <p>Moving the stop farther to keep size is secretly raising risk.</p>
              </article>
              <article>
                <span className="mono">03</span>
                <h3>No revenge</h3>
                <p>After losers, size stays in the plan — or you sit out.</p>
              </article>
            </div>
            <div className="ms-law">
              <div>
                <span className="mono">RULE</span>
                <p>{RULES.refuse.law}</p>
              </div>
              <div>
                <span className="mono">AVOID</span>
                <p>{RULES.refuse.refuse}</p>
              </div>
            </div>
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

        {step === 'lab-structure' && (
          <section className="ms-panel ms-lab-wrap">
            <RiskLab lab={RISK_LABS[0]} diagram={DIAGRAM.structure} onComplete={next} />
          </section>
        )}

        {step === 'lab-atr' && (
          <section className="ms-panel ms-lab-wrap">
            <RiskLab lab={RISK_LABS[1]} diagram={DIAGRAM.atr} onComplete={next} />
          </section>
        )}

        {step === 'lab-size' && (
          <section className="ms-panel ms-lab-wrap">
            <RiskLab lab={RISK_LABS[2]} diagram={DIAGRAM.size} onComplete={next} />
          </section>
        )}

        {step === 'play-fill' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · Fill-in</p>
            <h2 className="display ms-h2">
              Finish the
              <br />
              <span className="gold">line.</span>
            </h2>
            <FillBlank
              items={[
                {
                  id: 'f1',
                  sentence: 'Stop first. Then ___.',
                  choices: ['size', 'hope', 'revenge'],
                  correct: 'size',
                  explain: 'Invalidation first. Size is math from that distance.',
                },
                {
                  id: 'f2',
                  sentence: 'ATR ___ the stop. It does not invent it.',
                  choices: ['replaces', 'confirms', 'deletes'],
                  correct: 'confirms',
                  explain: 'Structure places the stop. ATR checks the distance.',
                },
                {
                  id: 'f3',
                  sentence: 'Wider stop → ___ size (same dollar risk).',
                  choices: ['bigger', 'same', 'smaller'],
                  correct: 'smaller',
                  explain: 'Dollar risk stays fixed. Size flexes.',
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
              Pair it
              <br />
              <span className="gold">up.</span>
            </h2>
            <MatchPairs
              pairs={[
                { id: 'm1', left: 'Structure stop', right: 'Past the swing that kills the idea' },
                { id: 'm2', left: 'ATR check', right: 'Too tight / too wide?' },
                { id: 'm3', left: 'R:R under 1.5', right: 'Usually a pass' },
                { id: 'm4', left: 'Dollar risk', right: 'The constant — size flexes' },
              ]}
              onComplete={next}
            />
          </section>
        )}

        {step === 'play-order' && (
          <section className="ms-panel">
            <p className="eyebrow">Play · Order</p>
            <h2 className="display ms-h2">
              Risk steps
              <br />
              <span className="gold">in order.</span>
            </h2>
            <OrderSteps
              prompt="Build the risk plan in the right order."
              items={[
                { id: 'o1', label: 'Place structure stop' },
                { id: 'o2', label: 'Confirm with ATR' },
                { id: 'o3', label: 'Check R:R' },
                { id: 'o4', label: 'Size from $ risk' },
              ]}
              explain="Stop → ATR → R:R → size. Never size first."
              onComplete={next}
            />
          </section>
        )}

        {step === 'gate' && (
          <section className="ms-panel">
            <StructureGate
              onPass={() => go('complete')}
              items={GATE_ITEMS}
              eyebrow="RISK GATE"
              title="Pre-size checklist"
            />
          </section>
        )}

        {step === 'complete' && (
          <CourseFinish
            courseId="04"
            courseTitle="Risk & Position Sizing"
            phrase={PHRASE}
            beats={[
              'Structure stop',
              'ATR confirm',
              'R:R · size',
              'Labs',
              'Games',
              'Gate',
            ]}
            takeaway="Stop from the chart. ATR confirms. Size is math — never emotion."
            nextLabel="Course 05 · Process"
            nextTo="/courses/process-review"
            secondaryLabel="Back to desk"
            secondaryTo="/desk"
            onRestart={() => go('intro')}
            sharePath="/courses/risk-position-sizing"
          />
        )}
      </div>
    </main>
  )
}
