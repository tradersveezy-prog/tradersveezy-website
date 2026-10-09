import { useMemo, useState } from 'react'

function num(v: string) {
  const n = Number(String(v).replace(/,/g, ''))
  return Number.isFinite(n) ? n : NaN
}

function money(n: number) {
  if (!Number.isFinite(n)) return '—'
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function PositionCalculator() {
  const [entry, setEntry] = useState('4190.75')
  const [stop, setStop] = useState('3987.63')
  const [target, setTarget] = useState('4607.16')
  const [acct, setAcct] = useState('10000')
  const [risk, setRisk] = useState('1')

  const calc = useMemo(() => {
    const e = num(entry)
    const s = num(stop)
    const t = num(target)
    const a = num(acct)
    const r = num(risk)

    if (![e, s, t, a, r].every(Number.isFinite) || e === s) {
      return {
        rr: '—',
        verdict: 'Enter levels',
        dir: '—',
        dirColor: 'var(--muted)',
        riskFlex: 1,
        rewardFlex: 1,
        riskPct: '—',
        rewardPct: '—',
        size: '—',
        loss: '—',
        gain: '—',
      }
    }

    const long = t > e && s < e
    const short = t < e && s > e
    const riskDist = Math.abs(e - s)
    const rewardDist = Math.abs(t - e)
    const rr = rewardDist / riskDist
    const riskPct = (riskDist / e) * 100
    const rewardPct = (rewardDist / e) * 100
    const lossAmt = a * (r / 100)
    const size = riskDist > 0 ? lossAmt / riskDist : NaN
    const gainAmt = lossAmt * rr

    let verdict = 'Worth a look'
    if (rr < 1.5) verdict = 'Usually a pass'
    else if (rr < 2) verdict = 'Borderline'
    else if (rr >= 3) verdict = 'Strong asymmetry'

    return {
      rr: `1 : ${rr.toFixed(2)}`,
      verdict,
      dir: long ? 'LONG' : short ? 'SHORT' : 'CHECK LEVELS',
      dirColor: long ? 'var(--long)' : short ? 'var(--short)' : 'var(--muted)',
      riskFlex: 1,
      rewardFlex: Math.max(rr, 0.35),
      riskPct: `${riskPct.toFixed(2)}%`,
      rewardPct: `${rewardPct.toFixed(2)}%`,
      size: Number.isFinite(size) ? size.toFixed(4) : '—',
      loss: money(lossAmt),
      gain: money(gainAmt),
    }
  }, [entry, stop, target, acct, risk])

  const cell = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    color?: string,
  ) => (
    <label
      style={{
        background: 'var(--panel)',
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: color ?? 'var(--soft)',
        }}
      >
        {label}
      </span>
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: 'none',
          border: 'none',
          borderBottom: `1px solid ${color ? `${color}55` : 'rgba(242,241,238,0.2)'}`,
          color: color ?? 'var(--bone)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: 'clamp(18px, 1.8vw, 26px)',
          padding: '4px 0 8px',
          outline: 'none',
          width: '100%',
          minWidth: 0,
        }}
      />
    </label>
  )

  return (
    <div style={{ border: '1px solid rgba(242,241,238,0.14)', background: 'var(--ink)' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 26px',
          borderBottom: '1px solid rgba(242,241,238,0.1)',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        <span>Position calculator</span>
        <span style={{ color: calc.dirColor }}>{calc.dir}</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 1,
          background: 'rgba(242,241,238,0.1)',
        }}
      >
        {cell('Entry', entry, setEntry)}
        {cell('Stop', stop, setStop, 'var(--short)')}
        {cell('Target', target, setTarget, 'var(--long)')}
      </div>

      <div style={{ padding: 'clamp(28px, 4vw, 44px) 26px 28px', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          Risk : Reward
        </div>
        <div
          className="display"
          style={{
            fontSize: 'clamp(60px, 7.6vw, 108px)',
            letterSpacing: '0.02em',
            color: 'var(--gold)',
            marginTop: 12,
            lineHeight: 1,
          }}
        >
          {calc.rr}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--soft)',
            marginTop: 14,
          }}
        >
          {calc.verdict}
        </div>
        <div
          style={{
            marginTop: 30,
            display: 'flex',
            height: 12,
            border: '1px solid rgba(242,241,238,0.14)',
          }}
        >
          <div style={{ flex: calc.riskFlex, background: 'var(--short)', transition: 'flex 0.3s' }} />
          <div style={{ flex: calc.rewardFlex, background: 'var(--long)', transition: 'flex 0.3s' }} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 10,
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'var(--short)' }}>Risk {calc.riskPct}</span>
          <span style={{ color: 'var(--long)' }}>Reward {calc.rewardPct}</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 1,
          background: 'rgba(242,241,238,0.1)',
          borderTop: '1px solid rgba(242,241,238,0.1)',
        }}
      >
        <label style={{ background: 'var(--panel)', padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Account $
          </span>
          <input
            inputMode="decimal"
            value={acct}
            onChange={(e) => setAcct(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: '1px solid rgba(242,241,238,0.2)',
              color: 'var(--bone)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              fontSize: 18,
              padding: '2px 0 6px',
              outline: 'none',
              width: '100%',
            }}
          />
        </label>
        <label style={{ background: 'var(--panel)', padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Risk %
          </span>
          <input
            inputMode="decimal"
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: '1px solid rgba(242,241,238,0.2)',
              color: 'var(--bone)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              fontSize: 18,
              padding: '2px 0 6px',
              outline: 'none',
              width: '100%',
            }}
          />
        </label>
        <div
          style={{
            background: 'rgba(227,180,74,0.08)',
            padding: '18px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Position
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--bone)', padding: '2px 0 6px' }}>
            {calc.size}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          padding: '14px 26px',
          borderTop: '1px solid rgba(242,241,238,0.1)',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        <span>
          Lose <span style={{ color: 'var(--short)' }}>{calc.loss}</span> · Make{' '}
          <span style={{ color: 'var(--long)' }}>{calc.gain}</span>
        </span>
        <span>Example: my XAU swing</span>
      </div>
    </div>
  )
}
