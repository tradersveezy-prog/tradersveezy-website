import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Seo } from './components/Seo'
import { PAGE_PATHS, PAGES, pageFromPath, type PageId } from './data'
import { About } from './pages/About'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { Coaching } from './pages/Coaching'
import { Collabs } from './pages/Collabs'
import { Courses } from './pages/Courses'
import { Home } from './pages/Home'
import { MintScript } from './pages/MintScript'
import { Tools } from './pages/Tools'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** Old bookmark support: /#courses → /courses */
function HashRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    const raw = (location.hash || '').slice(1)
    if (!raw) return
    const id = (raw === 'collabs' ? 'collabs' : raw) as PageId
    if (PAGES.includes(id)) {
      navigate(PAGE_PATHS[id], { replace: true })
    }
  }, [navigate])
  return null
}

function Shell() {
  const page = pageFromPath(useLocation().pathname)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', position: 'relative', overflowX: 'hidden' }}>
      <Seo />
      <ScrollToTop />
      <HashRedirect />
      <Header page={page} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mintscript" element={<MintScript />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/partners" element={<Collabs />} />
        <Route path="/collabs" element={<Navigate to="/partners" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </HelmetProvider>
  )
}
