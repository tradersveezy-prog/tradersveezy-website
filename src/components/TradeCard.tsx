type Props = {
  pair: string
  type: string
  direction: 'LONG' | 'SHORT'
  rr: string
  chart: string
  entry: string
  stop: string
  target: string
  eyebrow?: string
  compact?: boolean
}

export function TradeCard({
  pair,
  type,
  direction,
  rr,
  chart,
  entry,
  stop,
  target,
  eyebrow,
  compact,
}: Props) {
  const dirColor = direction === 'LONG' ? 'var(--long)' : 'var(--short)'

  return (
    <article
      className="trade-card"
      style={{
        background: 'var(--ink)',
        border: '1px solid rgba(242,241,238,0.12)',
        position: 'relative',
        overflow: 'hidden',
        padding: compact ? 16 : 22,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 90% 0%, rgba(227,180,74,0.12), transparent 50%), repeating-linear-gradient(0deg, rgba(242,241,238,0.03) 0 1px, transparent 1px 28px)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/assets/ts-mark-gold.svg" alt="" style={{ height: compact ? 28 : 36 }} />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: compact ? 11 : 13,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                TraderSveezy
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                  letterSpacing: '0.08em',
                }}
              >
                @tradersveezy
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <span
              style={{
                background: 'var(--gold)',
                color: 'var(--ink)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                padding: '6px 10px',
              }}
            >
              {type}
            </span>
            <span
              style={{
                border: `1px solid ${dirColor}`,
                color: dirColor,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.12em',
                padding: '6px 10px',
              }}
            >
              {direction}
            </span>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: 'rgba(227,180,74,0.35)',
            marginBottom: 14,
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            alignItems: 'baseline',
            marginBottom: 14,
          }}
        >
          <div>
            {eyebrow && (
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: 'var(--gold)',
                  marginBottom: 8,
                }}
              >
                {eyebrow}
              </div>
            )}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: compact ? 22 : 28,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              {pair.split(' / ')[0]}
              <span style={{ color: 'var(--gold)' }}> / {pair.split(' / ')[1]}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.14em',
                color: 'var(--muted)',
              }}
            >
              RISK : REWARD
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: compact ? 22 : 28,
                color: 'var(--gold)',
                marginTop: 4,
              }}
            >
              {rr}
            </div>
          </div>
        </div>

        <div
          style={{
            height: compact ? 160 : 220,
            overflow: 'hidden',
            border: '1px solid rgba(242,241,238,0.1)',
            marginBottom: 14,
            background: '#000',
          }}
        >
          <img
            src={chart}
            alt={`${pair} chart`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 10,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {[
            { label: 'ENTRY', value: entry },
            { label: 'STOP', value: stop, color: 'var(--short)' },
            { label: 'TARGET', value: target, color: 'var(--long)' },
          ].map((cell) => (
            <div key={cell.label}>
              <div style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--muted)', fontWeight: 600 }}>
                {cell.label}
              </div>
              <div
                style={{
                  fontSize: compact ? 16 : 20,
                  fontWeight: 700,
                  marginTop: 4,
                  color: cell.color ?? 'var(--bone)',
                }}
              >
                {cell.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
