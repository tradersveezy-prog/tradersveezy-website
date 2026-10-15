import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { LINKS, PAGE_LABELS, PAGES, pageHref, type PageId } from '../data'

type Props = {
  page: PageId
}

const BOOK_SEEN_KEY = 'ts-book-breathe-seen'
const NAV_PAGES = PAGES.filter((id) => id !== 'home')

export function Header({ page }: Props) {
  const { user } = useAuth()
  const mintMode = page === 'mintscript'
  const [breathe, setBreathe] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(BOOK_SEEN_KEY)) return
      setBreathe(true)
      const t = window.setTimeout(() => {
        setBreathe(false)
        sessionStorage.setItem(BOOK_SEEN_KEY, '1')
      }, 9000)
      return () => window.clearTimeout(t)
    } catch {
      /* ignore */
    }
  }, [])

  function stopBreathe() {
    setBreathe(false)
    try {
      sessionStorage.setItem(BOOK_SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  return (
    <header
      className={`site-header${mintMode ? ' is-mint' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: mintMode ? 'rgba(11,12,16,0.92)' : 'rgba(6,6,6,0.88)',
        backdropFilter: 'blur(14px)',
        borderBottom: mintMode ? '1px solid rgba(20,230,164,0.18)' : '1px solid rgba(227,180,74,0.16)',
      }}
    >
      <div className="shell site-header-inner">
        <Link to="/" className="site-logo" aria-label="TraderSveezy home">
          <img src="/assets/ts-mark-gold.svg" alt="" style={{ height: 34 }} />
          <span className="site-logo-word">TraderSveezy</span>
        </Link>
        <nav aria-label="Primary" className="site-nav">
          {NAV_PAGES.map((id) => {
            const accent = id === 'mintscript' ? 'var(--mint)' : 'var(--gold)'
            return (
              <NavLink
                key={id}
                to={pageHref(id)}
                className="site-nav-link"
                style={({ isActive }) => ({
                  color: isActive ? accent : 'var(--soft)',
                  borderBottomColor: isActive ? accent : 'transparent',
                })}
              >
                {PAGE_LABELS[id]}
              </NavLink>
            )
          })}
          <NavLink
            to={user ? '/account?stay=1' : '/account'}
            className="site-nav-link"
            style={({ isActive }) => ({
              color: isActive ? (mintMode ? 'var(--mint)' : 'var(--gold)') : 'var(--soft)',
              borderBottomColor: isActive ? (mintMode ? 'var(--mint)' : 'var(--gold)') : 'transparent',
            })}
          >
            {user ? 'Account' : 'Sign in'}
          </NavLink>
          <Link
            to={LINKS.booking}
            className={`btn btn-primary${breathe ? ' btn-book-breathe' : ''}`}
            style={{ padding: '11px 16px', fontSize: 11, flexShrink: 0 }}
            onClick={stopBreathe}
          >
            Book 1-on-1
          </Link>
        </nav>
      </div>
    </header>
  )
}
