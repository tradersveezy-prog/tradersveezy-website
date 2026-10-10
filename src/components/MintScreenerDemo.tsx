import { useEffect, useMemo, useState } from 'react'
import { LINKS } from '../data'
import './mint-screener-demo.css'

/** Mirrors MintScript Markets v2 starter filters + TF chips. */

type Tf = '15m' | '1H' | '4H' | '1D'

type Hit = {
  id: string
  base: string
  price: string
  change: string
  age: string
  filterId: string
  filterLabel: string
  sentence: string
  metrics: string
  spark: number[]
}

const STARTERS = [
  { id: 'reclaim-50', label: 'Reclaimed 50 EMA' },
  { id: 'reclaim-200', label: 'Reclaimed 200 EMA' },
  { id: 'unusual-vol', label: 'Unusual volume' },
  { id: 'sr-breakout', label: 'S/R breakout' },
  { id: 'rvol-up', label: 'RVOL up' },
  { id: 'oversold-uptrend', label: 'Oversold in uptrend' },
] as const

const TFS: Tf[] = ['15m', '1H', '4H', '1D']

const HITS: Hit[] = [
  {
    id: 'sol',
    base: 'SOL',
    price: '148.20',
    change: '+4.2%',
    age: '2m ago',
    filterId: 'reclaim-50',
    filterLabel: 'Reclaimed 50 EMA',
    sentence: 'High volume reclaim of the 50 — prior resistance starting to hold as support.',
    metrics: 'RVOL 2.1× · Score 78 · Trending',
    spark: [42, 40, 44, 41, 48, 52, 50, 58, 62, 60, 68, 72],
  },
  {
    id: 'near',
    base: 'NEAR',
    price: '4.76',
    change: '+6.1%',
    age: '5m ago',
    filterId: 'sr-breakout',
    filterLabel: 'S/R breakout',
    sentence: 'Broke a twice-tested level, scooped under, closed back — flip zone in play.',
    metrics: 'RVOL 1.8× · Score 74 · Structure',
    spark: [55, 52, 50, 48, 46, 40, 38, 52, 58, 56, 64, 70],
  },
  {
    id: 'link',
    base: 'LINK',
    price: '18.85',
    change: '+3.4%',
    age: '8m ago',
    filterId: 'unusual-vol',
    filterLabel: 'Unusual volume',
    sentence: 'Volume spike into a prior bounce shelf — watching for hold above the mean.',
    metrics: 'Vol +210% · Score 71 · Flow',
    spark: [30, 32, 31, 35, 38, 36, 44, 48, 46, 55, 58, 61],
  },
  {
    id: 'avax',
    base: 'AVAX',
    price: '28.40',
    change: '+2.8%',
    age: '11m ago',
    filterId: 'reclaim-50',
    filterLabel: 'Reclaimed 50 EMA',
    sentence: 'First close above the 50 on elevated volume after a multi-day grind.',
    metrics: 'RVOL 1.4× · Score 69 · Trend',
    spark: [48, 47, 45, 46, 44, 50, 52, 51, 56, 58, 57, 63],
  },
  {
    id: 'sui',
    base: 'SUI',
    price: '2.14',
    change: '+5.7%',
    age: '14m ago',
    filterId: 'rvol-up',
    filterLabel: 'RVOL up',
    sentence: 'Relative volume pop with a reclaim — candidate bounce if the level holds.',
    metrics: 'RVOL 2.4× · Score 76 · Momentum',
    spark: [35, 38, 36, 40, 42, 39, 48, 52, 50, 58, 62, 66],
  },
  {
    id: 'eth',
    base: 'ETH',
    price: '3,421',
    change: '+1.9%',
    age: '18m ago',
    filterId: 'reclaim-200',
    filterLabel: 'Reclaimed 200 EMA',
    sentence: 'Price back above the 200 regime on the scan TF — context for alt longs.',
    metrics: 'Score 72 · Regime · BTC soft green',
    spark: [50, 49, 51, 48, 52, 54, 53, 57, 56, 60, 59, 64],
  },
]

function Spark({ values }: { values: number[] }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const w = 88
  const h = 28
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w
      const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2
      return `${x},${y}`
    })
    .join(' ')
  return (
    <svg className="msd-spark" viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function MintScreenerDemo() {
  const [tf, setTf] = useState<Tf>('4H')
  const [activeFilters, setActiveFilters] = useState<string[]>(['reclaim-50'])
  const [visible, setVisible] = useState(1)
  const [scanning, setScanning] = useState(true)
  const [selected, setSelected] = useState<string | null>('sol')
  const [mozzieOpen, setMozzieOpen] = useState(false)

  const filtered = useMemo(() => {
    if (!activeFilters.length) return HITS
    return HITS.filter((h) => activeFilters.includes(h.filterId))
  }, [activeFilters])

  const active = filtered.find((h) => h.id === selected) ?? filtered[0] ?? null

  useEffect(() => {
    setVisible(1)
    setSelected(filtered[0]?.id ?? null)
    setMozzieOpen(false)
  }, [activeFilters, tf, filtered])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(filtered.length)
      setScanning(false)
      return
    }
    setScanning(true)
    if (visible >= filtered.length) {
      const pause = window.setTimeout(() => setScanning(false), 500)
      return () => window.clearTimeout(pause)
    }
    const t = window.setTimeout(() => setVisible((v) => Math.min(v + 1, filtered.length)), 550)
    return () => window.clearTimeout(t)
  }, [visible, filtered.length])

  function toggleFilter(id: string) {
    setActiveFilters((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) return [...prev.slice(1), id]
      return [...prev, id]
    })
  }

  const shown = filtered.slice(0, visible)

  return (
    <div className="msd">
      <div className="msd-launch">
        <div className="msd-launch-top">
          <div className="msd-launch-title">
            <span className="msd-radar" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19.07 4.93A10 10 0 0 1 22 12" />
                <path d="M15.54 8.46A5 5 0 0 1 17 12" />
                <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                <path d="M4.93 19.07A10 10 0 0 1 2 12" />
                <path d="M8.46 15.54A5 5 0 0 1 7 12" />
              </svg>
            </span>
            <div>
              <h2>Technical scan</h2>
              <p>
                Same Markets scanner inside MintScript — screen the book by EMA, S/R, RVOL. Tap starters to
                stack (AND). Demo data.
              </p>
            </div>
          </div>
          <a
            href={LINKS.mintscript}
            target="_blank"
            rel="noopener noreferrer"
            className="msd-cta"
          >
            Open full scanner
          </a>
        </div>

        <div className="msd-tf-row">
          <span className="msd-tf-label">TF</span>
          <div className="msd-tf">
            {TFS.map((t) => (
              <button
                key={t}
                type="button"
                className={tf === t ? 'on' : ''}
                onClick={() => setTf(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <span className={`msd-live mono ${scanning ? 'on' : ''}`}>
            <span className="msd-live-dot" />
            {scanning ? `Scanning · ${tf}` : `Idle · ${shown.length} hits`}
          </span>
        </div>

        <div className="msd-starters">
          <span className="msd-starters-label">Starters</span>
          <div className="msd-chips">
            {STARTERS.map((f) => {
              const on = activeFilters.includes(f.id)
              return (
                <button
                  key={f.id}
                  type="button"
                  className={`msd-chip ${on ? 'on' : ''}`}
                  onClick={() => toggleFilter(f.id)}
                >
                  {on ? '− ' : '+ '}
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="msd-stage">
        <div className="msd-book">
          <div className="msd-book-head mono">
            <span>Markets · Top book</span>
            <span>
              {activeFilters.length
                ? activeFilters.map((id) => STARTERS.find((s) => s.id === id)?.label ?? id).join(' · ')
                : 'All starters'}
            </span>
          </div>
          {scanning && visible < filtered.length ? <div className="msd-scanline" aria-hidden /> : null}
          {shown.map((h) => {
            const up = h.change.startsWith('+')
            return (
              <button
                key={h.id}
                type="button"
                className={`msd-row ${active?.id === h.id ? 'active' : ''}`}
                onClick={() => {
                  setSelected(h.id)
                  setMozzieOpen(false)
                }}
              >
                <div className="msd-row-main">
                  <div className="msd-row-sym">
                    <span className="msd-base mono">{h.base}</span>
                    <span className="msd-age mono">{h.age}</span>
                  </div>
                  <div className="msd-row-filter">
                    {h.filterLabel}
                    <span className="dim"> · {tf}</span>
                  </div>
                </div>
                <div className="msd-row-mid">
                  <span className="msd-pill bull">
                    <span className="msd-pill-dot" />
                    Bullish
                  </span>
                  <Spark values={h.spark} />
                </div>
                <div className="msd-row-px">
                  <span className="msd-price mono">{h.price}</span>
                  <span className={`msd-chg mono ${up ? 'up' : 'dn'}`}>
                    {h.change}
                    <span className="dim"> 24h</span>
                  </span>
                </div>
                <button
                  type="button"
                  className="msd-mozzie"
                  title={`Ask Mozzie to explain ${h.base}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelected(h.id)
                    setMozzieOpen(true)
                  }}
                >
                  ✦
                </button>
              </button>
            )
          })}
          {!shown.length ? (
            <p className="msd-empty">No hits on this stack — try Reclaimed 50 EMA or Unusual volume.</p>
          ) : null}
        </div>

        <aside className="msd-drawer">
          {active ? (
            <>
              <div className="msd-drawer-top">
                <div>
                  <div className="msd-base mono">{active.base}</div>
                  <div className="msd-age mono">USDT · PERP · {tf}</div>
                </div>
                <span className={`msd-chg mono big ${active.change.startsWith('+') ? 'up' : 'dn'}`}>
                  {active.change}
                </span>
              </div>
              <div className="msd-drawer-price mono">{active.price}</div>
              <div className="msd-chart" aria-hidden>
                <svg viewBox="0 0 320 150" className="msd-svg">
                  <defs>
                    <linearGradient id="msdFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(167,139,250,0.4)" />
                      <stop offset="100%" stopColor="rgba(47,217,138,0)" />
                    </linearGradient>
                  </defs>
                  {[38, 75, 112].map((y) => (
                    <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.05)" />
                  ))}
                  <rect className="msd-zone" x="0" y="88" width="320" height="26" fill="rgba(245,166,35,0.1)" />
                  <path
                    className="msd-ema"
                    d="M0 122 C50 118, 90 108, 130 92 S200 70, 250 78 S300 88, 320 68"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <path
                    className="msd-price-line"
                    d="M0 130 L30 124 L55 128 L85 102 L115 110 L145 82 L175 90 L205 60 L235 74 L265 54 L295 66 L320 44"
                    fill="none"
                    stroke="#F2F1F7"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0 130 L30 124 L55 128 L85 102 L115 110 L145 82 L175 90 L205 60 L235 74 L265 54 L295 66 L320 44 L320 150 L0 150 Z"
                    fill="url(#msdFill)"
                    opacity="0.45"
                  />
                  <line className="msd-level" x1="0" y1="100" x2="320" y2="100" stroke="#f5a623" strokeWidth="1.25" />
                  <circle className="msd-pulse" cx="265" cy="54" r="4" fill="#2FD98A" />
                </svg>
                <div className="msd-overlays mono">
                  <span>50 EMA</span>
                  <span>Key level</span>
                  <span>Bounce zone</span>
                </div>
              </div>
              <p className="msd-sentence">{active.sentence}</p>
              <p className="msd-metrics mono">{active.metrics}</p>

              {mozzieOpen ? (
                <div className="msd-mozzie-panel">
                  <div className="msd-mozzie-label mono">Mozzie</div>
                  <div className="msd-mozzie-q">Explain {active.base} on this {active.filterLabel} hit</div>
                  <div className="msd-mozzie-a">
                    Bullish as long as price holds the reclaim. Volume confirms the move — don&apos;t chase mid-air;
                    wait for a defense at the level on your entry TF.
                  </div>
                </div>
              ) : (
                <button type="button" className="msd-ask" onClick={() => setMozzieOpen(true)}>
                  ✦ Ask Mozzie to explain
                </button>
              )}
            </>
          ) : (
            <p className="msd-empty">Select a coin to open the chart drawer.</p>
          )}
        </aside>
      </div>
    </div>
  )
}
