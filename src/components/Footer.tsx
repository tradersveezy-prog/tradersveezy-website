import { LINKS, PAGE_LABELS, PAGES, pageHref } from '../data'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(227,180,74,0.18)', background: 'var(--ink)' }}>
      <div
        className="shell"
        style={{
          paddingTop: 56,
          paddingBottom: 40,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 40,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="/assets/ts-mark-gold.svg" alt="TraderSveezy" style={{ height: 52 }} />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              TraderSveezy
            </div>
            <a
              href={LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                letterSpacing: '0.1em',
                color: 'var(--muted)',
              }}
            >
              @tradersveezy
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {PAGES.map((id) => (
            <a
              key={id}
              href={pageHref(id)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {PAGE_LABELS[id]}
            </a>
          ))}
        </div>
      </div>
      <div
        className="shell"
        style={{
          paddingTop: 22,
          paddingBottom: 36,
          borderTop: '1px solid rgba(242,241,238,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        <span>Educational only · Not financial advice</span>
        <span>© 2026 TraderSveezy</span>
      </div>
    </footer>
  )
}
