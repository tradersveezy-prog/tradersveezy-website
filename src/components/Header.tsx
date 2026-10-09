import { LINKS, PAGE_LABELS, PAGES, type PageId } from '../data'

type Props = {
  page: PageId
}

export function Header({ page }: Props) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(6,6,6,0.88)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(227,180,74,0.16)',
      }}
    >
      <div
        className="shell"
        style={{
          paddingTop: 18,
          paddingBottom: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--bone)' }}>
          <img src="/assets/ts-mark-gold.svg" alt="TraderSveezy" style={{ height: 38 }} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            TraderSveezy
          </span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2.4vw, 34px)', flexWrap: 'wrap' }}>
          {PAGES.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: id === page ? 'var(--gold)' : 'var(--soft)',
                padding: '6px 0',
                borderBottom: `1px solid ${id === page ? 'var(--gold)' : 'transparent'}`,
              }}
            >
              {PAGE_LABELS[id]}
            </a>
          ))}
          <a href={LINKS.booking} className="btn btn-primary" style={{ padding: '12px 18px', fontSize: 12 }}>
            Book 1-on-1
          </a>
        </nav>
      </div>
    </header>
  )
}
