import { useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PAGES, type PageId } from './data'
import { About } from './pages/About'
import { Coaching } from './pages/Coaching'
import { Collabs } from './pages/Collabs'
import { Courses } from './pages/Courses'
import { Home } from './pages/Home'
import { Tools } from './pages/Tools'

function readPage(): PageId {
  const hash = (location.hash || '').slice(1) as PageId
  return PAGES.includes(hash) ? hash : 'home'
}

export default function App() {
  const [page, setPage] = useState<PageId>(readPage)

  useEffect(() => {
    const onHash = () => {
      setPage(readPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', position: 'relative', overflowX: 'hidden' }}>
      <Header page={page} />
      {page === 'home' && <Home />}
      {page === 'coaching' && <Coaching />}
      {page === 'courses' && <Courses />}
      {page === 'tools' && <Tools />}
      {page === 'collabs' && <Collabs />}
      {page === 'about' && <About />}
      <Footer />
    </div>
  )
}
