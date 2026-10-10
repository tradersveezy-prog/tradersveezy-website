import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChartLab } from '../courses/market-structure/ChartLab'
import {
  LABS,
  PHRASE,
  QUIZZES,
  RULES,
  STEPS,
  type StepId,
} from '../courses/market-structure/data'
import { Quiz } from '../courses/market-structure/Quiz'
import { StructureGate } from '../courses/market-structure/StructureGate'
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
              Before levels and entries — buyers vs sellers, where value is, and whether you&apos;re in
              a trend, a range, or a flip. Tap charts. Pass quizzes. Clear the gate.
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
              Candles are
              <br />
              <span className="gold">sides.</span>
            </h2>
            <div className="ms-cards">
              <article>
                <span className="mono">01</span>
                <h3>Buyers & sellers</h3>
                <p>Every bar is someone winning a fight. Structure is that fight over time — not pretty lines.</p>
              </article>
              <article>
                <span className="mono">02</span>
                <h3>Value first</h3>
                <p>Where the market already agreed on price. Buying the dip into that beats chasing mid-air.</p>
              </article>
              <article>
                <span className="mono">03</span>
                <h3>Three stories</h3>
                <p>
                  Trend · Range (value) · Flip. Can&apos;t name it in one sentence? Stand down.
                </p>
              </article>
            </div>
            <p className="ms-stack mono">
              Day charts · Big picture {RULES.stack.context} · Entry {RULES.stack.execution}
            </p>
            <button type="button" className="btn btn-primary" onClick={next}>
              Cold-open quiz
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
            <p className="eyebrow">Story · Trend</p>
            <h2 className="display ms-h2">
              Higher highs.
              <br />
              <span className="gold">Above 21 · 55 · 200.</span>
            </h2>
            <div className="ms-law">
              <div>
                <span className="mono">LAW</span>
                <p>{RULES.trend.law}</p>
              </div>
              <div>
                <span className="mono">REFUSE</span>
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
            <p className="eyebrow">Story · Range</p>
            <h2 className="display ms-h2">
              Trade the edges.
              <br />
              <span className="gold">Not the middle.</span>
            </h2>
            <div className="ms-law">
              <div>
                <span className="mono">LAW</span>
                <p>{RULES.range.law}</p>
              </div>
              <div>
                <span className="mono">REFUSE</span>
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
            <p className="eyebrow">Story · Flip</p>
            <h2 className="display ms-h2">
              Poke under.
              <br />
              <span className="gold">Close back. Confirm.</span>
            </h2>
            <div className="ms-law">
              <div>
                <span className="mono">LAW</span>
                <p>{RULES.transition.law}</p>
              </div>
              <div>
                <span className="mono">REFUSE</span>
                <p>{RULES.transition.refuse}</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Transition quiz
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
            <p className="eyebrow">Chart stack</p>
            <h2 className="display ms-h2">
              Two clocks.
              <br />
              <span className="gold">One trigger.</span>
            </h2>
            <div className="ms-mtf">
              <div className="ms-mtf-card">
                <span className="mono">BIG PICTURE</span>
                <strong>12H · 6H</strong>
                <p>Name the story and the zone. Don&apos;t invent a new one on a lower chart.</p>
              </div>
              <div className="ms-mtf-card gold-border">
                <span className="mono">ENTRY</span>
                <strong>15m</strong>
                <p>Wait for the fight at the zone the big picture already named.</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              Stack quiz
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

        {step === 'gate' && (
          <section className="ms-panel">
            <StructureGate onPass={() => go('complete')} />
          </section>
        )}

        {step === 'complete' && (
          <section className="ms-panel ms-done">
            <p className="eyebrow">Gate cleared</p>
            <h2 className="display ms-h2">
              Structure
              <br />
              <span className="gold">first.</span>
            </h2>
            <p className="lede">
              You named the stories, touched live charts, and passed the pre-trade gate. Full filmed
              playbook still coming — this module is the sample of how we teach.
            </p>
            <blockquote className="ms-quote">
              <p>{PHRASE}</p>
            </blockquote>
            <div className="ms-done-actions">
              <Link to="/desk" className="btn btn-primary">
                Back to desk
              </Link>
              <Link to="/courses#waitlist" className="btn btn-ghost">
                Playbook waitlist
              </Link>
              <button type="button" className="btn btn-ghost" onClick={() => go('intro')}>
                Restart module
              </button>
            </div>
            <p className="ms-foot mono">Educational only · Not financial advice</p>
          </section>
        )}
      </div>
    </main>
  )
}
