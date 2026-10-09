import { Link, NavLink } from 'react-router-dom'
import { LINKS, PAGE_LABELS, PAGES, pageHref, type PageId } from '../data'

type Props = {
  page: PageId
}

export function Header({ page }: Props) {
  const mintMode = page === 'mintscript'

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: mintMode ? 'rgba(11,12,16,0.92)' : 'rgba(6,6,6,0.88)',
        backdropFilter: 'blur(14px)',
        borderBottom: mintMode ? '1px solid rgba(20,230,164,0.18)' : '1px solid rgba(227,180,74,0.16)',
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
        <Link to={pageHref('home')} style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--bone)' }}>
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
        </Link>
        <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2.4vw, 34px)', flexWrap: 'wrap' }}>
          {PAGES.map((id) => {
            const accent = id === 'mintscript' ? 'var(--mint)' : 'var(--gold)'
            return (
              <NavLink
                key={id}
                to={pageHref(id)}
                end={id === 'home'}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: isActive ? accent : 'var(--soft)',
                  padding: '6px 0',
                  borderBottom: `1px solid ${isActive ? accent : 'transparent'}`,
                })}
              >
                {PAGE_LABELS[id]}
              </NavLink>
            )
          })}
          <Link to={LINKS.booking} className="btn btn-primary" style={{ padding: '12px 18px', fontSize: 12 }}>
            Book 1-on-1
          </Link>
        </nav>
      </div>
    </header>
  )
}
